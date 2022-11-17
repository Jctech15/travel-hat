import "./UserLocations.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function UserLocations(props) {
  async function deleteLocation(event, location) {
    event.preventDefault();
    props.deleteLocation(location);
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
                  onClick={(event) => deleteLocation(event, location)}
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
