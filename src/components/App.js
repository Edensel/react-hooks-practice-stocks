import React, { useState, useEffect } from "react";
import Header from "./Header";
import MainContainer from "./MainContainer";

function App() {
  const [stocks, setStocks] = useState([]);
  const [portfolioStocks, setPortfolioStocks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((response) => response.json())
      .then((data) => setStocks(data))
      .catch((error) => console.error("Error fetching stocks: ", error));
  }, []);

  const handleBuyStock = (id) => {
    const selectedStock = stocks.find((stock) => stock.id === id);
    setPortfolioStocks([...portfolioStocks, selectedStock]);
  };

  const handleSellStock = (id) => {
    const updatedPortfolio = portfolioStocks.filter((stock) => stock.id !== id);
    setPortfolioStocks(updatedPortfolio);
  };

  const handleSortChange = (sortBy) => {
    let sortedStocks = [...stocks];
    if (sortBy === "Alphabetically") {
      sortedStocks.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "Price") {
      sortedStocks.sort((a, b) => a.price - b.price);
    }
    setStocks(sortedStocks);
  };

  const handleFilterChange = (filterBy) => {
    if (filterBy === "All") {
      fetch("http://localhost:3001/stocks")
        .then((response) => response.json())
        .then((data) => setStocks(data))
        .catch((error) => console.error("Error fetching stocks: ", error));
    } else {
      fetch(`http://localhost:3001/stocks?type=${filterBy}`)
        .then((response) => response.json())
        .then((data) => setStocks(data))
        .catch((error) => console.error("Error fetching filtered stocks: ", error));
    }
  };

  return (
    <div>
      <Header />
      <MainContainer
        stocks={stocks}
        portfolioStocks={portfolioStocks}
        onBuyStock={handleBuyStock}
        onSellStock={handleSellStock}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}

export default App;
