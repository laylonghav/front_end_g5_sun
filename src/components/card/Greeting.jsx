import "./style.css";
import style from "./style.module.css";
const Greeting = ({ data }) => {
  return (
    <div>
      {data && (
        <h1 className="text">{`I'm ${data?.name}, I'm ${data?.age} old.My Major ${data?.major} `}</h1>
      )}
      <h1 className={style.text_welcome}>Hello React js</h1>

      <input
        style={{
          color: "black",
          border: "none",
          outline: "none",
          backgroundColor: "orange",
          padding: "1rem",
          fontSize: "1rem",
          borderRadius: "1rem",
          marginRight: "1rem",
        }}
        onChange={(e) => {
            console.log("Input data: ",e.target.va)
        }}
        type="text"
      />

      <button
        style={{
          color: "yellow",
          border: "none",
          outline: "none",
          backgroundColor: "black",
          padding: "1rem",
          fontSize: "1rem",
          borderRadius: "1rem",
        }}
        onClick={() => {
          alert("Clicked me !");
          console.log("Clicked me !");
        }}
      >
        Click Me
      </button>
    </div>
  );
};

export default Greeting;
