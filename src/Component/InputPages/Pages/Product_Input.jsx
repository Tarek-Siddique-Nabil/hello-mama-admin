import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CustomHookContext } from "../../../Hooks/useHooks";

const Product_Input = () => {
  const { post, categories } = useContext(CustomHookContext);
  const [existingCategory, setExistingCategory] = useState([]);

  const [existingSubCategory, setSubExistingCategory] = useState([]);
  useEffect(() => {
    setSubExistingCategory(existingCategory?.children);
  }, [existingCategory]);

  const [category, setCategory] = useState(null);

  const [subCategory, setSubCategory] = useState(null);

  const [base_image, setBaseImage] = useState(null);
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
        setBaseImage(res.data.imageUrl);
      } catch (error) {
        console.log(error);
      }
    }
  };

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

  const variableChange = async (e, index) => {
    e.preventDefault();
    const { name, value, files } = e.target;

    const list = [...variableList];
    if (name === "image" && files.length > 0) {
      const formData = new FormData();
      formData.append("image", files[0]);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_APP_SECRET_SERVER_SIDE}/upload`,
          formData
        );
        list[index][name] = res.data.imageUrl;
      } catch (error) {
        console.log(error);
      }
    } else {
      list[index][name] = value;
    }

    setVariableList(list);
  };

  const variableListRemove = (index) => {
    const list = [...variableList];
    setVariableList(list.splice(index, 1));
  };

  const variableListAdd = () => {
    setVariableList([...variableList, { price: "", variety: "", image: "" }]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const product = {
      title: e.target.title.value,
      price: e.target.price.value,
      priceb2b: e.target.b2b_price.value,
      shipping: e.target.shipping.value,
      description: e.target.description.value,
      category: category,
      subCategory: subCategory,
      image: base_image,
      spec: highLightPointList || [],
      productVariant: variableList || [],
      unit: e.target.unit.value,
    };

    await post(product);

    e.target.title.value = "";
    e.target.price.value = "";
    e.target.b2b_price.value = "";
    e.target.category.value = "";
    e.target.subcategory.value = "";
    e.target.shipping.value = "";
    e.target.description.value = "";
    e.target.base_image.value = "";
    e.target.unit.value = "";
    setExistingCategory([]);
    setSubExistingCategory([]);
    setCategory(null);
    setSubCategory(null);
    setBaseImage(null);
    setHighLightPointList([{ highLightPoint: "" }]);
    setVariableList([{ price: "", variety: "", image: null }]);
  };
  return (
    <>
      <form
        className=" grid grid-cols-1  items-center gap-5 "
        onSubmit={onSubmit}
      >
        <div className="form-control ">
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
              required
            />
          </label>
        </div>
        <div className="form-control ">
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
              required
            />
          </label>
        </div>
        <div className="form-control ">
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
              required
            />
          </label>
        </div>

        <p className="font-bold">
          Category:- <span className="text-sky-600">{category}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {categories?.map((item, index) => (
            <span key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                className="radio radio-error "
                name="category"
                onChange={() => [
                  setExistingCategory(item),
                  setCategory(item.value),
                ]}
              />
              <label className="dark:text-white">{item?.value}</label>
            </span>
          ))}
        </div>
        <p className="font-bold">
          Sub-Category:- <span className="text-sky-600">{subCategory}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {existingSubCategory?.map((item, index) => (
            <span key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                name="subcategory"
                className="radio radio-error"
                onChange={() => setSubCategory(item?.value)}
                required
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
              required
            />
          </label>
        </div>
        <p className="font-bold">Description:-</p>
        <textarea
          className="textarea textarea-accent"
          placeholder="Description"
          name="description"
          required
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

              {highLightPointList?.length !== 1 && (
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

              {highLightPointList?.length - 1 === index &&
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
          onChange={(e) => handleBaseImage(e)}
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
              {variableList?.length !== 1 && (
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

              {variableList?.length - 1 === index &&
                variableList?.length < 10 && (
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
        <button
          className="bg-sky-300 hover:bg-sky-500 border border-black rounded-xl "
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Product_Input;
