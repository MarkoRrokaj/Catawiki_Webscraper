import React, { useEffect, useState } from 'react';

function App() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortedData, setSortedData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/auctions") // Adjust URL based on your server setup
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAuctions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching auction data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const handlePriceSort = () => {
    const sorted = [...auctions].sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^\d.-]/g, "")); // Extract numeric value (including dot for decimals)
      const priceB = parseFloat(b.price.replace(/[^\d.-]/g, ""));
      return priceA - priceB; // Sort numerically (ascending)
    });
    setSortedData(sorted);
  };

  const handleTimeSort = () => {
    const sorted = [...auctions].sort((a, b) => {
      const timeA = extractTimeValue(a.timer); // Get numeric time value
      const timeB = extractTimeValue(b.timer);
      return timeA - timeB; // Sort numerically (ascending)
    });
    setSortedData(sorted);
  };

  const extractTimeValue = (timeString) => {
    const timeUnits = timeString.toLowerCase().trim().split(' ');

    let value = parseInt(timeUnits[0], 10);
    if (isNaN(value)) return Infinity; // For unexpected formats

    if (timeUnits[1].includes('sec')) {
      return value;
    } else if (timeUnits[1].includes('min')) {
      return value * 60;
    } else if (timeUnits[1].includes('hour')) {
      return value * 60 * 60;
    } else if (timeUnits[1].includes('day')) {
      return value * 24 * 60 * 60;
    }
    return Infinity; // For unexpected formats
  };

  const openAuctionPage = (serialNumber) => {
    const auctionUrl = `https://www.catawiki.com/en/l/${serialNumber}`;
    window.open(auctionUrl, '_blank'); // Open in a new tab
  };

  const calculateFinalPrice = (priceString) => {
    const numericPrice = parseFloat(priceString.replace(/[^\d.-]/g, '')); // Extract numeric value
    const finalPrice = numericPrice * 1.09; // Calculate 109% of the original price
    return `€${finalPrice.toFixed(2)}`; // Format final price with euro sign and two decimal places
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Filter out auctions where timer is 'Closed for bidding'
  const dataToDisplay = sortedData
    ? sortedData.filter(auction => auction.timer.toLowerCase().trim() !== 'closed for bidding')
    : auctions.filter(auction => auction.timer.toLowerCase().trim() !== 'closed for bidding');

  return (
    <div>
      <div className="btns">
        <button className="price_btn" onClick={handlePriceSort}>
          Price
        </button>
        <button className="time_btn" onClick={handleTimeSort}>
          Time
        </button>
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Timer</th>
            <th>Serial</th>
            <th>Image</th>
            <th>Final Price</th>
          </tr>
        </thead>
        <tbody>
          {dataToDisplay.map((auction, index) => (
            <tr key={index}>
              <td className="auction-row" onClick={() => openAuctionPage(auction.serialNumber)}>
                {auction.title}
              </td>
              <td>{auction.price}</td>
              <td>{auction.timer}</td>
              <td>{auction.serialNumber}</td>
              <td>
                <img src={auction.imageUrl} alt={auction.title} />
              </td>
              <td>{calculateFinalPrice(auction.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
