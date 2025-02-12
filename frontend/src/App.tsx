import React, { useState } from "react";
import SuperheroList from "./components/SuperheroList";
import AddSuperhero from "./components/AddSuperhero";
import "./styles/superheroes.css";

const App = () => {
  const [editingHero, setEditingHero] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (hero: any) => {
    setEditingHero(hero);
  };

  const handleEditComplete = () => {
    setEditingHero(null);
    setRefresh(!refresh);
  };

  return (
    <div>
      <h1>Humble Superheroes</h1>
      <AddSuperhero
        editingHero={editingHero}
        onEditComplete={handleEditComplete}
        onSuperheroUpdated={handleEditComplete}
      />
      <SuperheroList onEdit={handleEdit} key={refresh ? "1" : "0"} />
    </div>
  );
};

export default App;
