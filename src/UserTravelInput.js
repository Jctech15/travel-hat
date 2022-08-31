// import css
import "./UserTravelInput.css";
import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

/* JYE TODO:
1) Put an "x" next to each item - 1
2) Add a onClick on the "x" - 1
3) Have the onClick function delete the record from Database - 2
4) If delete is successful, delete the location from the screen - 2


*/

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
        </section>
        <section className="locationDetails">
          <h3>API</h3>
        </section>
      </div>
    </div>
  );
}
