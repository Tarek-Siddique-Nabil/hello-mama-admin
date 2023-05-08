import React, { useContext } from "react";
import { CustomHookContext } from "../../../Hooks/useHooks";

const Cupon_code = () => {
  const { cuponCode, createCupon, deleteCupon } = useContext(CustomHookContext);
  const handleForm = async (e) => {
    e.preventDefault();
    const data = {
      code: e.target.code.value,
      percentage: e.target.percentage.value,
    };
    await createCupon(data);
    e.target.code.value = "";
    e.target.percentage.value = "";
  };
  return (
    <>
      <section className="container flex flex-wrap justify-between items-center gap-5">
        <div className="w-[49%] min-h-screen border border-black rounded-xl px-5">
          <p className="text-lg font-semibold border-b-2 border-lime-600 text-center">
            Existing Cupon Code
          </p>
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Code</th>
                  <th>Percentage</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {cuponCode?.map((item, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item?.code}</td>
                    <td>{item?.percentage}</td>
                    <td>
                      <svg
                        onClick={() => deleteCupon(item?._id)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 hover:cursor-pointer hover:text-red-400 transition-colors ease-linear duration-150 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-[49%] min-h-screen border border-black rounded-xl px-5">
          <p className="text-lg font-semibold border-b-2 border-sky-600 text-center">
            Create Cupon Code
          </p>
          <form onSubmit={handleForm} className="flex flex-col gap-3 mt-3">
            <input
              name="code"
              type="text"
              placeholder="Code"
              className="input  input-primary input-bordered w-full max-w-xs"
              required
            />
            <input
              max={80}
              name="percentage"
              type="number"
              placeholder="Percentage"
              className="input  input-primary input-bordered w-full max-w-xs"
            />
            <button type="submit" className="btn btn-primary w-1/4 ">
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Cupon_code;
