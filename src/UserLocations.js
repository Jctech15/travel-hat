import "./UserLocations.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function UserLocations(props) {
  return (
    <div className="UserLocations">
      <ul className="displayedLocation">
        {props.allLocations.map((location) => {
          return (
            <li>
              <span id="flexGrow">{location.name}</span>
              <span className="deleteButton">
                <button
                  type="button"
                  value={location.id}
                  onClick={props.deleteLocation}
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
