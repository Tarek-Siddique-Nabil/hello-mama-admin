import React, { useContext, useEffect, useState } from "react";
import { CustomHookContext } from "../../../src/Hooks/useHooks";
import axios from "axios";

const InputPage = () => {
  const { post, postCategory, categories, deleteCategory, deleteSubCategory } =
    useContext(CustomHookContext);

  const [existingCategory, setExistingCategory] = useState([]);

  const [existingSubCategory, setSubExistingCategory] = useState([]);
  useEffect(() => {
    setSubExistingCategory(existingCategory?.children);
  }, [existingCategory]);

  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);

  const [highLightPointList, setHighLightPointList] = useState([
    { highLightPoint: "" },
  ]);

  const highLightPointChange = (e, index) => {
    e.preventDefault();
    const { name, value } = e.target;
    const list = [...highLightPointList];
    list[index][name] = value;
    setHighLightPointList(list);
  };

  const highLightPointRemove = (index) => {
    const list = [...highLightPointList];
    list.splice(index, 1);
    setHighLightPointList(list);
  };

  const highLightPointAdd = () => {
    setHighLightPointList([...highLightPointList, { highLightPoint: "" }]);
  };
  const [variableList, setVariableList] = useState([
    { price: "", variety: "", image: null },
  ]);
  console.log(variableList);

  const variableChange = async (e, index) => {
    e.preventDefault();
    const { name, value, files } = e.target;
    console.log("🚀 ~ file: InputPage.jsx:48 ~ variableChange ~ files:", files);
    const list = [...variableList];
    if (name === "image" && files.length > 0) {
      const formData = new FormData();
      formData.append("image", files[0]);
      try {
        const res = await axios.post("http://localhost:5000/upload", formData);
        list[index][name] = res.data.imageUrl;
      } catch (error) {
        console.log(error);
      }
    } else {
      list[index][name] = value;
    }

    setVariableList(list);
  };

  // const variableChange = async (e, index) => {
  //   e.preventDefault();
  //   const { name, value, files } = e.target;
  //   const list = [...variableList];

  //   // Check if the user has uploaded a file
  //   if (files && files[0]) {
  //     const file = files[0];

  //     // Create a FormData object to send to imgbb
  //     const formData = new FormData();
  //     formData.append("image", file);
  //     formData.append("key", "b7d2ce33938a7fea6c2fd409cf1e66ff"); // Replace with your own imgbb API key

  //     // Upload the image to imgbb using their API
  //     const response = await fetch("https://api.imgbb.com/1/upload", {
  //       method: "POST",
  //       body: formData,
  //     });
  //     const result = await response.json();

  //     // Set the image URL in the variableList state
  //     list[index]["image"] = result.data.url;
  //   } else {
  //     // Set the other form values in the variableList state
  //     list[index][name] = value;
  //   }

  //   setVariableList(list);
  // };

  const variableListRemove = (index) => {
    console.log(
      "🚀 ~ file: InputPage.jsx:53 ~ variableListRemove ~ index:",
      index
    );
    const list = [...variableList];
    setVariableList(list.splice(index, 1));
  };

  const variableListAdd = () => {
    setVariableList([...variableList, { price: "", variety: "", image: "" }]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { files } = e.target;
    console.log(e.target.base_image.value);
    console.log("🚀 ~ file: InputPage.jsx:115 ~ onSubmit ~ files:", files);
    const formData = new FormData();
    formData.append("base_image", files[0]);
    try {
      const res = await axios.post(
        "https://api.imgbb.com/1/upload?key=b7d2ce33938a7fea6c2fd409cf1e66ff",
        formData
      );
      if (res.data) {
        const product = {
          title: e.target.title.value,
          price: e.target.price.value,
          priceb2b: e.target.b2b_price.value,
          shipping: e.target.shipping.value,
          description: e.target.description.value,
          category: e.target.category.value,
          subCategory: e.target.subCategory.value,
          image: res?.data?.data.url,
          spec: highLightPointList || [],
        };
        console.log(
          "🚀 ~ file: InputPage.jsx:134 ~ onSubmit ~ product:",
          product
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <form className="flex flex-col w-60 gap-5 " onSubmit={onSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Enter Title</span>
          </label>
          <label className="input-group">
            <span>Title</span>
            <input
              type="text"
              placeholder="Title"
              name="title"
              className="input input-bordered"
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Enter Price</span>
          </label>
          <label className="input-group">
            <span>Price</span>
            <input
              inputMode="numeric"
              min="1"
              type="number"
              placeholder="Price"
              name="price"
              className="input input-bordered"
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Enter B2B Price</span>
          </label>
          <label className="input-group">
            <span>B2B </span>
            <input
              inputMode="numeric"
              min="1"
              type="number"
              placeholder="B2B Price"
              name="b2b_price"
              className="input input-bordered"
            />
          </label>
        </div>

        <p className="font-bold">Category:-</p>
        <div className="flex flex-wrap gap-2">
          {categories?.map((item, index) => (
            <span key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                name="radio-8"
                className="radio radio-error"
                onChange={() => [
                  setExistingCategory(item),
                  setCategory(item.value),
                ]}
              />
              <label className="dark:text-white">{item?.value}</label>
            </span>
          ))}
        </div>
        <p className="font-bold">Sub-Category:-</p>
        <div className="flex flex-wrap gap-2">
          {existingSubCategory?.map((item, index) => (
            <span key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                name="radio-8"
                className="radio radio-error"
                onChange={() => setSubCategory(item?.value)}
              />
              <label className="dark:text-white">{item?.value}</label>
            </span>
          ))}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Enter Shipping Price</span>
          </label>
          <label className="input-group">
            <span>Shipping</span>
            <input
              inputMode="numeric"
              min="1"
              type="number"
              placeholder="Shipping"
              name="shipping"
              className="input input-bordered"
            />
          </label>
        </div>
        <p className="font-bold">Description:-</p>
        <textarea
          className="textarea textarea-accent"
          placeholder="Description"
          name="description"
        ></textarea>
        <p className="font-bold">HighLight Points:-</p>
        {highLightPointList?.map((item, index) => (
          <div key={index} className=" highLightPoints">
            <div className="flex gap-x-2 first-division">
              <input
                name="highLightPoint"
                type="text"
                id="highLightPoint"
                className="outline-1 border-2 rounded-lg border-gray-800 dark:border-blue-500  focus:outline-cyan-300 h-10 px-2"
                value={item.highLightPoint}
                onChange={(e) => highLightPointChange(e, index)}
                required
              />

              {highLightPointList.length !== 1 && (
                <button
                  type="button"
                  onClick={() => highLightPointRemove(index)}
                  className="remove-btn"
                >
                  <span className="text-red-500">
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
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                </button>
              )}

              {highLightPointList.length - 1 === index &&
                highLightPointList.length < 10 && (
                  <button
                    type="button"
                    onClick={highLightPointAdd}
                    className="add-btn"
                  >
                    <span className="text-cyan-400">
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
                          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  </button>
                )}
            </div>
          </div>
        ))}
        <input
          type="file"
          className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
          name="base_image"
        />

        {variableList?.map((item, index) => (
          <div key={index} className=" highLightPoints">
            <div className="flex gap-x-2 first-division">
              <form
                onChange={(e) => variableChange(e, index)}
                className="flex gap-2"
              >
                <input
                  name="price"
                  type="number"
                  inputMode="numeric"
                  placeholder={`Price ${index + 1}`}
                  min="1"
                  className="outline-1 border-2 rounded-lg border-gray-800 dark:border-blue-500  focus:outline-red-600 h-10 px-2"
                />
                <input
                  name="variety"
                  type="text"
                  placeholder={`Variety ${index + 1}`}
                  className="outline-1 border-2 rounded-lg border-gray-800 dark:border-blue-500  focus:outline-red-600 h-10 px-2"
                />
                <input
                  name="image"
                  type="file"
                  className="outline-1 border-2 rounded-lg border-gray-800 dark:border-blue-500  focus:outline-red-600 h-10 px-2"
                />
              </form>
              {/* <input
                name="variableList"
                type="text"
                id="variableList"
                placeholder="variable"
                className="outline-1 border-2 rounded-lg border-gray-800 dark:border-blue-500  focus:outline-cyan-300 h-10 px-2"
                value={item.variableList}
                onChange={(e) => variableChange(e, index)}
                required
              /> */}

              {variableList.length !== 1 && (
                <button
                  type="button"
                  onClick={() => variableListRemove(index)}
                  className="remove-btn"
                >
                  <span className="text-red-500">
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
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                </button>
              )}

              {variableList.length - 1 === index &&
                variableList.length < 10 && (
                  <button
                    type="button"
                    onClick={variableListAdd}
                    className="add-btn"
                  >
                    <span className="text-cyan-400">
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
                          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  </button>
                )}
            </div>
          </div>
        ))}
        <input
          className="outline-1 border-2 rounded-lg border-gray-800 dark:border-blue-500  focus:outline-red-600 h-10 px-2"
          placeholder="Unit"
          name="unit"
        />
        <button className="border border-black rounded-xl " type="submit">
          Submit
        </button>
      </form>
      <div>
        <div className="collapse">
          <input type="checkbox" className="peer" />
          <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
            Click me to show/hide content
          </div>
          <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
            <p>hello</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPage;
