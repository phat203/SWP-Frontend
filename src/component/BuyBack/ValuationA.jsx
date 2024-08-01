import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateBuybackPrice } from "../State/Valuation/Action"; // Adjust the import path accordingly
import { getMenuItemByCode } from "../State/Menu/Action";

const ValuationA = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwt");

  const [productCode, setProductCode] = useState("");

  const handleCalculatePrice = async () => {
    // Fetch the jewelry item
    const response = await dispatch(
      getMenuItemByCode({ code: productCode, jwt: token })
    );
    console.log("respone", response);
    // Check if the fetch was successful
    const jewelryData = response.payload;

    dispatch(calculateBuybackPrice(jewelryData, token));
  };

  return (
    <div>
      <h2>Calculate Buyback Price</h2>
      <form>
        <label>
          Product Code:
          <input
            type="text"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleCalculatePrice}>
          Calculate Price
        </button>
      </form>
    </div>
  );
};

export default ValuationA;
