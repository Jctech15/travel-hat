import "./UserLocations.css";

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
                  x
                </button>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
