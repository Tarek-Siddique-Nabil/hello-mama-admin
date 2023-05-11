import React, { useContext, useState } from "react";
import { CustomHookContext } from "../../../Hooks/useHooks";

const TableEdit = () => {
  const { products } = useContext(CustomHookContext);
  const [selectedItems, setSelectedItems] = useState([]);

  const [changeItems, setChangeItems] = useState([]);

  const handleChange = (itemId, e) => {
    const index = changeItems.findIndex((item) => item.id === itemId);

    if (index !== -1) {
      const updatedItem = { ...changeItems[index] };
      updatedItem[e.target.name] = e.target.value;

      setChangeItems([
        ...changeItems.slice(0, index),
        updatedItem,
        ...changeItems.slice(index + 1),
      ]);
    } else {
      setChangeItems([
        ...changeItems,
        {
          id: itemId,
          price: e.target.name === "price" ? e.target.value : "",
          priceB2B: e.target.name === "priceb2b" ? e.target.value : "",
        },
      ]);
    }
  };

  return (
    <>
      <div className="overflow-x-auto w-full ">
        <table className="text-left -z-50  w-full ">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>B2b Price</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((item, index) => (
              <tr key={index}>
                <th className="items-center p-4 whitespace-nowrap">
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      onClick={() =>
                        setSelectedItems(
                          changeItems.filter((i) => i._id === item._id)
                        )
                      }
                    />
                  </label>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.title.slice(0, 15)}</div>
                      {/* <div className="text-sm opacity-50">United States</div> */}
                    </div>
                  </div>
                </td>
                <td>
                  <span className="font-semibold">Category</span>:-
                  <span className="capitalize">{item.category}</span>
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    <span className="font-semibold">Sub-Category</span>:-
                    <span>{item.subCategory}</span>
                  </span>
                </td>
                <td>
                  <input
                    className="p-1 border border-cyan-700 rounded-xl"
                    inputMode="decimal"
                    type="number"
                    name="price"
                    placeholder={
                      changeItems.find(
                        (selectedItem) => selectedItem.id === item._id
                      )?.price || item.price
                    }
                    onChange={(e) => handleChange(item._id, e)}
                  />
                </td>
                <td>
                  {" "}
                  <input
                    className="p-1 border border-cyan-700 rounded-xl"
                    inputMode="decimal"
                    type="number"
                    name="priceb2b"
                    placeholder={
                      changeItems.find(
                        (selectedItem) => selectedItem.id === item._id
                      )?.priceb2b || item?.priceb2b
                    }
                    onChange={(e) => handleChange((item._id, e))}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </>
  );
};

export default TableEdit;
