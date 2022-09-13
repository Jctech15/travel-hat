import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./UserTravel.css";
import TopHat from "./TopHat";
import UserSubmitButton from "./UserSubmitButton";

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
      <div className="background">
        <header>
          <h1>Travel Hat</h1>
        </header>
      </div>

      <main>
        <h2>Your Dream Travel Locations</h2>
        <p>
          Follow the insturctions to receive a randomly chosen vacation
          location!
        </p>
      </main>
      <section className="userInput">
        <ul className="flex">
          <li className="instructions section">
            <h3>Instructions</h3>
            <p>Type the name of the country you want to visit </p>
            <UserSubmitButton
              handleSubmit={handleSubmit}
              onChange={onChange}
              location={location}
            />
          </li>
          <li className="location section">
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
          <li className="tophat section">
            <h3>Magic Hat!</h3>
            <p>
              The hat will shake once you put your mouse over the hat. <br />
              Click the hat to randomly selected a vacation location!
            </p>
            <TopHat />
          </li>
        </ul>
      </section>
      <footer>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
        reiciendis? Adipisci voluptatibus ducimus doloremque in necessitatibus
        ullam cupiditate illum, tempore quo nihil nam eos est reprehenderit ex
        quod corrupti, impedit incidunt porro veritatis, iste eius rerum ipsam?
        Vitae, quibusdam voluptas sequi ex doloribus aliquid fugit eligendi quae
        quasi perspiciatis non culpa commodi repudiandae quas adipisci facilis
        quos dolor distinctio deleniti alias laboriosam nobis, nemo maiores
        provident. Dolores rem repudiandae corrupti minus nostrum deserunt ut
        corporis? Unde quaerat dicta fuga soluta assumenda saepe tempore
        quisquam. Laboriosam ipsa sed expedita inventore, commodi corrupti
        obcaecati eaque sunt et neque ea totam incidunt cum?
      </footer>
    </div>
  );
}
