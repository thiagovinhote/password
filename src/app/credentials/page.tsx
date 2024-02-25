import columns from "~/app/credentials/_components/columns";
import CredentialCreate from "~/app/credentials/_components/credential-create";
import DataTable from "~/app/credentials/_components/data-table";
import DataTableToolbar from "~/app/credentials/_components/data-table-toolbar";

import allCredentialsRepo from "./_presentation/all-credentials-repo";

export default async function CredentialsPage(props: { searchParams: any }) {
  const credentials = await allCredentialsRepo(props.searchParams);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Credenciais</h2>
        <div className="flex items-center space-x-2">
          <CredentialCreate />
        </div>
      </div>

      <DataTableToolbar />
      <DataTable
        columns={columns}
        data={credentials}
        count={credentials.length}
        pagination={{ pageSize: 10, pageIndex: 0 }}
        orderBy={props.searchParams.orderBy}
      />
    </div>
  );
}