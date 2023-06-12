import React, { useContext, useState } from "react";
import { CustomHookContext } from "../../../Hooks/useHooks";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Banner = () => {
  const { bannerData, createBanner, deleteBanner } =
    useContext(CustomHookContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bannerImage, setBannerImage] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
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
  const handleCategoryImage = async (e) => {
    e.preventDefault();
    const { name, files } = e.target;
    if (name === "banner" && files.length > 0) {
      const formData = new FormData();
      formData.append("image", files[0]);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_APP_SECRET_SERVER_SIDE}/upload`,
          formData
        );
        if (res?.data?.imageUrl) {
          return setBannerImage(res?.data?.imageUrl);
        } else {
          const url = `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_APP_SECRET_IMG_API_KEY
          }`;
          const formData = new FormData();
          formData.append("image", files[0]);
          await axios.post(url, formData).then((result) => {
            setBannerImage(result?.data?.data?.url);
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleForm = async (e) => {
    e.preventDefault();
    const dataBanner = {
      image: bannerImage,
      details: e.target.details.value,
    };
    await createBanner(dataBanner);
    setBannerImage(null);
    e.target.details.value = "";
    e.target.banner.value = "";
  };
  return (
    <>
      <div className="container flex flex-wrap justify-between items-center gap-5">
        <div className="w-[49%] min-h-screen border border-black rounded-xl px-5">
          <p className="text-lg font-semibold border-b-2 border-lime-600 text-center">
            Existing Banner
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            {bannerData?.map((item, index) => (
              <div key={index} className="relative">
                <img
                  className="w-32 h-32 border border-black rounded-xl -z-30"
                  src={item?.image}
                />
                <button
                  onClick={() => {
                    setIsModalOpen(!isModalOpen), setSelectedItem(item);
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
            ))}
          </div>
        </div>
        <div className="w-[49%] min-h-screen border border-black rounded-xl px-5">
          <p className="text-violet-600 font-semibold border-b-2 border-cyan-400 text-center text-lg">
            New Banner ADD
          </p>
          <form onSubmit={handleForm} className="flex flex-col gap-3 mt-3">
            <textarea
              name="details"
              type="text"
              placeholder="Details"
              className="textarea  textarea-primary w-full max-w-xs"
            />
            <input
              onChange={(e) => handleCategoryImage(e)}
              name="banner"
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            />
            <button type="submit" className="btn btn-primary w-1/4 ">
              Submit
            </button>
          </form>
        </div>
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
              "fixed  inset-0 z-50 bg-transparent    flex items-center justify-center"
            }
          >
            <motion.div
              className="max-w-lg w-1/3  h-1/3 overflow-y-auto bg-gray-800 border rounded-xl "
              initial={{ scale: 0 }}
              animate={{ rotate: 360, scale: 1 }}
              exit={{ scale: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <motion.div className="flex flex-col justify-center items-center h-full">
                <motion.img
                  initial={{ y: "-100vh" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100vh" }}
                  transition={{ duration: 0.6 }}
                  className="w-1/3 h-1/2 rounded-xl"
                  src={selectedItem?.image}
                />

                <p className="text-xl text-white ">
                  Are you want to remove this ?
                </p>
                <motion.div className="flex gap-4 mt-1.5">
                  <motion.button
                    onClick={() => {
                      deleteBanner(selectedItem?._id),
                        setIsModalOpen(!isModalOpen);
                    }}
                    className="text-white border px-2.5 py-1.5 bg-red-500 rounded-lg"
                  >
                    Yes
                  </motion.button>
                  <motion.button
                    className="text-white border px-2.5 py-1.5 bg-transparent rounded-lg"
                    onClick={() => setIsModalOpen(!isModalOpen)}
                  >
                    No
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Banner;
