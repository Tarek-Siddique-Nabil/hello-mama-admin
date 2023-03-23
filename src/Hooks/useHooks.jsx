import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CustomHookContext = createContext();

export const ContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  ///product

  // ----------------------------------------------------------product get----------------------------------------------------------

  useEffect(() => {
    const url = `${import.meta.env.VITE_APP_SECRET_SERVER_SIDE}/product`;
    setLoading(false);
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
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
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const json = await response.json();
      setLoading(false);
      if (json) {
        toast.success("Product added Successfully", {
          position: "top-center",
          autoClose: 1000,
        });
      }
      setProducts([...products, json]);
    } catch (err) {
      toast.error(`Something error`, {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };
  //---------------------------------------------------- product Update----------------------------------------------------------

  const update = async (id, body) => {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_APP_SECRET_SERVER_SIDE}/product/${id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const json = await response.json();
      setLoading(false);
      if (json) {
        toast.success("Product Update Successfully", {
          position: "top-center",
          autoClose: 1200,
        });
      }
      const index = products.findIndex((item) => item._id === id);
      const newProductsData = [...products];
      newProductsData[index] = json;
      setProducts(newProductsData);
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
        autoClose: 1200,
      });
    }
  };

  //---------------------------------------------------- product Delete----------------------------------------------------------

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_SECRET_SERVER_SIDE}/product/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();

      if (data) {
        toast.success("product delete", {
          position: "top-center",
          autoClose: 1000,
        });
        // Remove the deleted item from the existing data
        setProducts((data) => data.filter((item) => item._id !== id));
      } else {
        toast.error("Something error ", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("Something error ", {
        position: "top-center",
        autoClose: 1000,
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
        const response = await fetch(url);
        const data = await response.json();
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
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const json = await response.json();
      setLoading(false);
      if (json) {
        toast.success("Category added Successfully", {
          position: "top-center",
          autoClose: 1000,
        });
      }
      setCategories([...categories, json]);
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };
  // ----------------------------------------------------------Delete Category----------------------------------------------------------
  const deleteCategory = async (id) => {
    const url = `${import.meta.env.VITE_APP_SECRET_SERVER_SIDE}/category/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data) {
        toast.success("Category delete", {
          position: "top-center",
          autoClose: 1000,
        });
      }
      setCategories((data) => data.filter((item) => item._id !== id));
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
        autoClose: 1200,
      });
    }
  };
  // ----------------------------------------------------------Delete SubCategory----------------------------------------------------------
  const deleteSubCategory = async (idCategory, idSubCategory) => {
    const url = `${import.meta.env.VITE_APP_SECRET_SERVER_SIDE}/sub-category/${idCategory}/${idSubCategory}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data) {
        toast.success("Category delete", {
          position: "top-center",
          autoClose: 1000,
        });
      }
      setCategories(data);
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
        autoClose: 1200,
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
