import { useState } from "react";
import "./TopHat.css";
import LocationModal from "./LocationModal";

export default function TopHat(props) {
  function selectRandomLocation() {
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

      <LocationModal />
    </div>
  );
}
