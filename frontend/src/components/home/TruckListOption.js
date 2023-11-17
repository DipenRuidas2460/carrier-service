import React, { useState } from "react";
import { TruckListData } from "../../utils/TruckListData";
import TruckListItem from "./TruckListItem";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";

function TruckListOption() {
  const [activeIndex, setActiveIndex] = useState();
  const [selectedTruck, setSelectedTruck] = useState([]);
  const host = `http://localhost:3010`;

  const { user } = ChatState();

  // payment integration:--

  const makePayment = async (item, index) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const stripe = await loadStripe(
      "pk_test_51OCMEoSCtwAeEksSqQisLcauI1B8zu7YdaXS3HvwC7W17ZRX3YJYrG0pqribgBvwYek6JmGG37uL8MsdwrNoW1RX00zEiMcKwc"
    );

    const response = await axios.post(
      `${host}/api/create-checkout-session`,
      { item },
      config
    );

    const result = stripe.redirectToCheckout({
      sessionId: response.data.id,
    });

    if (result.error) {
      console.log(result.error.message);
    }
  };

  return (
    <div className="truck-list-option">
      <h2>Recommeded</h2>
      {TruckListData.map((item, i) => (
        <div
          key={i}
          className={`cursor-pointer p-2 px-4 rounded-md  border-black ${
            activeIndex === i ? "border-2" : null
          }`}
          onClick={() => {
            setActiveIndex(i);
            setSelectedTruck({ item: item, index: i });
          }}
        >
          <TruckListItem truck={item} />
        </div>
      ))}

      {selectedTruck?.item?.name ? (
        <div className="truck-option">
          <p>Make Payment For</p>
          <button
            className="request-truck"
            onClick={() =>
              makePayment(selectedTruck?.item, selectedTruck?.index)
            }
          >
            Request {selectedTruck.item.name}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default TruckListOption;
