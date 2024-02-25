import allCredentialsRepo from "./_presentation/all-credentials-repo";

export default async function CredentialsPage() {
  const credentials = await allCredentialsRepo();

  return (
    <div>
      <ul>
        {credentials.map((credential) => {
          return <li key={credential.id}>{credential.name}</li>;
        })}
      </ul>
    </div>
  );
}
