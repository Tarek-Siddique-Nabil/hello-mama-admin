import { motion, AnimatePresence } from "framer-motion";
import React, { useContext, useState } from "react";
import { CustomHookContext } from "../../../Hooks/useHooks";

const Unit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  console.log("🚀 ~ file: Unit.jsx:8 ~ Unit ~ selectedItem:", selectedItem);
  const [input, setinput] = useState(null);
  const { unit, createUnit, deleteUnit } = useContext(CustomHookContext);
  const handleCreate = async () => {
    const body = {
      unit: input,
    };
    await createUnit(body);
    setinput("");
  };
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
      <section
        className={
          isModalOpen === true
            ? "container flex w-full h-screen blur-sm transition-all duration-150 ease-in-out "
            : "container flex w-full h-screen transition-all duration-150 ease-in-out"
        }
      >
        <div className="w-1/2 flex flex-col items-center gap-3  ">
          <p className="text-xl font-bold italic">Existing Unit</p>

          {unit?.map((item, index) => (
            <div
              key={index}
              className="w-11/12 flex justify-between items-center  px-5 py-3 h-12 bg-slate-100 border border-black rounded-xl shadow-md shadow-gray-500"
            >
              <span className="text-xl font-bold">{item?.unit}</span>
              <button
                onClick={() => {
                  setIsModalOpen(!isModalOpen);
                  setSelectedItem(item);
                }}
                className="px-2.5 py-2 w-auto rounded-full bg-slate-50 shadow-md hover:shadow-lg shadow-gray-500 hover:shadow-red-500"
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
          ))}
        </div>
        <div className="w-1/2 flex flex-col items-center gap-3  h-screen ">
          <p className="text-xl font-bold text-violet-500">Craete Unit </p>
          <input
            onChange={(e) => setinput(e.target.value)}
            value={input}
            placeholder="Unit Name "
            className="w-10/12 h-12 px-3 py-2  outline-none border-2 border-black  focus:border-violet-600 rounded-xl transition-colors duration-300 ease-in-out"
          />
          <button
            onClick={() => handleCreate()}
            className="btn-md bg-sky-400 rounded-xl shadow-md hover:shadow-lg shadow-gray-500 hover:shadow-emerald-500"
          >
            Create
          </button>
        </div>
      </section>
      {isModalOpen === true && (
        <AnimatePresence>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            className={
              isModalOpen === true &&
              "fixed inset-0 bg-transparent    flex flex-wrap items-center justify-center"
            }
          >
            <motion.div
              className=" w-1/3 flex flex-col items-center px-5 py-3 h-auto bg-white border rounded-xl "
              initial={{ y: "-100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "-100vh" }}
              transition={{ duration: 0.35 }}
            >
              <p>ARE YOU WANT TO REMOVE IT </p>
              <div className="flex gap-3">
                <button
                  onClick={async () => {
                    {
                      await deleteUnit(selectedItem?._id),
                        setSelectedItem(null),
                        setIsModalOpen(!isModalOpen);
                    }
                  }}
                  className="btn-error  btn-md rounded-xl"
                >
                  Yes!
                </button>
                <button
                  onClick={() => {
                    setIsModalOpen(!isModalOpen), setSelectedItem(null);
                  }}
                  className="btn-primary btn-md rounded-xl"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default Unit;
