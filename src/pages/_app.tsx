import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import 'react-toastify/dist/ReactToastify.css';
import { Poppins } from 'next/font/google'
import { api } from "~/utils/api";

import "~/styles/globals.css";

const poppins = Poppins({ subsets: ['latin-ext'],weight: ["400", "500", "600","700"]})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className={`${poppins.className} w-full bg-gray-100`}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
