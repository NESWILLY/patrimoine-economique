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
  const [dateEvaluation, setDateEvaluation] = useState(new Date()); // Ajout d'une variable pour la date

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
        switch (possession.type) {
          case 'Argent':
            return new Argent(
              possesseur,
              possession.libelle,
              possession.valeur,
              new Date(possession.dateDebut),
              possession.dateFin ? new Date(possession.dateFin) : null,
              possession.tauxAmortissement,
              possession.type
            );
          case 'BienMateriel':
            return new BienMateriel(
              possesseur,
              possession.libelle,
              possession.valeur,
              new Date(possession.dateDebut),
              possession.dateFin ? new Date(possession.dateFin) : null,
              possession.tauxAmortissement,
              possession.type
            );
          case 'Flux':
            return new Flux(
              possesseur,
              possession.libelle,
              possession.valeur,
              new Date(possession.dateDebut),
              possession.dateFin ? new Date(possession.dateFin) : null,
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
      setValeurTotale(patrimoine.getValeur(dateEvaluation).toFixed(2)); // Valeur en fonction de la date d'évaluation
    }
  };

  const handlePersonChange = (event) => {
    const newPerson = event.target.value;
    setSelectedPerson(newPerson);
    updatePersonne(newPerson);
  };

  const calculerValeurPatrimoine = (date) => {
    setDateEvaluation(date); // Mettre à jour la date d'évaluation
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
      {personne && <TableauPossessions possessions={personne.possessions} dateEvaluation={dateEvaluation} />} {/* Pass date */}
      <h2>Valeur Totale : {valeurTotale} Ar</h2>
    </div>
  );
};

export default App;
