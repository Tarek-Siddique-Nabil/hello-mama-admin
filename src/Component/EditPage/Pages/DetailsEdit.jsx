import React, { useContext, useEffect, useRef, useState } from "react";
import { CustomHookContext } from "../../../Hooks/useHooks";

import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

const DetailsEdit = () => {
  const { products, update, categories, unit, loading } =
    useContext(CustomHookContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const [input, setinput] = useState(null);
  const output = [];
  for (const product of products) {
    if (product?.title.toLowerCase().indexOf(input?.toLowerCase()) != -1) {
      output.push(product);
    }
  }
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [quantity, setQuantity] = useState(5);
  const [base_image, setBase_image] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [highLightPointList, setHighLightPointList] = useState(
    selectedItem?.spec?.map((item) => ({
      highLightPoint: item.highLightPoint,
    })) || []
  );

  const handleCategoryChange = (selectedValue) => {
    setSelectedCategory(selectedValue);
    setSelectedSubCategory(null);
  };

  const handleSubCategoryChange = (selectedValue) => {
    setSelectedSubCategory(selectedValue);
  };

  const highLightPointChange = (e, index) => {
    const { value } = e.target;
    setHighLightPointList((prevList) =>
      prevList.map((item, i) =>
        i === index ? { ...item, highLightPoint: value } : item
      )
    );
  };

  // When the selectedItem changes, update the highLightPointList state
  useEffect(() => {
    setHighLightPointList(selectedItem?.spec || []);
  }, [selectedItem]);

  const handleBaseImage = async (e) => {
    e.preventDefault();
    const { name, files } = e.target;
    if (name === "image" && files.length > 0) {
      const formData = new FormData();
      formData.append("image", files[0]);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_APP_SECRET_SERVER_SIDE}/upload`,
          formData
        );
        if (res?.data?.imageUrl) {
          return setBase_image(res?.data?.imageUrl);
        } else {
          const url = `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_APP_SECRET_IMG_API_KEY
          }`;
          const formData = new FormData();
          formData.append("image", files[0]);
          await axios.post(url, formData).then((result) => {
            setBase_image(result?.data?.data?.url);
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
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

  const handleSubmited = async (e) => {
    e.preventDefault();
    const { title, price, priceb2b, description } = e.target;
    const data = {
      title: title.value || selectedItem?.title,
      price: price.value || selectedItem?.price,
      priceb2b: priceb2b.value || selectedItem?.priceb2b,
      quantity: quantity,
      description: description.value || selectedItem?.description,
      category: selectedCategory || selectedItem?.category,
      subCategory: selectedSubCategory || selectedItem?.subCategory,
      image: base_image || selectedItem?.image,
      spec: highLightPointList || selectedItem?.spec,
      unit: selectedUnit || selectedItem?.unit,
    };

    await update(selectedItem?._id, data);
    e.target.reset();
    setQuantity(5);
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-transparent">
        <div className="w-auto px-2.5 py-2 rounded-xl hover:shadow-teal-400 animate-bounce h-10 shadow-lg shadow-gray-600">
          <p className="text-xl font-semibold ">Loading.....</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <section className={isModalOpen === true ? "blur-sm" : ""}>
        <div className="flex  justify-end">
          <div className="flex flex-col relative">
            <input
              className="border-2 px-2 lg:w-72 border-red-600 h-9 rounded-l-lg  focus:outline-none"
              onChange={(e) => setinput(e.target.value)}
              placeholder="Type here..."
            />

            {input && (
              <div className="absolute top-11 z-50 h-72  overflow-auto w-60 lg:w-80 bg-white border-2 border-red-600 rounded-b-lg text-left -mt-1 -ml-5  p-2 drop-shadow-xl">
                {output?.length <= 0 ? (
                  <section>
                    <p>No Products Found</p>
                  </section>
                ) : (
                  <section>
                    {output?.slice(0, 10).map((item, index) => (
                      <button
                        // to={`/products/${item?._id}`}
                        // state={{ item: item }}
                        key={index}
                        onClick={() => {
                          setSelectedItem(item), setinput(null);
                        }}
                        className="w-full flex  items-center cursor-pointer py-4 border-2 my-1 px-1 rounded-xl hover:border-cyan-400"
                      >
                        <img
                          src={item?.image}
                          alt={item?.title}
                          className="rounded-lg w-7 h-7 lg:w-[35px] lg:h-[35px] border border-gray-900 object-cover mr-3"
                        />
                        <p>{item?.title}</p>
                      </button>
                    ))}
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
        {selectedItem && (
          <section className="container flex justify-center">
            <div className="w-1/2 flex justify-center">
              {selectedItem?.image ? (
                <div className="w-64 relative">
                  <img
                    className="w-64 h-64 border border-black rounded-xl -z-30"
                    src={selectedItem?.image}
                  />
                  <button
                    onClick={() => {
                      setIsModalOpen(!isModalOpen);
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
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-52 h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>
                      <br /> or drag and drop
                    </p>
                  </div>

                  <input
                    onChange={(e) => handleBaseImage(e)}
                    id="dropzone-file"
                    type="file"
                    name="image"
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <div className="w-1/2   ">
              <form onSubmit={handleSubmited} className="flex flex-col gap-3">
                <div className="flex flex-col">
                  <span>
                    <span className="font-bold text-lg">Title</span>:-
                    {selectedItem?.title}
                  </span>
                  <input
                    name="title"
                    className="w-11/12 px-4 py-2.5 border border-black rounded-xl"
                  />
                </div>
                <div className="flex flex-col">
                  <span>Price:-{selectedItem?.price}</span>
                  <input
                    name="price"
                    className="w-11/12 px-4 py-2.5 border border-black rounded-xl"
                  />
                </div>
                <div className="flex flex-col">
                  <span>Price B2b:-{selectedItem?.priceb2b}</span>
                  <input
                    name="priceb2b"
                    className="w-11/12 px-4 py-2.5 border border-black rounded-xl"
                  />
                </div>
                <div className="flex flex-col">
                  <span>Quantity:-{selectedItem?.quantity}</span>
                  <input
                    name="quantity"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-11/12 px-4 py-2.5 border border-black rounded-xl"
                  />
                </div>
                <div className="flex flex-col">
                  <span>Category:-{selectedItem?.category}</span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="select select-accent w-full max-w-xs"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <span>Sub-Category:-{selectedItem?.subCategory}</span>
                  {selectedCategory && (
                    <div>
                      <select
                        value={selectedSubCategory}
                        onChange={(e) =>
                          handleSubCategoryChange(e.target.value)
                        }
                        className="select select-primary w-full max-w-xs"
                      >
                        <option value="">Select Subcategory</option>
                        {categories
                          .find(
                            (category) => category.value === selectedCategory
                          )
                          .children.map((subCategory) => (
                            <option
                              key={subCategory._id}
                              value={subCategory.value}
                            >
                              {subCategory.label}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <span>Highlight Point:-</span>
                  <ul className="mt-4">
                    {highLightPointList.map((item, index) => (
                      <li key={index}>
                        <span
                          className={
                            index % 2 === 0
                              ? "text-amber-500 font-extrabold italic"
                              : "text-cyan-500 font-extrabold italic"
                          }
                        >
                          &#x2022;
                        </span>
                        <input
                          id={`highLightPoint-${index}`}
                          onChange={(e) => highLightPointChange(e, index)}
                          className="w-full"
                          value={item.highLightPoint || ""}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col border border-black px-3 py-2">
                  <span>
                    Description:-
                    <br />
                    {selectedItem?.description}
                  </span>
                  <input className="h-20" name="description" />
                </div>

                {
                  <div className="flex flex-col">
                    <span>Unit:-{selectedItem?.unit}</span>
                    <select
                      value={selectedUnit}
                      onChange={(e) => setSelectedUnit(e.target.value)}
                      className="select select-accent w-full max-w-xs"
                    >
                      <option value="">Select Unit</option>
                      {unit?.map((item, index) => (
                        <option key={index} value={item?.unit}>
                          {item.unit}
                        </option>
                      ))}
                    </select>
                  </div>
                }

                <div className="flex justify-center gap-3">
                  <button type="submit" className="btn btn-primary">
                    SAVE
                  </button>
                  <button className="btn btn-error ">Cancel</button>
                </div>
              </form>
            </div>
          </section>
        )}
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
                      setSelectedItem((prevProduct) => ({
                        ...prevProduct,
                        image: null,
                      }));
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

export default DetailsEdit;
