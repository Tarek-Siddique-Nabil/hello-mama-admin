import React, { useContext, useState } from "react";
import { CustomHookContext } from "../../../Hooks/useHooks";
import { toast } from "react-hot-toast";

const TableEdit = () => {
  const { products, updateMultiple } = useContext(CustomHookContext);
  const [selectedItems, setSelectedItems] = useState([]);

  console.log(
    "🚀 ~ file: TableEdit.jsx:7 ~ TableEdit ~ selectedItems:",
    selectedItems
  );

  const [changedItems, setChangedItems] = useState([]);
  console.log(
    "🚀 ~ file: TableEdit.jsx:15 ~ TableEdit ~ changedItems:",
    changedItems
  );

  const handleUpdate = async () => {
    await updateMultiple(selectedItems);
  };

  const handleSubmit = (e, i, index) => {
    e.preventDefault();

    const formData = {
      _id: i?._id,
      title: i?.title,
      price: e.target.price.value || i?.price,
      priceb2b: e.target.priceb2b.value || i?.priceb2b,
      category: i?.category,
      subCategory: i?.subCategory,
      shipping: i?.shipping,
      description: i?.description,
      image: i?.image,
      spec: i?.spec,
      productVariant: i?.productVariant,
      unit: i?.unit,
      postFrom: i?.postFrom,
    };

    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((item) => item !== index));
      setChangedItems(changedItems.filter((item) => item._id !== formData._id));
    } else {
      setSelectedItems([...selectedItems, index]);
      setChangedItems([...changedItems, formData]);
    }
  };

  return (
    <>
      <div>
        <button onClick={() => handleUpdate()}>update</button>
      </div>
      <div className="overflow-x-auto w-full">
        <div className="grid grid-cols-5 justify-center ">
          <button className="px-2 py-1 rounded-xl border border-black shadow-xl shadow-gray-400 hover:shadow-cyan-500 transition-all duration-150 ease-in-out "></button>
          <button className="px-2 py-1 rounded-xl border border-black shadow-xl shadow-gray-400 hover:shadow-cyan-500 transition-all duration-150 ease-in-out ">
            Title
          </button>{" "}
          <button className="px-2 py-1 rounded-xl border border-black shadow-xl shadow-gray-400 hover:shadow-cyan-500 transition-all duration-150 ease-in-out ">
            Category
          </button>{" "}
          <button className="px-2 py-1 rounded-xl border border-black shadow-xl shadow-gray-400 hover:shadow-cyan-500 transition-all duration-150 ease-in-out ">
            Price
          </button>{" "}
          <button className="px-2 py-1 rounded-xl border border-black shadow-xl shadow-gray-400 hover:shadow-cyan-500 transition-all duration-150 ease-in-out ">
            B2B Price
          </button>
        </div>
        <>
          {products.map((item, index) => (
            <form
              key={index}
              className="grid grid-cols-5 justify-center items-center border border-black rounded-xl my-3"
              onSubmit={(e) => handleSubmit(e, item, index)}
            >
              <div className="flex justify-center ">
                <label>
                  <button
                    type="submit"
                    className={
                      selectedItems.includes(index) ? "btn btn-success" : "btn"
                    }
                  >
                    {selectedItems.includes(index) ? "Selected" : "Select"}
                  </button>
                </label>
              </div>
              <div className="flex flex-col  items-center">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <p>
                    <span className="text-lg font-semibold">Title:</span>
                    <span>{item?.title.slice(0, 30)}</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div>
                  <p>
                    <span className="font-semibold">Category:-</span>
                    <span className="text-md text-red-600 ">
                      {item?.category}
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-semibold">Sub-Category:-</span>
                    <span className="text-md text-teal-600">
                      {item?.subCategory}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <p>
                  <span className="font-semibold">Price:-</span>
                  <span className="text-sm">{item?.price}</span>
                </p>
                <input
                  name="price"
                  disabled={selectedItems.includes(index)}
                  className={
                    selectedItems.includes(index)
                      ? "rounded-lg w-full h-8 placeholder:text-violet-500 outline-none border-2 border-red-600 blur-[2px] focus:border-sky-600 px-2 transition-all duration-100 ease-in-out"
                      : "rounded-lg w-full h-8 placeholder:text-violet-500 outline-none border-2 border-black focus:border-sky-600 px-2 transition-all duration-100 ease-in-out"
                  }
                />
              </div>
              <div>
                <p>
                  <span className="font-semibold">B2B Price:-</span>
                  <span className="text-sm">{item?.priceb2b}</span>
                </p>
                <input
                  name="priceb2b"
                  disabled={selectedItems.includes(index)}
                  className={
                    selectedItems.includes(index)
                      ? "rounded-lg w-full h-8 placeholder:text-violet-500 outline-none border-2 border-red-600 blur-[2px] focus:border-sky-600 px-2 transition-all duration-100 ease-in-out"
                      : "rounded-lg w-full h-8 placeholder:text-violet-500 outline-none border-2 border-black focus:border-sky-600 px-2 transition-all duration-100 ease-in-out"
                  }
                />
              </div>
            </form>
          ))}
        </>
      </div>
    </>
  );
};

export default TableEdit;
