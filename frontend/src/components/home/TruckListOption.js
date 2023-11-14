import React, { useState } from "react";
import { TruckListData } from "../../utils/TruckListData";
import TruckListItem from "./TruckListItem";

function TruckListOption() {
  const [activeIndex, setActiveIndex] = useState();
  const [selectedTruck, setSelectedTruck] = useState([]);
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
            setSelectedTruck(item);
          }}
        >
          <TruckListItem truck={item} />
        </div>
      ))}

      {selectedTruck?.name ? (
        <div className="truck-option">
          <p>Make Payment For</p>
          <button className="request-truck">Request {selectedTruck.name}</button>
        </div>
      ) : null}
    </div>
  );
}

export default TruckListOption;
