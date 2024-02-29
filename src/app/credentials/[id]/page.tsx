import { notFound } from "next/navigation";

import BackButton from "./_components/back-button";
import RevealCredential from "./_components/reveal-credential";
import getCredentialRepo from "./_presentation/get-credential-repo";

export default async function CredentialIdPage(props: {
  params: { id: string };
}) {
  const credential = await getCredentialRepo(props.params.id);
  if (!credential) notFound();

  return (
    <div className="space-y-4">
      <BackButton />
      <RevealCredential credential={credential} />
    </div>
  );
}
