import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./UserTravel.css";
import TopHat from "./TopHat";
import UserSubmitButton from "./UserSubmitButton";
import UserLocations from "./UserLocations";

//Todo
// Magic Hat click => pop up of the random location
// scroll bar for all the Locations
// Footer

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

      <section id="threeSections">
        <ul className="flex">
          <li className="section" id="instructions">
            <h3 className="sectionHeader">Instructions</h3>
            <p>Type the name of the place you want to visit! </p>
            <UserSubmitButton
              handleSubmit={handleSubmit}
              onChange={onChange}
              location={location}
            />
          </li>
          <li className="section" id="locations">
            <h3 className="sectionHeader">Locations</h3>
            <p>
              This is the list of all the countries you entered! <br />
              Feel free to delete using the "x" button
            </p>
            <UserLocations
              allLocations={allLocations}
              location={location}
              deleteLocation={deleteLocation}
            />
          </li>
          <li className="section" id="tophat">
            <h3 className="sectionHeader">Magic Hat!</h3>
            <p>
              The hat will shake when you put your mouse over it. <br />
              Click the hat to receive a random location!
            </p>
            <TopHat allLocations={allLocations} />
          </li>
        </ul>
      </section>

      <footer>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
          reiciendis? Adipisci voluptatibus ducimus doloremque in necessitatibus
          ullam cupiditate illum, tempore quo nihil nam eos est reprehenderit ex
          quod corrupti, impedit incidunt porro veritatis, iste eius rerum
          ipsam? Vitae, quibusdam voluptas sequi ex doloribus aliquid fugit
          eligendi quae quasi perspiciatis non culpa commodi repudiandae quas
          adipisci facilis quos dolor distinctio deleniti alias laboriosam
          nobis, nemo maiores provident. Dolores rem repudiandae corrupti minus
          nostrum deserunt ut corporis? Unde quaerat dicta fuga soluta assumenda
          saepe tempore quisquam. Laboriosam ipsa sed expedita inventore,
          commodi corrupti obcaecati eaque sunt et neque ea totam incidunt cum?
        </p>
      </footer>
    </div>
  );
}
