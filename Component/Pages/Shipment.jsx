import React from "react";

const Shipment = () => {
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
    <div>
      <div className="collapse border border-gray-600 rounded-lg">
        <input type="checkbox" className="peer" />
        <div className="collapse-title bg-cyan-400 text-primary-content peer-checked:bg-gray-400 peer-checked:text-secondary-content ">
          <p className="text-black">Shipment </p>
        </div>
        <div className="collapse-content bg-cyan-400 text-primary-content peer-checked:bg-gray-400 peer-checked:text-secondary-content">
          <div>
            
            <div>
              <div className="max-w-6xl px-4 mx-auto my-4 md:my-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-medium text-3xl dark:text-white">
                      Shipment Details
                    </h2>{" "}
                  </div>

                  <div>
                    <button className="mr-3 group">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 group-hover:stroke-red-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>

                    <button className="ml-4 group">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 group-hover:stroke-green-300"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                        />
                      </svg>
                    </button>
                  </div>
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
                            <div className="text-sm text-gray-500 dark:text-slate-50">
                              {key}
                            </div>
                            <div className="text-sm font-medium text-black dark:text-white">
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
                        <button className="rounded-md bg-gray-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-gray-500">
                          View Order
                        </button>
                        <button className="rounded-md bg-gray-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-gray-500">
                          View Invoice
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipment;
