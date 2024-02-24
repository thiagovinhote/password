import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { ParsedUrlQuery } from "querystring";

export const ssrAuth = <
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
>(
  handle: GetServerSideProps<P, Q>,
) => {
  const getServerSideProps: GetServerSideProps<P, Q> = async (context) => {
    const cookies = parseCookies(context);

    if (!cookies["password:token"]) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }

    context.req.cookies = cookies;

    return handle(context);
  };

  return getServerSideProps;
};
