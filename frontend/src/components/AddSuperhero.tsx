import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/superheroes.css";

const AddSuperhero = ({
  editingHero,
  onEditComplete,
  onSuperheroUpdated, // 🔹 Adăugăm această prop pentru a actualiza lista
}: {
  editingHero: any;
  onEditComplete: () => void;
  onSuperheroUpdated: () => void;
}) => {
  const [name, setName] = useState("");
  const [superpower, setSuperpower] = useState("");
  const [humilityScore, setHumilityScore] = useState(1);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editingHero) {
      setName(editingHero.name);
      setSuperpower(editingHero.superpower);
      setHumilityScore(editingHero.humilityScore);
      setIsEditing(true);
    }
  }, [editingHero]);

  const handleSubmit = () => {
    if (isEditing) {
      axios
        .patch(`http://localhost:3001/superheroes/${name}`, {
          superpower,
          humilityScore,
        })
        .then(() => {
          onEditComplete();
          onSuperheroUpdated(); // 🔹 Apelează funcția de actualizare a listei după editare
          resetForm();
        })
        .catch((error) => console.error("Error updating superhero:", error));
    } else {
      axios
        .post("http://localhost:3001/superheroes", {
          name,
          superpower,
          humilityScore,
        })
        .then(() => {
          resetForm();
          onEditComplete();
          onSuperheroUpdated(); // 🔹 Apelează funcția și după adăugare
        })
        .catch((error) => console.error("Error adding superhero:", error));
    }
  };

  const resetForm = () => {
    setName("");
    setSuperpower("");
    setHumilityScore(1);
    setIsEditing(false);
  };

  return (
    <div className="add-superhero-container">
      <h2>{isEditing ? "Edit Superhero" : "Add Superhero"}</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isEditing}
      />
      <input
        placeholder="Superpower"
        value={superpower}
        onChange={(e) => setSuperpower(e.target.value)}
      />
      <input
        type="number"
        min="1"
        max="10"
        value={humilityScore}
        onChange={(e) => setHumilityScore(Number(e.target.value))}
      />
      <button onClick={handleSubmit}>{isEditing ? "Save" : "Add"}</button>
    </div>
  );
};

export default AddSuperhero;
