// import css
import "./UserTravelInput.css";
import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function UserTravelInput() {
  const [location, setLocation] = useState("");

  async function onChange(event) {
    setLocation(event.target.value);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const body = JSON.stringify({
      id: uuidv4(),
      name: location,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await axios.post(
      "http://localhost:3001/locations",
      body,
      config
    );
  }

  async function displayLocation(event) {
    const userLocation = await axios.get("http://localhost:3001/all/locations");
    console.log(userLocation.data);
    console.log(userLocation.data[0].name);
    console.log(userLocation.data[1].name);
  }

  displayLocation();

  return (
    <div className="UserTravelInput">
      <h1>Your Dream Travel Locations</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          type="text"
          name="location"
          id="location"
          placeholder="Type location"
          onChange={(event) => onChange(event)}
          autoComplete="off"
        />
        <button type="submit">Submit</button>
      </form>
      <div className="flex">
        <section className="userInput">
          <h3>Locations</h3>
          <ul>
            {userLocation.forEach((location) => (
              <li>location.name</li>
            ))}
            <span className="options">
              <button>x</button>
              <button>c</button>
            </span>
            <li>
              USA{" "}
              <span className="options">
                <button>x</button>
                <button>c</button>
              </span>
            </li>
          </ul>
        </section>
        <section className="locationDetails">
          <h3>API</h3>
        </section>
      </div>
    </div>
  );
}
