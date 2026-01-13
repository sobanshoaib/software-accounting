'use client';

import Link from "next/link";



export default function Employees() {



  return (
    <div className="flex flex-row bg-blue-500 justify-center items-center w-full h-screen">
        <div className="flex flex-col">
          <Link href="/employee/add-employee" className="p-4 bg-red-500 text-7xl rounded">Add Employee</Link>
          <p>Employee List</p>
        </div>
    </div>
  );
}
