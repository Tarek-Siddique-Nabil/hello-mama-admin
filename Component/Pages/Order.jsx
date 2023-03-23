import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
const Order = () => {
  const [isVisible, setVisible] = useState(false);
  const products = [
    {
      id: 1,
      name: "APPLE iPhone 13 (Midnight, 128 GB)",
      imageSrc:
        "https://dev-ui-image-assets.s3.ap-south-1.amazonaws.com/order-confirmed/iphone-13-mlpf3hn-a-apple-original-imag6vzz5qvejz8z.jpeg?q=70",
      href: "#",
      price: "₹61,999",
      color: "Midnight",
      imageAlt: "APPLE iPhone 13 (Midnight, 128 GB)",
      quantity: 1,
    },
    {
      id: 2,
      name: "APPLE Airpods Pro with MagSafe Charging Case Bluetooth Headset",
      imageSrc:
        "https://dev-ui-image-assets.s3.ap-south-1.amazonaws.com/order-confirmed/mwp22hn-a-apple-original-imag3qe9eqkfhmg8.jpeg?q=70",
      href: "#",
      price: "₹22,500",
      color: "White, True Wireless",
      imageAlt:
        "APPLE Airpods Pro with MagSafe Charging Case Bluetooth Headset",
      quantity: 1,
    },
  ];
  return (
    <>
      <div className="">
        <p className="text-center text-2xl font-bold underline">Order</p>
        <motion.div className="card w-96 bg-base-100 ">
          <div className="card-body">
            <h2 className="card-title">Card title!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => setVisible(!isVisible)}
              >
                Buy Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="flex justify-center items-center h-screen z-40 relative shadow-2xl"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 15,
              backgroundColor: "#ffff",
            }}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <div className="max-w-6xl px-4 mx-auto my-4 md:my-6">
              <div className="flex justify-between">
                <div>
                  <h2 className="font-medium text-3xl dark:text-white">
                    Order Details
                  </h2>
                  <div className="mt-3 font-normal dark:text-gray-400">
                    Check the status of recent and old orders & discover more
                    products
                  </div>
                </div>
                <button onClick={()=>setVisible(!isVisible)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-8 md:flex-row flex flex-col border border-gray-300 rounded-lg overflow-hidden">
                <div className="md:max-w-xs w-full border-r border-gray-300 bg-gray-100 dark:border-gray-300 dark:bg-gray-800">
                  <div className="p-8">
                    <div className="grid md:grid-cols-1 sm:grid-cols-4 grid-cols-2">
                      {[
                        ["Order ID", "#74557994327"],
                        ["Date", "4 March, 2023"],
                        ["Total Amount", "₹84,499"],
                        ["Order Status", "Confirmed"],
                      ].map(([key, value]) => (
                        <div key={key} className="mb-4">
                          <div className="text-sm text-gray-500 dark:text-white">
                            {key}
                          </div>
                          <div className="text-sm font-medium dark:text-gray-400">
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex-1 dark:bg-gray-600">
                  <div className="p-8">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-500 -my-7">
                      {products.map((product) => (
                        <li
                          key={product.id}
                          className="flex items-stretch justify-between space-x-5 py-7"
                        >
                          <div className="flex items-stretch flex-1">
                            <div className="flex-shrink-0">
                              <img
                                className="w-20 h-20 border border-gray-200 rounded-lg object-contain"
                                src={product.imageSrc}
                                alt={product.imageSrc}
                              />
                            </div>

                            <div className="flex flex-col justify-between ml-5">
                              <div className="flex-1">
                                <p className="text-sm font-bold text-gray-900 dark:text-white">
                                  {product.name}
                                </p>
                                <p className="mt-1.5 text-sm font-medium text-gray-500 dark:text-gray-300">
                                  {product.color}
                                </p>
                              </div>

                              <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-300">
                                x {product.quantity}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col items-end justify-between ml-auto">
                            <p className="text-sm font-bold text-right text-gray-900 dark:text-white">
                              {product.price}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <hr className="my-8 border-t border-t-gray-200 dark:border-gray-500" />
                    <div className="space-x-4">
                      <button className="rounded-md bg-red-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-red-700">
                        Cancel
                      </button>
                      <button className="rounded-md bg-cyan-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-cyan-700">
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Order;
