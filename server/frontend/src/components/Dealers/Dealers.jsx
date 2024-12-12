import React, { useState, useEffect } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png";

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  // Static dealer data
  const dealer_url = [
    {"_id":"675aa385b917ada853d6a0fb","id":1,"city":"El Paso","state":"Texas","address":"3 Nova Court","zip":"88563","lat":"31.6948","long":"-106.3","short_name":"Holdlamis","full_name":"Holdlamis Car Dealership"},
    {"_id":"675aa385b917ada853d6a0fc","id":2,"city":"Minneapolis","state":"Minnesota","address":"6337 Butternut Crossing","zip":"55402","lat":"44.9762","long":"-93.2759","short_name":"Temp","full_name":"Temp Car Dealership"},
    {"_id":"675aa385b917ada853d6a0fd","id":3,"city":"Birmingham","state":"Alabama","address":"9477 Twin Pines Center","zip":"35285","lat":"33.5446","long":"-86.9292","short_name":"Sub-Ex","full_name":"Sub-Ex Car Dealership"},
    {"_id":"675aa385b917ada853d6a0fe","id":4,"city":"Dallas","state":"Texas","address":"85800 Hazelcrest Circle","zip":"75241","lat":"32.6722","long":"-96.7774","short_name":"Solarbreeze","full_name":"Solarbreeze Car Dealership"},
    {"_id":"675aa385b917ada853d6a0ff","id":5,"city":"Baltimore","state":"Maryland","address":"93 Golf Course Pass","zip":"21203","lat":"39.2847","long":"-76.6205","short_name":"Regrant","full_name":"Regrant Car Dealership"},
  ];

  // Set the list of states dynamically from the dealer data
  useEffect(() => {
    const uniqueStates = [
      ...new Set(dealer_url.map(dealer => dealer.state))
    ];
    setStates(uniqueStates);
    setDealersList(dealer_url); // Initially set the full list of dealers
  }, []);

  // Filter dealers by state
  const filterDealers = (state) => {
    setSelectedState(state);
    if (state === "All" || state === "") {
      setDealersList(dealer_url); // Reset to all dealers
    } else {
      const filteredDealers = dealer_url.filter(dealer => dealer.state === state);
      setDealersList(filteredDealers); // Set filtered dealers
    }
  };

  // Check if the user is logged in (using sessionStorage)
  let isLoggedIn = sessionStorage.getItem("username") != null ? true : false;

  return (
    <div>
      <Header />
      
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Dealer Name</th>
            <th>City</th>
            <th>Address</th>
            <th>Zip</th>
            <th>
              <select 
                name="state" 
                id="state" 
                onChange={(e) => filterDealers(e.target.value)} 
                value={selectedState}
              >
                <option value="" selected disabled hidden>State</option>
                <option value="All">All States</option>
                {states.map(state => (
                  <option value={state} key={state}>{state}</option>
                ))}
              </select>
            </th>
            {isLoggedIn && (
              <th>Review Dealer</th>
            )}
          </tr>
        </thead>
        <tbody>
          {dealersList.map(dealer => (
            <tr key={dealer.id}>
              <td>{dealer['id']}</td>
              <td><a href={'/dealer/' + dealer['id']}>{dealer['full_name']}</a></td>
              <td>{dealer['city']}</td>
              <td>{dealer['address']}</td>
              <td>{dealer['zip']}</td>
              <td>{dealer['state']}</td>
              {isLoggedIn && (
                <td><a href={`/postreview/${dealer['id']}`}><img src={review_icon} className="review_icon" alt="Post Review" /></a></td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dealers;
