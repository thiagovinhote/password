import { notFound } from "next/navigation";

import RevealSheet from "./_components/reveal-sheet";
import getCredentialRepo from "./_presentation/get-credential-repo";

export default async function CredentialIdPage(props: {
  params: { id: string };
}) {
  const credential = await getCredentialRepo(props.params.id);
  if (!credential) return notFound();

  return <RevealSheet credential={credential} />;
}
