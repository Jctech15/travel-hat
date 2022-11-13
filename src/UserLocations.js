import "./UserLocations.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function UserLocations(props) {
  function fetchUserLocations() {
    return JSON.parse(localStorage.getItem("userLocations"));
  }

  return (
    <div className="UserLocations">
      <ul className="displayedLocation">
        {props.allLocations.map((location) => {
          return (
            <li>
              <span id="flexGrow">{location}</span>
              <span className="deleteButton">
                <button
                  type="button"
                  value={location}
                  // onClick={deleteLocation}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
