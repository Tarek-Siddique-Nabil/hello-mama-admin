import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CustomHookContext } from "../../../Hooks/useHooks";
const Shipments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { shipmentOrder, orderStatus } = useContext(CustomHookContext);
  const [data, setData] = useState(null);

  const overlayVariants = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        duration: 0.3,
        delayChildren: 0.4,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        duration: 0.3,
        delay: 0.4,
      },
    },
  };
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
        {shipmentOrder?.map((item) => (
          <div
            key={item._id}
            className={
              isModalOpen === true
                ? "blur-sm card card-compact w-96 bg-base-100 shadow-lg shadow-gray-600 "
                : " rounded-xl card-compact w-96 bg-base-100 shadow-lg shadow-gray-600 "
            }
          >
            <div className="card-body">
              <h2 className="card-title">Order!</h2>
              <p>
                <span className="text-lg font-semibold">Product</span>
                <span className="text-base">:-{item?.order.length}</span>
              </p>
              <p>
                <span className="text-lg font-semibold">Amount</span>
                <span className="text-base">:-{item?.amount}</span>
              </p>
              <p>
                <span className="text-lg font-semibold">
                  Transiction Number
                </span>
                <span className="text-base">:-{item?.transaction_id}</span>
              </p>
              <p>
                <span className="text-lg font-semibold">Payment Number</span>
                <span className="text-base">:-{item?.payment_number}</span>
              </p>
              <div className="card-actions justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(!isModalOpen), setData(item);
                  }}
                  className="btn btn-primary"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            className={
              isModalOpen === true &&
              "fixed inset-0 bg-transparent    flex items-center justify-center"
            }
          >
            <motion.div
              className="max-w-2xl w-4/5 h-4/6 overflow-y-auto bg-white border rounded-xl "
              initial={{ y: "-100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "-100vh" }}
              transition={{ duration: 0.35 }}
            >
              <div className="border-b-2 border-black ">
                <div className="flex justify-between px-3 items-center">
                  <h5 className="m-0 text-xl p-4 ">Order Details</h5>
                  <button
                    className="border  border-gray-700 p-1.5 rounded-lg"
                    onClick={() => setIsModalOpen(!isModalOpen)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <div className="flex justify-end gap-2">
                  <button
                    className="group"
                    onClick={async () => {
                      try {
                        await orderStatus(data?._id, {
                          status: "cancelled",
                        });
                        setIsModalOpen(!isModalOpen);
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-10 h-10 group-hover:text-red-600"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  <div className="w-auto h-40">
                    <h2 className="text-xl font-semibold text-center">
                      Buyer Info!
                    </h2>
                    <div className="flex flex-col px-5">
                      <p>
                        <span>Name</span>:-<span>{data.info[0]?.fullName}</span>
                      </p>
                      <p>
                        <span>Location</span>:-
                        <span>{data.info[0]?.upazila}</span> ,
                        <span>{data.info[0]?.district}</span> ,
                        <span>{data.info[0]?.division}</span>
                      </p>
                      <p>
                        <span>Number</span>:-<span>{data.info[0]?.number}</span>
                      </p>
                    </div>
                  </div>
                  <div className="px-5 mt-5">
                    <table className="table w-full">
                      {/* head */}
                      <thead>
                        <tr>
                          <th></th>
                          <th>Image</th>
                          <th>Title</th>
                          <th>Quantity</th>
                          <th>Price</th>

                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* row 1 */}

                        {data.order?.map((item, index) => (
                          <tr key={index}>
                            <th>{index + 1}</th>
                            <td>
                              {" "}
                              <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                  <img
                                    src={item.image}
                                    alt="Avatar Tailwind CSS Component"
                                  />
                                </div>
                              </div>
                            </td>
                            <td>{item.title.slice(0, 25)}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.price * item.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="flex justify-end mr-3">
                  <button
                    className="bg-cyan-300 hover:text-gray-900 border  rounded-xl px-2.5 py-2 "
                    onClick={() => setIsModalOpen(!isModalOpen)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Shipments;
