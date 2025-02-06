import React from "react";

const QuantityInput = ({ index, product, handleQuantityChange }) => {
  const handleChange = (e) => {
    const value = Math.max(1, Math.min(50, Number(e.target.value)));
    if (!isNaN(value)) {
      handleQuantityChange(index, value);
    }
  };

  const handleBlur = (e) => {
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
