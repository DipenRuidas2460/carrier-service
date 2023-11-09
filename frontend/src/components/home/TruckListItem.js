import { Image } from "@chakra-ui/react";
import React from "react";

function TruckListItem({ truck }) {
  return (
    <div >
      <div className="d-flex">
        <div>
          <Image src={truck.image} height={50} width={50} />
          <div>
            <h2 style={{ fontSize: "18px" }}>{truck.name}</h2>
          </div>
        </div>
        <h2 style={{ fontSize: "18px" }}>₹{truck.amount}</h2>
      </div>
    </div>
  );
}

export default TruckListItem;
