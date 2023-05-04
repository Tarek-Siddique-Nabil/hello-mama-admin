import React, { useContext, useEffect, useRef, useState } from "react";
import { CustomHookContext } from "../../../Hooks/useHooks";
import { toast } from "react-hot-toast";

const DetailsEdit = () => {
  const { products, update } = useContext(CustomHookContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const [input, setinput] = useState(null);
  const output = [];
  for (const product of products) {
    if (product?.title.toLowerCase().indexOf(input?.toLowerCase()) != -1) {
      output.push(product);
    }
  }
  const [title, setTitle] = useState(null);
  const [price, setprice] = useState(null);
  const [priceb2b, setPriceb2b] = useState(null);
  const [description, setDescription] = useState(null);
  const [highLightPointList, setHighLightPointList] = useState(
    selectedItem?.spec?.map((item) => ({
      highLightPoint: item.highLightPoint,
    })) || []
  );

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

  const alreadyShownToast = useRef(false);
  if (title || price || priceb2b || description) {
    if (!alreadyShownToast.current) {
      toast.custom(
        (t) => (
          <div className="bg-slate-100 border border-gray-900 rounded-xl shadow-lg shadow-cyan-200  flex  justify-center items-center w-auto h-10 p-2 gap-2">
            <p className="text-xl font-semibold">Product Data Changes</p>
            <div className=" flex items-center gap-2">
              <button onClick={() => toast.dismiss(t.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-red-400 border border-black rounded-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <button onClick={() => handleSubmited()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-green-600 border border-black rounded-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        ),
        {
          position: "bottom-center",
          duration: Infinity,
        }
      );
      alreadyShownToast.current = true;
    }
  }
  const handleSubmited = async () => {
    const data = {
      title: title || selectedItem?.title,
      price: price || selectedItem?.price,
      priceb2b: priceb2b,
      shipping: selectedItem?.shipping,
      category: selectedItem?.category,
      subCategory: selectedItem?.subCategory,
      image: selectedItem?.image,
      description: description || selectedItem?.description,
      spec: highLightPointList,
    };
    console.log(data);
    // await update(selectedItem?._id, data);
    // setSelectedItem(null);
    // setTitle(null);
    // setprice(null);
    // setPriceb2b(null);
    // setDescription(null);
  };
  return (
    <>
      <section>
        <div className="flex  justify-end">
          <div className="flex flex-col relative">
            <input
              className="border-2 lg:w-72 border-red-600 h-9 rounded-l-lg  focus:outline-none"
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
          <div>
            <div className="mx-5 ">
              {/* <!-- component --> */}
              <section className="text-gray-700 body-font overflow-hidden bg-white">
                <div Name="container px-5 py-24 mx-auto">
                  <div className="lg:w-4/5 mx-auto flex flex-wrap justify-center">
                    <img
                      alt={selectedItem?.title}
                      className="lg:w-72 md:w-64 lg:h-1/2 mt-16 w-full object-cover object-center  border-2 border-gray-400 rounded-3xl hover:rounded-lg transition-all duration-300 ease-linear"
                      src={selectedItem?.image}
                    />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                      <h2 className="text-sm title-font text-gray-500 tracking-widest">
                        {selectedItem?.category}
                      </h2>
                      <textarea
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-gray-900 text-3xl title-font font-medium mb-1 w-full h-28"
                        defaultValue={selectedItem?.title}
                      />

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

                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <input
                            type="number"
                            onChange={(e) => setprice(e.target.value)}
                            className="w-full font-medium text-2xl text-gray-900 mr-3 "
                            defaultValue={selectedItem?.price}
                          />
                          <input
                            type="number"
                            onChange={(e) => setPriceb2b(e.target.value)}
                            className="w-full font-medium text-2xl text-gray-900 mr-3 "
                            defaultValue={selectedItem?.priceb2b}
                          />
                        </div>
                      </div>
                      <div className="flex mt-6 items-center pb-5 border-t-2 border-gray-600 mb-5">
                        <textarea
                          onChange={(e) => setDescription(e.target.value)}
                          className="leading-relaxed w-full h-24"
                          defaultValue={selectedItem?.description}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default DetailsEdit;
