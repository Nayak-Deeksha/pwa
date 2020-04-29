import React, { useState } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";

function App() {
  const [book, setBook] = useState({});
  const fetchData = () => {
    caches.open("books").then(async (cache) => {
      await axios
        .get("https://www.anapioficeandfire.com/api/books/1")
        .then(function (response) {
          cache.add(response.data.url);
          console.log(response.data.url + " add");
          setBook(response.data);
        });
    });
  };
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <button className="fetch-button" onClick={fetchData}>
          Fetch Data
        </button>

        <div className="details">
          <p>BOOK : {book.name}</p>
          <p>AUTHOR : {book.authors}</p>
          <p>NO.OF PAGES : {book.numberOfPages}</p>
          <p>PUBLISHER : {book.publisher}</p>
          <p>RELEASED: {book.released}</p>
        </div>
      </div>
    </div>
  );
}
export default App;
