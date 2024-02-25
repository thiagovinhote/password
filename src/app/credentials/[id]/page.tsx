import { notFound } from "next/navigation";

import RevealCredential from "./_components/reveal-credential";
import getCredentialRepo from "./_presentation/get-credential-repo";

export default async function CredentialIdPage(props: {
  params: { id: string };
}) {
  const credential = await getCredentialRepo(props.params.id);
  if (!credential) notFound();

  return (
    <div className="p-8 pt-6">
      <RevealCredential credential={credential} />
    </div>
  );
}
