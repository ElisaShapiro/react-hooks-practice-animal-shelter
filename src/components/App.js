import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState("all");
  const url = filters == "all" ? "http://localhost:3001/pets" : `http://localhost:3001/pets/?type=${filters}`
 
  function onFindPetsClick(){
    fetch(url)
    .then(response => response.json())
    .then(petData => setPets(petData))
  }

  function onChangeType(e){
    setFilters(e.target.value)
  }
  
  function onAdoptPet(id){
    let updatePets = pets.map((pet) => {
      if (pet.id === id) {
        pet.isAdopted = true
      } 
      return pet
    })
    setPets(updatePets)
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onFindPetsClick={onFindPetsClick} onChangeType={onChangeType}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} setPets={setPets} onAdoptPet={onAdoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
