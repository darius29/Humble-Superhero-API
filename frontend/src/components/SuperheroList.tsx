import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/superheroes.css";

type Superhero = {
  name: string;
  superpower: string;
  humilityScore: number;
};

const SuperheroList = ({ onEdit }: { onEdit: (hero: Superhero) => void }) => {
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);

  useEffect(() => {
    fetchSuperheroes();
  }, [superheroes]);

  const fetchSuperheroes = () => {
    axios.get("http://localhost:3001/superheroes").then((response) => {
      setSuperheroes(response.data);
    });
  };

  const handleDelete = (name: string) => {
    axios
      .delete(`http://localhost:3001/superheroes/${name}`)
      .then(() => fetchSuperheroes()) // 🔹 Reîncărcăm lista după ștergere
      .catch((error) => console.error("Error deleting superhero:", error));
  };

  return (
    <div className="superhero-list-container">
      <h2>Superhero List</h2>
      <ul className="superhero-list">
        {superheroes.map((hero, index) => (
          <li key={index} className="superhero-card">
            <div className="hero-name">{hero.name}</div>
            <div className="hero-superpower">Superpower: {hero.superpower}</div>
            <div className="hero-humility">Humility: {hero.humilityScore}</div>
            <div className="button-group">
              <button className="editButton" onClick={() => onEdit(hero)}>
                Edit
              </button>
              <button
                className="deleteButton"
                onClick={() => handleDelete(hero.name)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuperheroList;
