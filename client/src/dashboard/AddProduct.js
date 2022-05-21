import React from "react";
import { useAppContext } from "../context/appContext";
import { FormRow, Alert } from "../components/index";
import Wrapper from "../assets/wrappers/DashboardFormPage";
const AddProduct = () => {
  const {
    isEditing,
    showAlert,
    displayAlert,
    editProductId,
    pName,
    price,
    qty,
    handleChange,
    clearValues,
    createProduct,
    editProduct,
  } = useAppContext();
  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(pName, price, qty);
    if (!qty || !pName || !price) {
      displayAlert();
      return;
    }
    if (isEditing) {
      //edit function
      editProduct();
      return;
    }
    createProduct();
  };
  //handle inputs
  const handleProductInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Edit Product" : "Add Product"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            labelText="Product Name"
            name="pName"
            value={pName}
            handleChange={handleProductInput}
          />
          <FormRow
            type="text"
            labelText="Quantity"
            name="qty"
            value={qty}
            handleChange={handleProductInput}
          />
          <FormRow
            type="text"
            labelText="Price"
            name="price"
            value={price}
            handleChange={handleProductInput}
          />
          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddProduct;
