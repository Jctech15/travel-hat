// import css
import "./UserTravelInput.css";

export default function UserTravelInput() {
  return (
    <div className="UserTravelInput">
      <h1>Your Dream Travel Locations</h1>
      <form action="">
        <input
          type="text"
          name="location"
          id="location"
          placeholder="Type location"
        />
        <button>Submit</button>
      </form>
      <div className="flex">
        <section className="userInput">
          <h3>Locations</h3>
          <ul>
            <li>Paris</li>
            <li>USA</li>
          </ul>
        </section>
        <section className="locationDetails">
          <h3>API</h3>
        </section>
      </div>
    </div>
  );
}
