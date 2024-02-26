import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import db from "~/infra/database/drizzle";
import { users } from "~/infra/database/schema";

export async function GET(req: NextRequest) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id)
    return NextResponse.json(
      { error: "Authentication without user.id" },
      { status: 500 },
    );

  const userByKindId = await db.query.users.findFirst({
    where: eq(users.kindeId, user.id),
  });

  if (userByKindId)
    return NextResponse.redirect(
      new URL(String(process.env.KINDE_SITE_URL), req.nextUrl),
    );

  if (!user?.email)
    return NextResponse.json(
      { error: "Authentication without user.email" },
      { status: 500 },
    );

  await db
    .insert(users)
    .values({
      email: user.email,
      name: [user.given_name, user.family_name].join(" "),
      kindeId: user.id,
      password: new Date().toString(),
    })
    .onConflictDoUpdate({
      target: users.email,
      set: { kindeId: user.id },
    });

  return NextResponse.redirect(
    new URL(String(process.env.KINDE_SITE_URL), req.nextUrl),
  );
}
