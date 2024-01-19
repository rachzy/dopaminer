import { StatusBar } from "react-native";
import Login from "./auth";

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={"#000"} translucent />
      <Login />
    </>
  );
}
