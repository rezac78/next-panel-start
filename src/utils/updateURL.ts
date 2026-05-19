import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const updateURL = (
  params: Record<string, string | number | undefined>,
  searchParams: Record<string, string | string[]>,
  router: AppRouterInstance
) => {
  const current = new URLSearchParams(searchParams?.toString());
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== "") current.set(key, String(val));
    else current.delete(key);
  });
  router.replace(`?${current?.toString()}`);
};
