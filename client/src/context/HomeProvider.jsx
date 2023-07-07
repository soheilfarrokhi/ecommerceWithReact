import { createContext, useContext, useState } from "react";
import { createdAxios } from "../createAxios/craatedAxios";
import { setProducts } from "../state/store";
import { useDispatch } from "react-redux";

const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  // get all products
  const getProducts = async (setItems = null) => {
    setLoading(true);
    try {
      const { data } = await createdAxios.get(`api/products?populate=image`);
      if (setItems) {
        setItems(data.data);
      } else {
        dispatch(setProducts(data.data));
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  const getProduct = async (id, setItem) => {
    setLoading(true);
    try {
      const { data } = await createdAxios.get(
        `api/products/${id}?populate=image`
      );
      setItem(data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <HomeContext.Provider value={{ getProducts, loading, getProduct }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  return useContext(HomeContext);
};
