import React from "react";

function Stock({ stock, onStockClick }) {
  const { id, name, price, type } = stock;

  const handleStockClick = () => {
    onStockClick(id);
  };

  return (
    <div>
      <div className="card" onClick={handleStockClick}>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">Price: ${price}</p>
          <p className="card-text">Type: {type}</p>
        </div>
      </div>
    </div>
  );
}

export default Stock;
