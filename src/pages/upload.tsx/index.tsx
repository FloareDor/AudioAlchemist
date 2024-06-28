import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import SongUploader from "@/components/upload/songuploader";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <SongUploader />
      </main>
    </div>
  );
}