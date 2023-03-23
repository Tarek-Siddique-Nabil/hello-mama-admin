import React, { useState } from "react";
import InputPage from "./Products_pages/InputPage";
import ProductEditPage from "./Products_pages/ProductEditPage";
import ProductView from "./Products_pages/ProductView";

const Products = () => {
  const [selected, setSelected] = useState("List");
  console.log( selected)
  let view;
  if (selected === "Edit") {
    view = <ProductEditPage />;
  } else if (selected === "Input") {
    view = <InputPage />;
  } else {
    view = <ProductView />;
  }
  return (
    <div>
      <div className="tabs flex justify-center">
        <button
          onClick={() => setSelected("List")}
          className={selected === "List" ? "tab tab-lg tab-lifted dark:bg-blue-800 bg-cyan-500 dark:text-slate-50" : "tab tab-lg tab-lifted dark:text-slate-50"}
        >
          List
        </button>
        <button
          onClick={() => setSelected("Input")}
          className={selected === "Input" ? "tab tab-lg tab-lifted dark:bg-blue-800 bg-cyan-500 dark:text-slate-50" : "tab tab-lg tab-lifted dark:text-slate-50"}
        >
          Category
        </button>
        <button
          onClick={() => setSelected("Edit")}
          className={selected === "Edit" ? "tab tab-lg tab-lifted dark:bg-blue-800 bg-cyan-500 dark:text-slate-50" : "tab tab-lg tab-lifted dark:text-slate-50"}
        >
          Edit
        </button>
      </div>
      <div>{view}</div>
    </div>
  );
};

export default Products;
