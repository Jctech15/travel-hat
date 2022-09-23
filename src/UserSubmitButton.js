import "./UserSubmitButton.css";

export default function UserSubmitButton(props) {
  return (
    <div className="UserSubmitButton">
      <form onSubmit={(event) => props.handleSubmit(event)}>
        <input
          type="text"
          name="userLocation"
          id="userLocation"
          placeholder="Type location"
          onChange={(event) => props.onChange(event)}
          value={props.location}
          autoComplete="off"
          size="25"
          required
          minlength="2"
          spellCheck="true"
        />
        <button id="submitButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
