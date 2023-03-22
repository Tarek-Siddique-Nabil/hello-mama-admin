import React, { useState } from "react";
import ProductView from "./Products_pages/ProductView";

const Products = () => {
  const [Selected, setSelected] = useState("List");
  return (
    <div>
      <div className="tabs flex justify-center">
        <button
          onClick={() => setSelected("List")}
          className="tab tab-lg tab-lifted dark:text-slate-50"
        >
          List
        </button>
        <button
          onClick={() => setSelected("Category")}
          className="tab tab-lg tab-lifted bg-blue-800 dark:text-slate-50"
        >
          Category
        </button>
        <button
          onClick={() => setSelected("Edit")}
          className="tab tab-lg tab-lifted dark:text-slate-50"
        >
          Edit
        </button>
      </div>
      <div>
        <ProductView/>
      </div>
    </div>
  );
};

export default Products;
