import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemsList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  // Get cart items from Redux store
  const cartItems = useSelector((store) => store.cart.items);
  

  // Handle clearing the cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Calculate total price by checking for price first, then defaultPrice
  const totalPrice = cartItems.reduce((sum, item) => {
    const itemPrice =
      item?.card?.info?.price || item?.card?.info?.defaultPrice || 0;
    return sum + itemPrice / 100;
  }, 0);

  return (
    <div className="text-center m-4 p-4">
      <h1 className="font-bold"> Cart</h1>
      <div className="w-6/12 m-auto">
        {cartItems.length > 0 && (
          <>
            <button
              className="p-2 m-2 bg-black text-white rounded-lg"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>

            {/* Display total price */}
            <h2 className="font-bold m-4">
              Total Price: ₹{totalPrice.toFixed(2)}
            </h2>
          </>
        )}

        {/* Empty cart message */}
        {cartItems.length === 0 ? (
          <h1>
            Your cart is empty <br></br>
            Go to the home page to view more restaurants.
          </h1>
        ) : (
          <ItemList items={cartItems} />
        )}
      </div>
    </div>
  );
};

export default Cart;
