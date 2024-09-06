import React, { useState, useEffect } from 'react';
import TableauPossessions from './composants/TableauPossessions';
import CalculateurPatrimoine from './composants/CalculateurPatrimoine';
import Argent from '../../models/possessions/Argent';
import BienMateriel from '../../models/possessions/BienMateriel';
import Flux from '../../models/possessions/Flux';
import Patrimoine from '../../models/Patrimoine';
import Personne from '../../models/Personne';
import data from '../../data/data.json';
import './App.css';

const App = () => {
  const [personnes, setPersonnes] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [personne, setPersonne] = useState(null);
  const [valeurTotale, setValeurTotale] = useState(0);

  useEffect(() => {
    const personnesData = data.filter((item) => item.model === 'Personne');
    
    if (personnesData.length > 0) {
      setPersonnes(personnesData.map(item => item.data.nom));
      const initialPersonne = personnesData[0].data.nom;
      setSelectedPerson(initialPersonne);
      updatePersonne(initialPersonne);
    }
  }, []);

  const updatePersonne = (nomPersonne) => {
    const patrimoineData = data.find((item) => item.model === 'Patrimoine' && item.data.nomPersonne === nomPersonne);

    if (patrimoineData) {
      const possesseur = new Personne(nomPersonne);

      const possessions = patrimoineData.data.possessions.map((possession) => {
        if (!possession.type) {
          console.error('Type de possession manquant:', possession);
          return null;
        }

        const dateDebut = possession.dateDebut ? new Date(possession.dateDebut) : null;
        const dateFin = possession.dateFin ? new Date(possession.dateFin) : null;

        switch (possession.type) {
          case 'Argent':
            return new Argent(
              possesseur,
              possession.libelle,
              possession.valeur,
              dateDebut,
              dateFin,
              possession.tauxAmortissement
            );
          case 'BienMateriel':
            return new BienMateriel(
              possesseur,
              possession.libelle,
              possession.valeur,
              dateDebut,
              dateFin,
              possession.tauxAmortissement
            );
          case 'Flux':
            return new Flux(
              possesseur,
              possession.libelle,
              possession.valeur,
              dateDebut,
              dateFin,
              possession.tauxAmortissement,
              possession.jour,
              possession.valeurConstante
            );
          default:
            console.error(`Type de possession inconnu: ${possession.type}`);
            return null;
        }
      }).filter(possession => possession !== null);

      const patrimoine = new Patrimoine(possesseur, possessions);
      setPersonne(patrimoine);
      setValeurTotale(patrimoine.getValeur(new Date()).toFixed(2));
    }
  };

  const handlePersonChange = (event) => {
    const newPerson = event.target.value;
    setSelectedPerson(newPerson);
    updatePersonne(newPerson);
  };

  const calculerValeurPatrimoine = (date) => {
    if (personne) {
      const total = personne.getValeur(date);
      setValeurTotale(total.toFixed(2));
    }
  };

  return (
    <div className="container">
      <h1>Gestion du Patrimoine</h1>
      <select value={selectedPerson} onChange={handlePersonChange}>
        {personnes.map((personne, index) => (
          <option key={index} value={personne}>{personne}</option>
        ))}
      </select>
      <CalculateurPatrimoine calculerValeurPatrimoine={calculerValeurPatrimoine} />
      {personne && <TableauPossessions possessions={personne.possessions} />}
      <h2>Valeur Totale : {valeurTotale} FMG</h2>
    </div>
  );
};

export default App;
