import ServerLoading from "@/components/common/server-loading";
import ServerError from "@/components/common/server-error";
import Menu from "@/components/pages/admin/menu";
import { getMenu } from "@/apis/menu";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const getParam = (value: string | string[] | undefined, fallback: string) => {
  if (Array.isArray(value)) return value[0] ?? fallback;
  return value ?? fallback;
};

const MenuContent = async ({ searchParams }: PageProps) => {
  const sp = await searchParams;

  const page = Number(getParam(sp.page, "1"));
  const limit = Number(getParam(sp.limit, "10"));
  const search = getParam(sp.search, "");

  const res = await getMenu({
    page,
    limit,
    search,
  });

  if (!res.success || !res.data) return <ServerError />;

  return <Menu data={res.data} />;
};

const Page = async ({ searchParams }: PageProps) => {
  return (
    <ServerLoading>
      <MenuContent searchParams={searchParams} />
    </ServerLoading>
  );
};

export default Page;