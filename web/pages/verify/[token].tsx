import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { ParsedUrlQuery } from "querystring";
import { usePostVerifyEmail } from "./hooks/usePostVerifyEmail";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

const Verify: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  token,
}: {
  token: string;
}) => {
  const router = useRouter();
  const postVerifyEmail = usePostVerifyEmail();

  const handleTestClick = () => {
    postVerifyEmail.mutate(token, {
      onSuccess: (data) => {
        console.log("data", data);
      },
      onError: (error) => {
        console.log("error", error);
      },
    });
  };

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);

  return (
    <>
      <Head>
        <title>Verify account</title>
        <meta
          name="description"
          content="Verify your newly created stud-jobs account"
        />
      </Head>
      <main>
        <h1 className="bg-red-400">
          When this page is accessed we should automatically make an api call to
          verify the account and display status message
        </h1>
        <button onClick={handleTestClick}>test call</button>
      </main>
    </>
  );
};

/* 
Checking for the token when serving the page ensures us
that by when the page is rendered we already have the token in page props

Otherwise, the token would be undefined for the first 2 renders
and we can't rely on this for calling the api or redirecting the user
if the token is not existent
*/
export const getServerSideProps: GetServerSideProps = async ({
  query,
}: {
  query: ParsedUrlQuery;
}) => {
  if (!query.token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      token: query.token as string,
    },
  };
};

export default Verify;
