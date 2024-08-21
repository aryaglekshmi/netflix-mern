import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchDataByGenre } from "../state/slice";

export default function SelectGenre({ genres, type }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const dropdownRef = useRef(null);

  function onClickItem(event, genre) {
    event.stopPropagation(); // Prevent onBlur from firing
    dispatch(fetchDataByGenre(genre));
    setShow(false); // Close the dropdown after selecting an item
    setSelectedGenre(genre);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="dropdown m-4" ref={dropdownRef}>
      <button
        className="btn btn-secondary dropdown-toggle bg-black border-0"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded={show}
        onClick={() => setShow(!show)}
      >
        {selectedGenre ? selectedGenre.name : 'Select Genre'}
      </button>
      <ul className={`dropdown-menu ${show ? "show" : ""}`}>
        {genres.map((genre) => (
          <li
            className="cursor-pointer dropdown-item"
            key={genre.id}
            value={genre.id}
            onClick={(event) =>  {
                onClickItem(event, { genres, genre: genre.id, type });
                setSelectedGenre(genre);
            }}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
