import { useState } from "react";
import "./TopHat.css";
import LocationModal from "./LocationModal";

export default function TopHat(props) {
  const [randomLocationOuput, setRandomLocationOuput] = useState("");
  const [openModal, setOpenModal] = useState(false);

  function selectRandomLocation() {
    const randomLocationIndex = Math.floor(
      Math.random() * props.allLocations.length
    );
    setRandomLocationOuput(props.allLocations[randomLocationIndex].name);
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
        randomLocationOuput={randomLocationOuput}
        openModal={openModal}
        handleClose={handleClose}
      />
    </div>
  );
}
