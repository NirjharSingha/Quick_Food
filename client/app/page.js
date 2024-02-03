import Image from "next/image";
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";

export default function Home() {
  return (
    <main
      className="min-w-screen min-h-screen"
      // style={{ backgroundColor: "#FFF4EF" }}
    >
      <NavBar />
      <Landing />
    </main>
  );
}
