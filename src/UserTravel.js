// import css
import "./UserTravel.css";
import UserSubmitButton from "./UserSubmitButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function UserTravel() {
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
    setLocation("");
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
    <div className="UserTravel">
      <header>
        <h1>Travel Hat</h1>
      </header>
      <main>
        <h2>Your Dream Travel Locations</h2>
        <p>
          Follow the insturctions to receive a randomly chosen vacation
          location!
        </p>
      </main>
      <section className="userInput">
        <ul className="flex">
          <li>
            <h3>Instructions</h3>
            <p>Type the name of the country you want to visit </p>
            <UserSubmitButton
              handleSubmit={handleSubmit}
              onChange={onChange}
              location={location}
            />
          </li>
          <li>
            <h3>Locations</h3>
            <p>
              This is the list of all the countries you entered! <br />
              Feel free to delete using the "x" button
            </p>
            <ul className="displayedLocation">
              {allLocations.map((location) => {
                return (
                  <li>
                    {location.name}
                    <span className="deleteButton">
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
              })}
            </ul>
          </li>
          <li>
            <h3>Magic Hat!</h3>
            <button className="tophatButton">
              <img src="img/tophat.png" alt="tophat" />
            </button>
          </li>
        </ul>
      </section>
    </div>
  );
}
