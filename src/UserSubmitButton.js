import "./UserSubmitButton.css";

export default function UserSubmitButton(props) {
  return (
    <div>
      <form onSubmit={(event) => props.handleSubmit(event)}>
        <input
          type="text"
          name="location"
          id="location"
          placeholder="Type location"
          onChange={(event) => props.onChange(event)}
          value={props.location}
          autoComplete="off"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
