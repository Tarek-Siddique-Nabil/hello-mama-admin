import axios from "axios";
import React, { useContext, useState } from "react";
import { CustomHookContext } from "../../../Hooks/useHooks";

const Category_Input = () => {
  const { postCategory, categories, deleteCategory, deleteSubCategory } =
    useContext(CustomHookContext);
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const toggleExpansion = (index) => {
    if (expandedIndexes.includes(index)) {
      setExpandedIndexes(expandedIndexes.filter((i) => i !== index));
    } else {
      setExpandedIndexes([...expandedIndexes, index]);
    }
  };
  const tab = ["category", "sub-category"];
  const [tabToggle, setTabToggle] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  console.log(
    "🚀 ~ file: Category_Input.jsx:19 ~ selectedCategory:",
    selectedCategory
  );
  const [categoryImage, setCategoryImage] = useState(null);

  const handleCategoryImage = async (e) => {
    e.preventDefault();
    const { name, files } = e.target;
    if (name === "category_image" && files.length > 0) {
      const formData = new FormData();
      formData.append("image", files[0]);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_APP_SECRET_SERVER_SIDE}/upload`,
          formData
        );
        if (res?.data?.imageUrl) {
          return setCategoryImage(res?.data?.imageUrl);
        } else {
          const url = `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_APP_SECRET_IMG_API_KEY
          }`;
          const formData = new FormData();
          formData.append("image", files[0]);
          await axios.post(url, formData).then((result) => {
            setCategoryImage(result?.data?.data?.url);
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleForm = async (e) => {
    e.preventDefault();
    if (tabToggle === 0) {
      const data = {
        newCategory: e.target.category.value,
        image: categoryImage,
        newSubCategory: e.target.subCategory.value,
      };
      await postCategory(data);
      e.target.reset();
      setCategoryImage(null);
    } else {
      const data = {
        category: selectedCategory,
        newSubCategory: e.target.subCategory.value,
      };
      await postCategory(data);
      e.target.reset();
      setSelectedCategory(null);
    }
  };
  return (
    <>
      <div className="flex  gap-4 mt-3  h-screen">
        <div className="w-1/2 ">
          <p className="text-lg font-bold text-center">Existing Category</p>
          {categories?.map((item, index) => (
            <div
              key={index}
              className=" border border-black rounded-xl my-2 hover:cursor-pointer transition-all duration-300 delay-75 ease-in-out"
              onClick={() => toggleExpansion(item.value)}
            >
              <div className="collapse-title">
                <div className="flex justify-between">
                  <p>{item.value}</p>
                  <button
                    type="button"
                    onClick={async () => await deleteCategory(item._id)}
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
              </div>
              {item?.children?.map((childrenItem, index) => (
                <div
                  key={index}
                  className={
                    expandedIndexes.includes(item.value)
                      ? " flex justify-between px-12 my-3 transition-all duration-300 delay-75 ease-in-out"
                      : "collapse-content transition-all duration-300 delay-75 ease-in-out"
                  }
                >
                  <p>{childrenItem?.value}</p>
                  <button
                    type="button"
                    onClick={async () =>
                      deleteSubCategory(item?._id, childrenItem._id)
                    }
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
          ))}
        </div>

        <div className="w-1/2 border-2 border-gray-700">
          <p className="text-lg font-bold text-center py-1"> Category</p>
          <div className=" flex justify-center">
            <div className="tabs tabs-boxed">
              {tab.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setTabToggle(index)}
                  className={tabToggle === index ? "tab tab-active" : "tab"}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div>
            <form onSubmit={handleForm}>
              {tabToggle === 1 ? (
                <div className="flex flex-wrap justify-between items-center py-3 px-2">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">Category</span>

                    <select
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="select select-lg select-secondary w-full max-w-xs"
                    >
                      <option disabled selected>
                        Select Category
                      </option>
                      {categories?.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.value}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-lg font-bold">Sub-Category</span>
                    <input
                      type="text"
                      placeholder="ex: mobile"
                      className="input input-bordered"
                      name="subCategory"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap justify-between items-center py-3 px-2">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">Category</span>
                    <input
                      type="text"
                      placeholder="ex: tech"
                      className="input input-bordered"
                      name="category"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">Category Image</span>
                    <input
                      onChange={(e) => handleCategoryImage(e)}
                      type="file"
                      className="file-input file-input-bordered file-input-info w-full max-w-xs"
                      name="category_image"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">Sub-Category</span>
                    <input
                      type="text"
                      placeholder="ex: mobile"
                      className="input input-bordered"
                      name="subCategory"
                    />
                  </div>
                </div>
              )}
              <button
                type="submit"
                className="ml-auto flex mr-5 border p-3 rounded-xl text-white bg-violet-300 hover:bg-violet-600"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category_Input;
