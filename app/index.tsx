import { router } from "expo-router";
import Loading from "./loading";
import { useEffect } from "react";

// This function represents the main entry point of the app.
// It displays a loading screen for 500 milliseconds and then navigates to the login page.
export default function Page() {
  useEffect(() => {
    setTimeout(() => {
      router.push("/auth/login/");
    }, 500);
  }, []);

  return <Loading />;
}
