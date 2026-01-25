'use client';

import { useState } from "react";
import axios from "axios";


interface FormData {
  paymentName: string;
  paymentLastDate: string;
}

export default function PaymentSetting() {


    const [formData, setFormData] = useState<FormData>({
        paymentName: '',
        paymentLastDate: '',
    });


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
            const url = `http://localhost:3001/payment-settings/add-payment`;

            const urlMethod = 'post';

            const res = await axios[urlMethod](url, formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res.status === 200 || res.status === 201) {
                setFormData(res.data);
                alert("Payment added successfully");
                
            } else {
                alert("Error in adding payment")
            }
        } catch (e: any) {
            alert("Error occured while adding payment: " + e.message);
        }


    }



  return (
    <div className="flex flex-row bg-blue-500 justify-center items-center w-full h-screen">
        <div className="flex flex-col">
            <p>Payment Settings</p>
            <form onSubmit={formSubmit}>
                <div>
                    <input type="text" name="paymentName" value={formData.paymentName} onChange={formEdit} placeholder="Title" />
                    <input type="date" name="paymentLastDate" value={formData.paymentLastDate} onChange={formEdit} placeholder="00000000" />
                </div>
                <div>
                    <button className="p-4 bg-red-500 text-3xl rounded" type="submit">Submit</button>
                </div>
            </form>
        </div>
        
    </div>
  );
}
