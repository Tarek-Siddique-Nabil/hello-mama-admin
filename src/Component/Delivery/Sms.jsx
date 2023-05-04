import React, { useContext, useState } from "react";
import { CustomHookContext } from "../../Hooks/useHooks";
import { toast } from "react-hot-toast";
import axios from "axios";

const Sms = () => {
  const { shipmentOrder, orderStatus } = useContext(CustomHookContext);
  const [input, setInput] = useState(null);
  const data = [];

  for (const order of shipmentOrder) {
    if (
      order?.info[0]?.number?.toLowerCase().indexOf(input?.toLowerCase()) != -1
    ) {
      data.push(order);
    }
  }
  const sendSms = (number) => {
    const randomNumber = (Math.random() * 10000) / 10000;
    const postSMS = async () => {
      try {
        const url = `http://sms.mayabd.org/smsapi?api_key=${
          import.meta.env.VITE_APP_SECRET_SMS_API_KEY
        }&type=text&contacts=${number}&senderid=${
          import.meta.env.VITE_APP_SECRET_SMS_API_SENDER_ID
        }&msg=${randomNumber.toFixed(5)} `;
        const response = await axios.post(url);
        const json = response.data;
        console.log("🚀 ~ file: Sms.jsx:22 ~ sendSms ~ json:", json);
      } catch (err) {
        toast.error(err.message, {
          position: "top-center",
        });
      }
    };
    postSMS(); // Call the postSMS function to send the SMS
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <p className="text-xl font-semibold">Delivery </p>
        <div>
          <input
            onChange={(e) => setInput(e.target.value)}
            className="w-48 h-10 p-2 rounded-lg border border-cyan-200 "
            placeholder="Search by number"
          />
        </div>

        {data &&
          data.map((item, index) => (
            <div
              key={index}
              className="flex flex-wrap justify-between items-center border-2 border-gray-600 my-2 p-2 rounded-xl"
            >
              <div>
                <div>
                  <p className="text-lg font-semibold">Shipping Address:-</p>
                  <p>
                    {item?.info[0]?.division} ,{item?.info[0]?.district},
                    {item?.info[0]?.upazila}
                  </p>
                </div>
                <div>
                  <p className="text-xl font-bold">Details</p>
                  <div>
                    <div>
                      <p>
                        <span className="font-medium text-lg">Name:-</span>
                        <span>{item?.info[0]?.fullName}</span>
                      </p>
                      <p>
                        <span className="font-medium text-lg">Number:-</span>
                        <span>{item?.info[0]?.number}</span>
                      </p>
                      <p>
                        <span className="font-medium text-lg">Email:-</span>
                        <span>{item?.info[0]?.createdByEmail}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold">Order Info</p>
                <div>
                  <p>
                    <span className="font-semibold">Total:-</span>
                    <span>{item?.amount}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-semibold">Transiction Id :-</span>
                    <span>{item?.transaction_id}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-semibold">Payment Number :-</span>
                    <span>{item?.payment_number}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-semibold">Status :-</span>
                    <span>{item?.status}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-semibold">Order Date :-</span>
                    <span>{item?.time}</span>
                  </p>
                </div>
              </div>
              <div className="w-full flex gap-5 ">
                <input
                  className="w-1/2 border-blue-400 border rounded-lg px-2
                  "
                  placeholder="CODE"
                />
                <div className="w-1/2 flex gap-3">
                  <button
                    onClick={() => sendSms({ number: item?.info[0]?.number })}
                    className="bg-sky-400 p-2 rounded-xl"
                  >
                    Send Code
                  </button>
                  <button className="bg-teal-300 p-2 rounded-xl">Verify</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Sms;
