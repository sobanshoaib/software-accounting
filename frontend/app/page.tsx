"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();


  return (
    <div className="flex flex-row bg-blue-500 justify-center items-center w-full h-screen">
      <Link href="/employee" className="p-4 bg-red-500 text-7xl rounded">Employees</Link>
    </div>
  );
}
