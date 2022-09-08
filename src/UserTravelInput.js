// import css
import "./UserTravelInput.css";
import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

export default function UserTravelInput() {
  const [location, setLocation] = useState("");
  const [allLocations, setAllLocations] = useState([]);

  useEffect(() => {
    displayLocation();
  }, [allLocations]);

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
    if (result.status === 200) {
      setAllLocations([...allLocations, location]);
    }
  }

  async function displayLocation(event) {
    const userLocation = await axios.get("http://localhost:3001/all/locations");
    setAllLocations(userLocation.data);
  }

  async function deleteLocation(event) {
    const locationId = event.target.value;
    const deleteRequest = await axios.delete(
      `http://localhost:3001/locations/${locationId}`
    );

    if (deleteRequest.status === 200) {
      setAllLocations([
        allLocations.filter((location) => location.Id !== locationId),
      ]);
    }
  }
  return (
    <div className="UserTravelInput">
      <header>
        <h1>Travel Hat</h1>
      </header>
      <main>
        <h2>Your Dream Travel Locations</h2>
        <h3>Instructions</h3>
        <div className="instructions">
          <ol>
            <li>Type the name of the country you want to visit</li>
            <li>
              Click the "shake" button to receive a randomly selected country
            </li>
            <li>Go Book your flight!</li>
          </ol>
          <p>*You can always delete using the "x" button*</p>
        </div>

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
      </main>

      <section className="userInput">
        <div className="flex">
          <ul>
            <h4>Locations</h4>
            {allLocations.map((location) => {
              return (
                <li>
                  {location.name}
                  <span className="options">
                    <button
                      type="button"
                      value={location.id}
                      onClick={deleteLocation}
                    >
                      x
                    </button>
                  </span>
                </li>
              );
            })}{" "}
          </ul>
          <button className="tophatButton">
            <img src="img/tophat.png" alt="tophat" />
          </button>
        </div>
      </section>
    </div>
  );
}
