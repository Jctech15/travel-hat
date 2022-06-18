// import css
import "./UserTravelInput.css";
import { useState } from "react";
import axios from "axios";

export default function UserTravelInput() {
  const [location, setLocation] = useState("");

  async function onChange(event) {
    setLocation(event.target.value);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const body = JSON.stringify({
      id: 5,
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
            <li>Paris</li>
            <li>USA</li>
          </ul>
        </section>
        <section className="locationDetails">
          <h3>API</h3>
        </section>
      </div>
    </div>
  );
}
