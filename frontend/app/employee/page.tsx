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
  hiringDate: string;
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
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };


  return (
    <div className="flex flex-row bg-blue-500 justify-center items-center w-full h-screen">
        <div className="flex flex-col">
          <Link href="/employee/add-employee" className="p-4 bg-red-500 text-7xl rounded">Add Employee</Link>
          <p>Employee List Below</p>
          <div className="mt-6 border-gray-300 rounded-lg overflow-hidden bg-amber-500">
            <div className="grid grid-cols-5 text-center font-bold">
              <p>First Name</p>
              <p>Last Name</p>
              <p>Date of birth</p>
              <p>Postal Code</p>
              <p>Hiring Date</p>
            </div>
            <div>
            {allEmployees.map((employee, index) => (
              <div className="grid grid-cols-5 text-center font-bold" key={index}>
                <p>{employee.firstName}</p>
                <p>{employee.lastName}</p>
                <p>{formatDate(employee.dateBirth)}</p>
                <p>{employee.postalCode}</p>
                <p>{formatDate(employee.hiringDate)}</p>
              </div>
            ))}
            </div>
          </div>


          <div>
            <Link href="/employee/payment-settings" className="bg-red-500 text-amber-50"> Click to add Payment Settings</Link>
          </div>
        </div>

    </div>
  );
}
