import { Image } from "@chakra-ui/react";
import React from "react";

function InputItem({ type }) {
  return (
    <div className="input-container">
      <Image
        src={type === "source" ? "/source.png" : "/destination.png"}
        width={15}
        height={15}
      />
      <input
        className="input-item"
        type="text"
        placeholder={type === "source" ? "Pickup Location" : "Dropoff Location"}
      />
    </div>
  );
}

export default InputItem;
