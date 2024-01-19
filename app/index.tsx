import { router } from "expo-router";
import Loading from "./loading";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    setTimeout(() => {
      router.push("/auth/login/");
    }, 500);
  }, []);

  return <Loading />;
}
