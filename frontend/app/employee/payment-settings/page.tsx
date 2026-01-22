'use client';

import { useState } from "react";
import axios from "axios";


interface FormData {
  lastName: string;
  firstName: string;
  dateBirth: string;
  socialInsuranceNumber: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  paymentFreq: string;
  amountNum: number;
}

export default function AddEmployee() {


    const [formData, setFormData] = useState<FormData>({
        lastName: '',
        firstName: '',
        dateBirth: '',
        socialInsuranceNumber: '',
        address: '',
        city: '',
        province: '',
        postalCode: '',
        paymentFreq: '',
        amountNum: 0,
    });


    const payment = [
        {value: "Biweekly", label: "Biweekly"},
        {value: "Monthly", label: "Monthly"},
        {value: "Yearly", label: "Yearly"}
    ]

    const formEdit = (e) => {
        const {name, value, type } = e.target;

        if (type === "number") {
            setFormData(prev => ({
                ...prev,
                [name]: +value,
            }));
        } else {
        setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }

    }

    const formSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = `http://localhost:3001/employee/add-employee`;

            const urlMethod = 'post';

            const res = await axios[urlMethod](url, formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res.status === 200 || res.status === 201) {
                setFormData(res.data);
                alert("Employee added successfully");
                
            } else {
                alert("Error in adding employee")
            }
        } catch (e: any) {
            alert("Error occured while adding employee: " + e.message);
        }


    }



  return (
    <div className="flex flex-row bg-blue-500 justify-center items-center w-full h-screen">
        <div className="flex flex-col">
            <p>Payment Settings</p>
            <form onSubmit={formSubmit}>
                <div>
                    <input name="lastName" value={formData.lastName} onChange={formEdit} placeholder="Last Name" />
                    <input name="firstName" value={formData.firstName} onChange={formEdit} placeholder="First Name" />
                </div>
                <div>
                    <input type="date" name="dateBirth" value={formData.dateBirth} onChange={formEdit} placeholder="Date of Birth" />
                    <input name="socialInsuranceNumber" value={formData.socialInsuranceNumber} onChange={formEdit} placeholder="Social Insurance Number" />
                </div>
                <div>
                    <input name="address" value={formData.address} onChange={formEdit}placeholder="Address" />
                    <input name="city" value={formData.city} onChange={formEdit} placeholder="City" />
                </div>
                <div>
                    <input name="province" value={formData.province} onChange={formEdit} placeholder="Province" />
                    <input name="postalCode" value={formData.postalCode} onChange={formEdit} placeholder="Postal Code" />
                </div>
                <div>
                    <select
                    name="paymentFreq"
                    value={formData.paymentFreq}
                    onChange={formEdit}
                    >
                        <option value="" disabled>
                            Payment Frequency
                        </option>

                        {payment.map((p) => (
                            <option key={p.value} value={p.value}>
                                {p.label}
                            </option>
                        ))}
                    </select>
                    <input type="number" name="amountNum" value={formData.amountNum} onChange={formEdit} placeholder="Amount" />
                </div>
                <div>
                    <button className="p-4 bg-red-500 text-3xl rounded" type="submit">Submit</button>
                </div>
            </form>
        </div>
        
    </div>
  );
}
