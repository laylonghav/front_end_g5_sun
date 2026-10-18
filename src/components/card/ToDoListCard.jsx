import { useState } from "react";

export default function ToDoListCard() {
  const [data, setData] = useState(["Apple", "Banana", "Mengo"]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  function onDelete(index) {
    console.log("Item delte: ", index);
    // const filter = data.filter((i) => i !== item);
    // Rerender new data
    setData(data.filter((_, i) => i !== index));
  }

  const dataFilter = data.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <h1>To Do list card</h1>

      <div
        className=""
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {/* <p>Search value: {search}</p> */}
        <input
          value={search}
          type="text"
          placeholder="Search"
          style={{
            border: "none",
            outline: "none",
            padding: "0.5rem",
            borderRadius: "1rem",
            backgroundColor: "cyan",
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div
          className=""
          style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
        >
          <input
            value={query}
            type="text"
            placeholder="Add item"
            style={{
              border: "none",
              outline: "none",
              padding: "0.5rem",
              borderRadius: "1rem",
              backgroundColor: "cyan",
            }}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            style={{
              border: "none",
              outline: "none",
              padding: "0.5rem",
              borderRadius: "1rem",
              fontSize: "1rem",
            }}
            onClick={() => {
              setData([...data, query]);
              setQuery("");
            }}
          >
            Add item
          </button>
        </div>
      </div>

      <ul
        style={{
          listStyle: "none",
          marginLeft: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
        className=""
      >
        {dataFilter.map((item, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "yellow",
              padding: "0.5rem",
              borderRadius: "1rem",
            }}
          >
            <div className="">{item}</div>
            <button
              style={{
                border: "none",
                outline: "none",
                padding: "0.5rem",
                borderRadius: "1rem",
                fontSize: "1rem",
              }}
              onClick={() => onDelete(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
