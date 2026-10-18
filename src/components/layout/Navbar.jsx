import { NavLink } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import "./style.css";
import { useSelector } from "react-redux";

export default function Navbar() {
  // read data from Redux
  const counter = useSelector((state) => state.counter.value);
  const nav_item = [
    { to: "/", label: "Home" },
    { to: "/product", label: "Product" },
    { to: "/about", label: "About" },
  ];

  return (
    <nav
      style={{
        // backgroundColor: "cyan",
        padding: "0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0px 1px 1px 1px #eeee",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      <div
        className=""
        style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
      >
        <img
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "yellow",
            padding: "5px",
            borderRadius: "5rem",
          }}
          src={logo}
          alt=""
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="">POS System</div>
          <div className="">Teacher</div>
        </div>
      </div>
      <h1>Counter: {counter}</h1>
      <div
        className="text"
        style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
      >
        {nav_item.map((item, index) => (
          <NavLink
            className={({ isActive }) => (isActive ? "isActive" : "inActive")}
            to={item?.to}
            style={{ textDecoration: "none" }}
          >
            {item?.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
