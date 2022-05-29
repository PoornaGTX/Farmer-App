import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Alert from "../components/Alert";
import StripeCheckOut from "react-stripe-checkout";
import Wrapper from "../assets/wrappers/DashboardFormPage";

const Cart = () => {
  const { showAlert, getCart, cart, clearCart } = useAppContext();
  const [Total, setTotal] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [items, setItems] = useState([]);

  const [product, setProduct] = useState({
    name: "Buy From Farmer App.",
    items: [],
  });
  const array = cart.map((item) => {
    return { ...item, quantity: 0 };
  });

  useEffect(() => {
    getCart();
    setItems(array);
    console.log(items);
  }, []);

  const cartHandle = (e, item) => {
    const { name, price, qty, _id, quantity, createdBy, pid } = item;
    console.log(item);
    const newItems = items.filter((item) => {
      if (item._id != _id) {
        return item;
      }
    });

    if (qty >= e.target.value) {
      const newItem = {
        name,
        price,
        quantity: e.target.value,
        _id,
        qty,
        pid,
      };
      let n = [...newItems, newItem];
      setItems(n);
      setProduct({ ...product, items: n });
    } else {
      const newItem = {
        name,
        price,
        quantity: 0,
        _id,
        qty,
        pid,
      };
      let n = [...newItems, newItem];
      alert(
        `Entered Quantity of ${name} ${e.target.value} is larger than available Quantity ${qty}. `
      );
      setItems(n);
      setProduct({ ...product, items: n });
    }
  };
  const HandleTotal = () => {
    const value = items.reduce((sum, currentItem) => {
      return sum + currentItem.quantity * currentItem.price;
    }, 0);
    setTotal(value);
    setIsPaid(!isPaid);
  };

  const makePayment = async (token) => {
    const body = {
      token,
      product,
      Total,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.post("/api/payment", body);
      console.log("payment success");
      items.map(async (item) => {
        const UpdateResponse = await axios.patch("api/updateQty", {
          pid: item.pid,
          uPqty: item.quantity,
        });
      });
      setTimeout(() => {
        clearCart();
      }, 3000);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <style>
        {`table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
`}
      </style>
      {showAlert && <Alert />}
      <form>
        <h3>My Cart</h3>
        <table>
          <thead>
            <tr>
              <th>Item:</th>
              <th>Price:</th>
              <th>Available Quantity:</th>
              <th>Quantity:</th>
            </tr>
          </thead>
          <tbody>
            {cart
              .sort((a, b) => (a.price > b.price ? 1 : -1))
              .map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.qty}</td>
                    <input
                      type="text"
                      className="form-input"
                      value={item.quantity}
                      onChange={(e) => cartHandle(e, item)}
                    />
                  </tr>
                );
              })}
          </tbody>
        </table>
        <br />
        <button
          type="button"
          onClick={HandleTotal}
          className="btn btn-container"
        >
          purchase
        </button>
      </form>
      <br />
      {isPaid
        ? `
          Your
          Total Bill: ${Total}.00$
          `
        : ``}
      <br />
      <br />
      {isPaid && (
        <StripeCheckOut
          stripeKey="pk_test_51Kys8xAcq45WQRykPV7TCFsXqaJIFGiV8fFuEHFbD8wGLpr0HCRraY5tuAfvSBrhCP5rxwht4lU2hC4iK7gh23Xg00ZBfsJDMu"
          token={makePayment}
          name="Buy Farmer App"
          amount={Total * 100}
          billingAddress
          shippingAddress
        ></StripeCheckOut>
      )}
    </Wrapper>
  );
};

export default Cart;
