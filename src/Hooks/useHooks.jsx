import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const CustomHookContext = createContext();

export const ContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  console.log(
    "🚀 ~ file: useHooks.jsx:10 ~ ContextProvider ~ categories:",
    categories
  );
  const [loading, setLoading] = useState(false);

  ///product

  // ----------------------------------------------------------product get----------------------------------------------------------

  useEffect(() => {
    const url = `${import.meta.env.VITE_APP_SECRET_SERVER_SIDE}/product`;
    setLoading(false);
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  //---------------------------------------------------- product post----------------------------------------------------------
  const post = async (body) => {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_APP_SECRET_SERVER_SIDE}/product`;
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = response.data;
      setLoading(false);
      if (json) {
        toast.success("Product added Successfully", {
          position: "top-center",
        });
      }
      setProducts([...products, json]);
    } catch (err) {
      toast.error(`Something error`, {
        position: "top-center",
      });
    }
  };
  //---------------------------------------------------- product Update----------------------------------------------------------

  const update = async (id, body) => {
    setLoading(true);
    try {
      const url = `${
        import.meta.env.VITE_APP_SECRET_SERVER_SIDE
      }/product/${id}`;
      const response = await axios.put(url, body, {
        headers: {
          "content-type": "application/json",
        },
      });
      const json = response.data;
      setLoading(false);
      if (json) {
        toast.success("Product Update Successfully", {
          position: "top-center",
        });
      }
      const index = products.findIndex((item) => item._id === id);
      const newProductsData = [...products];
      newProductsData[index] = json;
      setProducts(newProductsData);
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
      });
    }
  };

  //---------------------------------------------------- product Delete----------------------------------------------------------

  const deleteProduct = async (id) => {
    try {
      const url = `${
        import.meta.env.VITE_APP_SECRET_SERVER_SIDE
      }/product/${id}`;
      const response = await axios.delete(url);
      const data = response.data;

      if (data) {
        toast.success("product delete", {
          position: "top-center",
        });
        // Remove the deleted item from the existing data
        setProducts((data) => data.filter((item) => item._id !== id));
      } else {
        toast.error("Something error ", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Something error ", {
        position: "top-center",
      });
    }
  };

  ///-------------------------------------------Category--------------------------------//

  // ----------------------------------------------------------Category get----------------------------------------------------------

  useEffect(() => {
    const url = `${import.meta.env.VITE_APP_SECRET_SERVER_SIDE}/category`;
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data;
        setCategories(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  // ----------------------------------------------------------Create Category----------------------------------------------------------
  const postCategory = async (body) => {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_APP_SECRET_SERVER_SIDE}/category`;
      const response = await axios.post(url, body);
      const json = response.data;
      setLoading(false);

      if (body?.category && json) {
        setCategories(json);
        toast.success("Sub-Category Created Successfully", {
          position: "top-center",
        });
      } else if (body?.newCategory) {
        setCategories((prevCategories) => [...prevCategories, json]);
        toast.success("Category Created Successfully", {
          position: "top-center",
        });
      }
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
      });
    }
  };
  // ----------------------------------------------------------Delete Category----------------------------------------------------------
  const deleteCategory = async (id) => {
    const url = `${import.meta.env.VITE_APP_SECRET_SERVER_SIDE}/category/${id}`;
    try {
      const response = await axios.delete(url);
      if (response.data) {
        toast.success("Category deleted", {
          position: "top-center",
        });
      }
      setCategories((data) => data.filter((item) => item._id !== id));
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  // ----------------------------------------------------------Delete SubCategory----------------------------------------------------------
  const deleteSubCategory = async (idCategory, idSubCategory) => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_APP_SECRET_SERVER_SIDE
        }/sub-category/${idCategory}/${idSubCategory}`
      );
      const data = response.data;
      if (data) {
        toast.success("Subcategory deleted successfully", {
          position: "top-center",
        });
      }
      setCategories(data);
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
      });
    }
  };
  return (
    <CustomHookContext.Provider
      value={{
        products,
        categories,
        loading,
        post,
        update,
        deleteProduct,
        postCategory,
        deleteCategory,
        deleteSubCategory,
      }}
    >
      {children}
    </CustomHookContext.Provider>
  );
};

export default ContextProvider;
