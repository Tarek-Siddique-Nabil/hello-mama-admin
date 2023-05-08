import React, { useContext } from "react";
import { CustomHookContext } from "../../../Hooks/useHooks";

const ExistingProduct = () => {
  const { b2b_products } = useContext(CustomHookContext);
  return (
    <div>
      {b2b_products?.map((item) => (
        <div>{item.title}</div>
      ))}
    </div>
  );
};

export default ExistingProduct;
