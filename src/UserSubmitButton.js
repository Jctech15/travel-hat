import { useState } from "react";
import "./UserSubmitButton.css";

export default function UserSubmitButton(props) {
  const [location, setLocation] = useState("");

  async function onChange(event) {
    setLocation(event.target.value);
  }

  async function handleSubmit(event, location) {
    event.preventDefault();
    props.handleSubmit(location);
  }

  return (
    <div className="UserSubmitButton">
      <form onSubmit={(event) => handleSubmit(event, location)}>
        <input
          onChange={onChange}
          value={location}
          type="text"
          name="userLocation"
          id="userLocation"
          placeholder="Type location"
          autoComplete="off"
          size="25"
          minlength="2"
          spellCheck="true"
          required
        />
        <button id="submitButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
