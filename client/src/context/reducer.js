import { initialState } from "./appContext";
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
  GET_ALL_CART_BEGIN,
  GET_ALL_CART_SUCCESS,
  CLEAR_CART,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values.",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === REGISTER_UER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === REGISTER_UER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      showAlert: true,
      alertType: "success",
      alertText: "User created Redirecting ...",
    };
  }
  if (action.type === REGISTER_UER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  //login user
  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      showAlert: true,
      alertType: "success",
      alertText: "Login Successful Redirecting ...",
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  //toggle side bar
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  //logout
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated!",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editProductId: "",
      pName: "",
      price: "",
      qty: 0,
    };
    return { ...state, ...initialState };
  }
  if (action.type === CREATE_PRODUCT_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_PRODUCT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Product added!",
    };
  }
  if (action.type === CREATE_PRODUCT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  //get all products
  if (action.type === GET_ALL_PRODUCTS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === GET_ALL_PRODUCTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      products: action.payload.products,
      totalProducts: action.payload.totalProducts,
      numOfPages: action.payload.numOfPages,
    };
  }
  //set edit job
  if (action.type === SET_EDIT_PRODUCT) {
    const product = state.products.find(
      (product) => product._id === action.payload.id
    );
    const { name, qty, price, _id } = product;
    return {
      ...state,
      isLoading: true,
      isEditing: true,
      pName: name,
      qty,
      price,
      editProductId: _id,
    };
  }
  //edit product
  if (action.type === EDIT_PRODUCT_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_PRODUCT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Product Updated!",
    };
  }
  if (action.type === EDIT_PRODUCT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  //delete job
  if (action.type === DELETE_PRODUCT_BEGIN) {
    return { ...state, isLoading: true };
  }
  //add to cart
  if (action.type === ADD_TO_CART_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === ADD_TO_CART_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Item added to cart!",
    };
  }
  if (action.type === ADD_TO_CART_ERROR) {
    let err = action.payload.msg;
    console.log(err);
    if (action.payload.msg === "pid field has to be unique") {
      err = "Product is already in the cart";
    }
    if (action.payload.msg === "pid,createdBy field has to be unique") {
      err = "Product is already in the cart";
    }
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: err,
    };
  }
  //get all cart
  //get all products
  if (action.type === GET_ALL_CART_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === GET_ALL_CART_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      cart: action.payload.carts,
    };
  }
  //clear cart
  if (action.type === CLEAR_CART) {
    return { ...state, isLoading: true };
  }
  throw new Error(`no such action:${action.type}`);
};

export default reducer;
