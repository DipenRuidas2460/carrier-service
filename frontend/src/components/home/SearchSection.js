import React from "react";
import InputItem from "./InputItem";

function SearchSection() {
  return (
    <div className="search-section">
      <strong className="search-str">Get a transport</strong>
      <InputItem type="source"/>
      <InputItem type="destination"/>
      <button className="search-button">Search</button>
    </div>
  );
}

export default SearchSection;