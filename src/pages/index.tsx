import Head from "next/head";
import AuthLayout from "~/Layouts/AuthLayout";
import SignInForm from "~/components/SignInForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>time crack</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLayout>
        <SignInForm/>
      </AuthLayout>
    </>
  );
}
