import { useEffect, useState } from "react";
import "./UserTravel.css";
import TopHat from "./TopHat";
import UserSubmitButton from "./UserSubmitButton";
import UserLocations from "./UserLocations";

export default function UserTravel() {
  const [allLocations, setAllLocations] = useState([]);

  //initializing allLocations state
  useEffect(() => {
    const locations = JSON.parse(localStorage.getItem("userLocations")) || [];
    setAllLocations(locations);
  }, []);

  function handleSubmit(location) {
    const returnInputLocation = localStorage.getItem("userLocations");
    const allUserLocations = returnInputLocation
      ? JSON.parse(returnInputLocation)
      : [];

    allUserLocations.push(location);

    setAllLocations(allUserLocations);

    localStorage.setItem("userLocations", JSON.stringify(allUserLocations));
  }

  function fetchUserLocations() {
    return JSON.parse(localStorage.getItem("userLocations"));
  }

  function deleteLocation(location) {
    let currentLocations = fetchUserLocations();
    const index = currentLocations.indexOf(location);

    currentLocations.splice(index, 1);
    setAllLocations(currentLocations);
    localStorage.setItem("userLocations", JSON.stringify(currentLocations));
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
          Having trouble deciding where to visit? <br />
          You have came to the right place <br />
          Follow the insturctions to receive a randomly chosen vacation
          location!
        </p>
      </main>

      <section id="threeSections">
        <ul className="flex">
          <li className="section" id="instructions">
            <h3 className="sectionHeader">Instructions</h3>
            <p>
              Type the name of the place you want to visit! <br />
              It should be at least 2 letters.
            </p>
            <UserSubmitButton handleSubmit={handleSubmit} />
          </li>
          <li className="section" id="locations">
            <h3 className="sectionHeader">Locations</h3>
            <p>
              This is the list of all the locations you entered! <br />
              Feel free to delete using the trashcan icon.
            </p>
            <UserLocations
              allLocations={allLocations}
              deleteLocation={deleteLocation}
            />
          </li>
          <li className="section" id="tophat">
            <h3 className="sectionHeader">Magic Hat!</h3>
            <p>
              Put your mouse over the magic hat <br />
              The hat should start shaking. <br />
              Left Click the hat once to receive a random location!
            </p>
            <TopHat fetchUserLocations={fetchUserLocations} />
          </li>
        </ul>
      </section>

      <footer>
        <p id="credit">
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
