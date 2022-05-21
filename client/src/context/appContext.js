import React, { useState, useReducer, useContext, useEffect } from "react";
import reducer from "./reducer";
import axios from "axios";

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_UER_BEGIN,
  REGISTER_UER_SUCCESS,
  REGISTER_UER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_PRODUCT_BEGIN,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  GET_ALL_PRODUCTS_BEGIN,
  GET_ALL_PRODUCTS_SUCCESS,
  SET_EDIT_PRODUCT,
  EDIT_PRODUCT_BEGIN,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
  DELETE_PRODUCT_BEGIN,
  ADD_TO_CART_BEGIN,
  ADD_TO_CART_ERROR,
  ADD_TO_CART_SUCCESS,
  GET_ALL_CART_SUCCESS,
  GET_ALL_CART_BEGIN,
  CLEAR_CART,
} from "./actions";
//set as default
const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

export const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  showSidebar: false,
  isEditing: false,
  editProductId: "",
  pName: "",
  price: "",
  qty: 0,
  products: [],
  totalProducts: 0,
  numOfPages: 1,
  page: 1,
  cart: [],
};

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const authFetch = axios.create({
    baseURL: "/api",
    headers: {
      Authorization: `Bearer ${state.token}`,
    },
  });
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  //display alert
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  //clear the alert
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 2000);
  };
  //Register user
  const registerUser = async (currentUser) => {
    // console.log(currentUser);
    dispatch({ type: REGISTER_UER_BEGIN });
    try {
      const response = await axios.post("/api/auth/register", currentUser);
      const { user, token } = response.data;
      // console.log({ user, token });
      dispatch({ type: REGISTER_UER_SUCCESS, payload: { user, token } });
      addUserToLocalStorage({ token, user });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: REGISTER_UER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    // clearAlert();
  };
  //ADD USER TO LOCAL STORAGE
  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };
  //REMOVE USER FROM LOCAL STORAGE
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  //login user
  const loginUser = async (currentUser) => {
    // console.log(currentUser);
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post("/api/auth/login", currentUser);
      const { user, token } = response.data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  //toggle side bar
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };
  //logout user
  const logoutUser = () => {
    dispatch({
      type: LOGOUT_USER,
    });
    removeUserFromLocalStorage();
  };
  //update user
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      const { user, token } = data;
      // console.log(data);
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };
  //handle change
  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };
  //clear values
  const clearValues = () => {
    dispatch({
      type: CLEAR_VALUES,
    });
  };
  //create product
  const createProduct = async () => {
    dispatch({
      type: CREATE_PRODUCT_BEGIN,
    });
    try {
      const { pName, price, qty } = state;
      await authFetch.post("/createProduct", {
        name: pName,
        price,
        qty,
      });
      dispatch({
        type: CREATE_PRODUCT_SUCCESS,
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_PRODUCT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  //get all Products
  const getAllProducts = async () => {
    let url = "";
    if (state.user.type === "Customer") {
      url = "/Customers/Products";
    } else {
      url = "/getProducts";
    }
    dispatch({ type: GET_ALL_PRODUCTS_BEGIN });
    try {
      const { data } = await authFetch.get(url);
      // console.log(data);
      const { products, numOfPages, totalProducts } = data;
      // console.log(products);
      dispatch({
        type: GET_ALL_PRODUCTS_SUCCESS,
        payload: {
          products,
          numOfPages,
          totalProducts,
        },
      });
      // console.log(state.products);
    } catch (error) {
      console.log(error);
      logoutUser();
    }
    clearAlert();
  };
  //delete job
  const deleteProduct = async (id) => {
    dispatch({ type: DELETE_PRODUCT_BEGIN });
    try {
      await authFetch.delete(`/deleteProducts/${id}`);
      getAllProducts();
    } catch (error) {
      logoutUser();
    }
  };
  //set edit job
  const setEditProduct = (id) => {
    // console.log(`set edit job:${id}`);
    dispatch({ type: SET_EDIT_PRODUCT, payload: { id } });
  };
  //edit job
  const editProduct = async () => {
    dispatch({ type: EDIT_PRODUCT_BEGIN });
    try {
      const { pName, qty, price } = state;
      await authFetch.patch(`/updateProducts/${state.editProductId}`, {
        name: pName,
        qty,
        price,
      });
      dispatch({
        type: EDIT_PRODUCT_SUCCESS,
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) {
        return;
      }
      dispatch({
        type: EDIT_PRODUCT_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };
  //const add to cart
  const addItemToCart = async ({ name, price, qty, _id }) => {
    dispatch({ type: ADD_TO_CART_BEGIN });
    try {
      const cartItem = {
        name,
        qty,
        price,
        pid: _id,
        createdBy: state.user._id,
      };
      const response = await authFetch.post("/Customers/cart", cartItem);
      // console.log(response.data);
      dispatch({ type: ADD_TO_CART_SUCCESS });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: ADD_TO_CART_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };
  //get cart
  const getCart = async () => {
    let uri = "Customers/cart";
    dispatch({ type: GET_ALL_CART_BEGIN });
    try {
      const { data } = await authFetch.get(uri);

      const { carts } = data;
      console.log(carts);
      dispatch({
        type: GET_ALL_CART_SUCCESS,
        payload: {
          carts,
        },
      });
      // console.log(state.products);
    } catch (error) {
      console.log(error);
      logoutUser();
    }
    clearAlert();
  };
  //clear cart
  const clearCart = async () => {
    dispatch({ type: CLEAR_CART });
    try {
      console.log("clear cart");
      const response = await authFetch.delete("Customers/cart");
      getCart();
    } catch (error) {
      console.log(error);
      logoutUser();
    }
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createProduct,
        getAllProducts,
        setEditProduct,
        deleteProduct,
        editProduct,
        addItemToCart,
        getCart,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };

console.log();
