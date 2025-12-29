"use client";

import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  const employeeTab = () => {
    router.push("/employee");
  }

  return (
    <div className="flex flex-row bg-blue-500 justify-center items-center w-full h-screen">
      <button onClick={employeeTab} className="p-4 bg-red-500 text-7xl rounded">Employees</button>
    </div>
  );
}
