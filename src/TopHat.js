import { useState } from "react";
import "./TopHat.css";
import LocationModal from "./LocationModal";

export default function TopHat(props) {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [openModal, setOpenModal] = useState(false);

  function selectRandomLocation() {
    const allLocations = props.fetchUserLocations();
    const randomLocationIndex = Math.floor(Math.random() * allLocations.length);
    setSelectedLocation(allLocations[randomLocationIndex]);
    setOpenModal(true);
  }

  function handleClose() {
    setOpenModal(false);
  }

  return (
    <div className="TopHat">
      <button className="tophatButton" onClick={selectRandomLocation}>
        <img src="img/tophat.png" alt="tophat" />
      </button>

      <LocationModal
        selectedLocation={selectedLocation}
        openModal={openModal}
        handleClose={handleClose}
      />
    </div>
  );
}
