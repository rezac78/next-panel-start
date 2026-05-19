import { NextPage } from "next";
import { getProject } from "@/apis/project";
import { getTools } from "@/apis/tools";
import Project from "@/components/pages/admin/project";
import ServerLoading from "@/components/common/server-loading";
import ServerError from "@/components/common/server-error";

type PageProps = {
  searchParams: Promise<Record<string, string | string[]>>;
};

const ProjectContent: NextPage<PageProps> = async ({ searchParams }) => {
  const sp = await searchParams;
  const page = Number(sp.page ?? 1);
  const perPage = Number(sp.perPage ?? 10);
  const search = String(sp.search ?? "");
  // const status = String(sp.status ?? "");
  const sort = String(sp.sort ?? "id");
  const order = String(sp.order ?? "desc");

  const data = await getProject();
  const dataTools = await getTools({ page: 1, perPage: 100 });

  const cols = (await import("@/components/pages/admin/project/columns")).columns;

  if (!data || !dataTools) return <ServerError />;

  return (
    <Project
      data={{ ...data, columns: cols }}
      page={page}
      perPage={perPage}
      search={search}
      // status={status}
      sort={sort}
      order={order}
      sp={sp}
      dataTools={dataTools}
    />
  );
};

const Page: NextPage<PageProps> = async ({ searchParams }) => {
  return (
    <ServerLoading>
      <ProjectContent searchParams={searchParams} />
    </ServerLoading>
  );
};

export default Page;
