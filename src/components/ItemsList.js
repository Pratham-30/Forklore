import { useState } from "react";
import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  // State to manage popup visibility
  const [showPopup, setShowPopup] = useState(false);

  // Function to handle adding items and showing popup
  const handleAddItem = (item) => {
    dispatch(addItem(item));

    // Show popup
    setShowPopup(true);

    // Hide popup after 2 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <div>
      {/* Popup message */}
      {showPopup && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-2 rounded-lg shadow-lg">
          Item added to cart!
        </div>
      )}

      {items.map((item, index) => (
        <div
          key={`${item.card.info.id}-${index}`} // Using a composite key
          className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between"
        >
          <div className="w-9/12">
            <div className="py-2">
              <span>{item.card.info.name}</span>
              <span>
                - ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="text-xs">{item.card.info.description}</p>
          </div>
          <div className="w-3/12 p-4">
            <div className="absolute">
              <button
                className="p-2 mx-16 rounded-lg bg-black text-white shadow-lg cursor-pointer"
                onClick={() => handleAddItem(item)}
              >
                Add +
              </button>
            </div>
            <img src={CDN_URL + item.card.info.imageId} className="w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
