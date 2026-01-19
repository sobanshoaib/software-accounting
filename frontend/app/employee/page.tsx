'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";



interface Employees {
  lastName: string;
  firstName: string;
  dateBirth: string;
  socialInsuranceNumber: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
}



export default function Employees() {

  const [allEmployees, setAllEmployees] = useState<Employees[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await axios.get("http://localhost:3001/employee/list-employees");
      setAllEmployees(res.data)
      // console.log(res)
      console.log(res.data);
    }
    fetchEmployees()
  }, [])

  return (
    <div className="flex flex-row bg-blue-500 justify-center items-center w-full h-screen">
        <div className="flex flex-col">
          <Link href="/employee/add-employee" className="p-4 bg-red-500 text-7xl rounded">Add Employee</Link>
          <p>Employee List</p>
          <div>
          {allEmployees.map((employee, index) => (
            <div className="flex flex-row gap-10" key={index}>
              <p>{employee.firstName}</p>
              <p>{employee.lastName}</p>
              <p>{employee.dateBirth}</p>
              <p>{employee.address}</p>
            </div>
          ))}
          </div>
        </div>

    </div>
  );
}
