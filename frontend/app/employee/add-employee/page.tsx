'use client';

import { useEffect, useState } from "react";
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
  hiringDate: string;
}

interface PaymentSetting {
    id: string;
    paymentName: string;
}

export default function AddEmployee() {

    const [payments, setPayments] = useState<PaymentSetting[]>([]);


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
        hiringDate: '',
    });



    useEffect(() => {
        const fetchPayments = async () => {
            const r = await axios.get("http://localhost:3001/payment-settings/list-payments");
            setPayments(r.data);
        }
        fetchPayments();
    }, []);

    const paymentOptions = payments.map((payment) => ({
        value: payment.id.toString(),
        label: payment.paymentName,
    }))

    const formEdit = (e: any) => {
        const {name, value, type } = e.target;

        console.log("name: ", name);
        console.log("value: ", value);

        
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

    const formSubmit = async (e: any) => {
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
            <p className="font-bold">Add Employee Form</p>
            <form onSubmit={formSubmit}>
                <div>
                    <input className="border" name="lastName" value={formData.lastName} onChange={formEdit} placeholder="Last Name" />
                    <input className="border" name="firstName" value={formData.firstName} onChange={formEdit} placeholder="First Name" />
                </div>
                <div>
                    <input className="border" type="date" name="dateBirth" value={formData.dateBirth} onChange={formEdit} placeholder="Date of Birth" />
                    <input className="border ml-20" name="socialInsuranceNumber" value={formData.socialInsuranceNumber} onChange={formEdit} placeholder="Social Insurance Number" />
                </div>
                <div>
                    <input className="border" name="address" value={formData.address} onChange={formEdit}placeholder="Address" />
                    <input className="border" name="city" value={formData.city} onChange={formEdit} placeholder="City" />
                </div>
                <div>
                    <input className="border" name="province" value={formData.province} onChange={formEdit} placeholder="Province" />
                    <input className="border" name="postalCode" value={formData.postalCode} onChange={formEdit} placeholder="Postal Code" />
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

                        {paymentOptions.map((p) => (
                            <option key={p.value} value={p.value}>
                                {p.label}
                            </option>
                        ))}
                    </select>
                    <input className="border" type="number" name="amountNum" value={formData.amountNum} onChange={formEdit} />
                </div>
                <div>
                    <input className="border" type="date"  name="hiringDate" value={formData.hiringDate} onChange={formEdit} placeholder="Hiring Date" />
                </div>
                <div>
                    <button className="p-4 bg-red-500 text-3xl rounded" type="submit">Submit</button>
                </div>
            </form>
        </div>
        
    </div>
  );
}
