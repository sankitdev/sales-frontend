import React from "react";

const QuantityInput = ({ index, product, handleQuantityChange }) => {
  const handleChange = (e) => {
    // Convert input to number and clamp between min and max
    const value = Math.max(1, Math.min(50, Number(e.target.value)));

    // Only update if the value is a valid number
    if (!isNaN(value)) {
      handleQuantityChange(index, value);
    }
  };

  const handleBlur = (e) => {
    // If empty or invalid, set to minimum value
    if (e.target.value === "" || isNaN(Number(e.target.value))) {
      handleQuantityChange(index, 1);
    }
  };

  return (
    <input
      type="number"
      value={product.quantity}
      placeholder="Quantity"
      min={1}
      max={100}
      onChange={handleChange}
      onBlur={handleBlur}
      className="w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  );
};

export default QuantityInput;
