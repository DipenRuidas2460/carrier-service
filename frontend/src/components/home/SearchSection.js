import React from "react";
import InputItem from "./InputItem";
import TruckListOption from "./TruckListOption";

function SearchSection() {
  return (
    <div>
    <div className="search-section">
      <strong className="search-str">Get a transport</strong>
      <InputItem type="source"/>
      <InputItem type="destination"/>
      <button className="search-button">Search</button>
    </div>
    <TruckListOption/>
    </div>
  );
}

export default SearchSection;