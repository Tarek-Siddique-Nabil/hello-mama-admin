import React, { useContext, useState } from "react";
import { CustomHookContext } from "../../Hooks/useHooks";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Dashboard = () => {
  const {
    post,
    b2bData,
    newOrder,
    packagingOrder,
    shipmentOrder,
    b2bRequestRemove,
  } = useContext(CustomHookContext);

  const newOrderPrice = newOrder.reduce(
    (sum, item) => sum + parseFloat(item.amount),
    0
  );
  let packagingOrderPrice = packagingOrder.reduce(
    (sum, item) => sum + parseFloat(item.amount),
    0
  );
  let shipmentOrderPrice = shipmentOrder.reduce(
    (sum, item) => sum + parseFloat(item.amount),
    0
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  console.log(
    "🚀 ~ file: Dashboard.jsx:23 ~ Dashboard ~ selectedItem:",
    selectedItem
  );

  const handleBaseImage = async (e) => {
    e.preventDefault();
    const { name, files } = e.target;
    if (name === "base_image" && files.length > 0) {
      const formData = new FormData();
      formData.append("image", files[0]);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_APP_SECRET_SERVER_SIDE}/upload`,
          formData
        );
        setSelectedItem({ ...selectedItem, image: res?.data?.imageUrl });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const hnadleSubmit = async () => {
    await post(selectedItem);
    await b2bRequestRemove(selectedItem?._id);
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      <section
        className={
          isModalOpen === true &&
          " blur-sm transition-all duration-150 ease-in-out "
        }
      >
        <div className="flex  md:flex-row flex-col stats stats-vertical lg:stats-horizontal shadow   items-center mx-auto">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <lord-icon
                className="inline-block"
                src="https://cdn.lordicon.com/iejknaed.json"
                trigger="hoverF"
                style={{ width: "80px", height: "80px" }}
              ></lord-icon>
            </div>
            <div className="font-extrabold text-lg underline underline-offset-1">
              Shipping Order
            </div>
            <div className="flex  justify-between items-center">
              <div className="stat-value">{shipmentOrder?.length || 0}</div>
              <div className="font-semibold text-lg">${shipmentOrderPrice}</div>
            </div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <lord-icon
                className="inline-block"
                src="https://cdn.lordicon.com/cllunfud.json"
                trigger="hover"
                style={{ width: "80px", height: "80px" }}
              ></lord-icon>
            </div>
            <div className="font-extrabold text-lg underline underline-offset-1">
              Packaging Order
            </div>
            <div className="flex  justify-between items-center">
              <div className="stat-value">{packagingOrder?.length || 0}</div>
              <div className="font-semibold text-lg">
                ${packagingOrderPrice}
              </div>
            </div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <lord-icon
                className="inline-block"
                src="https://cdn.lordicon.com/qzwudxpy.json"
                trigger="hover"
                style={{ width: "80px", height: "80px" }}
              ></lord-icon>
            </div>
            <div className="font-extrabold text-lg underline underline-offset-1">
              New Order
            </div>
            <div className="flex  justify-between items-center">
              <div className="stat-value">{newOrder?.length || 0}</div>
              <div className="font-semibold text-lg">${newOrderPrice}</div>
            </div>
          </div>
        </div>
        <div className="flex  md:flex-row  flex-col  justify-between  items-center px-5">
          <div className="h-[400px]">
            <p className="dark:text-slate-50 text-xl font-bold text-center underline ">
              Inbox
            </p>
            <div className="alert shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-info flex-shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <div>
                  <h3 className="font-bold">New message!</h3>
                  <div className="text-xs">You have 1 unread message</div>
                </div>
              </div>
              <div className="flex-none">
                <button className="btn btn-sm">See</button>
              </div>
            </div>
          </div>
          <div className="h-[400px] ">
            <p className="dark:text-slate-50 text-xl font-bold text-center underline">
              B2B User
            </p>
            <div className=" flex flex-col overflow-y-scroll gap-4 h-96 border border-black">
              {b2bData.map((item, index) => (
                <div
                  key={index}
                  className={
                    item.type === "add"
                      ? "alert bg-emerald-400 shadow-lg hover:cursor-pointer shadow-yellow-500 hover:shadow-sky-300 transition-all duration-150 ease-in-out"
                      : item.type === "delete"
                      ? "alert bg-red-500 shadow-lg hover:cursor-pointer shadow-orange-500 hover:shadow-pink-500 transition-all duration-150 ease-in-out"
                      : item.type === "update"
                      ? "alert bg-cyan-500 shadow-lg"
                      : "alert shadow-lg"
                  }
                >
                  <div>
                    <div className="avatar">
                      <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-md ">
                        <span className="font-bold">Number:</span>{" "}
                        {item.postFrom}
                      </div>
                    </div>
                  </div>
                  <div className="flex-none">
                    <button
                      onClick={() => {
                        setIsModalOpen(!isModalOpen), setSelectedItem(item);
                      }}
                      className="btn btn-sm"
                    >
                      See
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {isModalOpen == true && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={
              isModalOpen === true &&
              "fixed  inset-0 z-50 bg-transparent    flex items-center justify-center"
            }
          >
            {selectedItem.type === "update" ? (
              <motion.div
                className="max-w-lg w-1/3  h-1/2  bg-gray-800 border rounded-xl "
                initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                exit={{ scale: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  duration: 0.3,
                }}
              >
                <section className="flex  h-3/4 border border-white px-2 py-1 justify-between gap-x-5  items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 1 }}
                    transition={{ duration: 0.35, delay: 0.7 }}
                    className="w-36 h-36"
                  >
                    {selectedItem?.image ? (
                      <div className="relative">
                        <img
                          className="w-36 h-36 rounded-lg"
                          src={selectedItem.image}
                        />
                        <button
                          onClick={() => {
                            setSelectedItem((prevProduct) => {
                              const { image, ...updatedProduct } = prevProduct;
                              return updatedProduct;
                            });
                          }}
                          className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full z-20"
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
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center  w-36 h-36 border border-slate-50  rounded-xl">
                        <input
                          onChange={(e) => handleBaseImage(e)}
                          name="base_image"
                          type="file"
                          className="w-[139px] h-[139px] rounded-xl opacity-0 "
                        />
                        <p className="absolute z-20 text-white hover:cursor-pointer">
                          Image Upload
                        </p>
                      </div>
                    )}
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 1 }}
                    transition={{ duration: 0.35, delay: 0.7 }}
                    className="text-white"
                  >
                    <p>
                      <span className="text-xl  font-semibold">Title:-</span>
                      <span>{selectedItem.title}</span>
                    </p>
                    <p>
                      <span className="text-xl font-semibold">Price:-</span>
                      <span>{selectedItem.price}</span>
                    </p>
                    <p>
                      <span className="text-xl font-semibold">PriceB2B:-</span>
                      <span>{selectedItem.priceb2b}</span>
                    </p>
                    <p>
                      <span className="text-xl font-semibold">Category:-</span>
                      <span>{selectedItem.category}</span>
                    </p>
                    <p>
                      <span className="text-xl font-semibold">
                        SubCategory:-
                      </span>
                      <span>{selectedItem.subCategory}</span>
                    </p>
                    <p>
                      <span className="text-xl font-semibold">
                        Description:-
                      </span>
                      <span>{selectedItem.description}</span>
                    </p>
                  </motion.div>
                </section>
                <motion.div className="flex flex-col justify-center items-center ">
                  <p className="text-xl text-white ">
                    Are you want to add this in store ?
                  </p>
                  <motion.div className="flex  justify-center gap-x-3">
                    <motion.button
                      initial={{ x: "-100vh" }}
                      animate={{ x: 0 }}
                      exit={{ x: "-100vh" }}
                      transition={{ duration: 0.35, delay: 0.3 }}
                      className="text-slate-50 text-xl bg-teal-400 px-2.5 py-1 rounded-xl shadow-lg shadow-gray-500
                  "
                      onClick={hnadleSubmit}
                    >
                      Yes
                    </motion.button>
                    <motion.button
                      initial={{ x: "100vh" }}
                      animate={{ x: 0 }}
                      exit={{ x: "100vh" }}
                      transition={{ duration: 0.35, delay: 0.3 }}
                      onClick={() => {
                        setIsModalOpen(!isModalOpen), setSelectedItem(null);
                      }}
                      className="text-slate-50 text-xl bg-red-400 px-2.5 py-1 rounded-xl shadow-lg shadow-gray-500"
                    >
                      No
                    </motion.button>
                  </motion.div>
                  <motion.div className="flex gap-4 mt-1.5"></motion.div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                className="max-w-lg w-1/3  h-1/2  bg-gray-800 border rounded-xl "
                initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                exit={{ scale: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  duration: 0.3,
                }}
              >
                <motion.div>
                  <p>Previous</p>
                  <div>
                    <p></p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Dashboard;
