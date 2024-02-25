import { useRouter } from "next/navigation";
import qs from "query-string";
import { useCallback } from "react";

export default function useQueryPush() {
  const router = useRouter();

  return useCallback(
    (values: qs.StringifiableRecord) => {
      const url = qs.stringifyUrl(
        { url: window.location.href, query: values },
        { skipEmptyString: true, skipNull: true },
      );

      router.push(url);
    },
    [router],
  );
}
