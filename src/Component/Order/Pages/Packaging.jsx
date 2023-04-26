import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CustomHookContext } from "../../../Hooks/useHooks";

const Packaging = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { packagingOrder, orderStatus } = useContext(CustomHookContext);
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
        {packagingOrder?.map((item) => (
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
              className="max-w-lg w-4/5 bg-white border rounded-xl"
              initial={{ y: "-100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "-100vh" }}
              transition={{ duration: 0.35 }}
            >
              <div className="border-b-2 border-black">
                <h5 className="m-0 text-xl p-4 text-left">Order Details</h5>
              </div>
              <div>
                <div className="flex justify-end gap-2">
                  <button className="group">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 group-hover:text-red-600"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    className="group"
                    onClick={async () => {
                      try {
                        await orderStatus(data?._id, {
                          status: "shipment",
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
                      className="w-6 h-6 group-hover:text-teal-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  <div className="overflow-x-auto">
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
                <button onClick={() => setIsModalOpen(!isModalOpen)}>
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Packaging;
