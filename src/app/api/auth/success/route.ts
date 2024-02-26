import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import db from "~/infra/database/drizzle";
import { users } from "~/infra/database/schema";

export async function GET(req: NextRequest) {
  const { getUser, getOrganization } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) throw new Error("Authentication without user.id");

  const userByKindId = await db
    .select()
    .from(users)
    .where(eq(users.kindeId, user.id));

  if (userByKindId) return NextResponse.redirect("/");

  if (!user?.email) throw new Error("Authentication without user.email");

  db.insert(users)
    .values({
      email: user.email,
      name: [user.given_name, user.family_name].join(" "),
      kindeId: user.id,
      password: new Date().toString(),
    })
    .onConflictDoUpdate({
      target: users.id,
      set: { kindeId: user.id },
    });

  return NextResponse.redirect("/");
}
