import "./TopHat.css";

export default function TopHat(props) {
  function selectRandomLocation() {
    const randomLocationIndex = Math.floor(
      Math.random() * props.allLocations.length
    );
    console.log(props.allLocations[randomLocationIndex].name);
  }

  return (
    <div className="TopHat">
      <button className="tophatButton" onClick={selectRandomLocation}>
        <img src="img/tophat.png" alt="tophat" />
      </button>
    </div>
  );
}
