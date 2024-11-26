"use client";

import { useRouter } from "next/navigation";


export default function Custom404() {
  const router = useRouter();
  router.replace('/');
  return null;
}

export const getStaticProps = () => {
  return {
    redirect: {
      destination: '/',
    },
  };
}
