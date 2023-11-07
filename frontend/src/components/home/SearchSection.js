import React from "react";
import InputItem from "./InputItem";

function SearchSection() {
  return (
    <div className="search-section">
      <strong className="search-str">Get a transport</strong>
      <InputItem/>
      <InputItem/>
    </div>
  );
}

export default SearchSection;
