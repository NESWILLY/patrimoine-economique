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

// Fonction pour convertir le format de date jj/mm/aaaa en objet Date
const convertirDate = (dateStr) => {
  const [jour, mois, annee] = dateStr.split('/');
  return new Date(`${annee}-${mois}-${jour}`);
};

const App = () => {
  const [personnes, setPersonnes] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [personne, setPersonne] = useState(null);
  const [valeurTotale, setValeurTotale] = useState(0);
  const [dateEvaluation, setDateEvaluation] = useState(new Date()); // Variable pour la date

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
        const dateDebut = convertirDate(possession.dateDebut); // Conversion de la date de début

        switch (possession.type) {
          case 'Argent':
            return new Argent(
              possesseur,
              possession.libelle,
              possession.valeur,
              dateDebut,
              possession.dateFin ? convertirDate(possession.dateFin) : null,
              possession.tauxAmortissement,
              possession.type
            );
          case 'BienMateriel':
            return new BienMateriel(
              possesseur,
              possession.libelle,
              possession.valeur,
              dateDebut,
              possession.dateFin ? convertirDate(possession.dateFin) : null,
              possession.tauxAmortissement,
              possession.type
            );
          case 'Flux':
            return new Flux(
              possesseur,
              possession.libelle,
              possession.valeur,
              dateDebut,
              possession.dateFin ? convertirDate(possession.dateFin) : null,
              possession.tauxAmortissement,
              possession.jour,
              possession.type
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
    setDateEvaluation(date); // Mise à jour de la date d'évaluation
    if (personne) {
      const total = personne.getValeur(date);
      setValeurTotale(total.toFixed(2));
    }
  };

  return (
    <div className="container">
      <h1>Gestion du Patrimoine</h1>
      <label htmlFor="personneSelect">Sélectionnez une personne :</label>
      <select id="personneSelect" value={selectedPerson} onChange={handlePersonChange}>
        {personnes.map((personne, index) => (
          <option key={index} value={personne}>{personne}</option>
        ))}
      </select>

      <p>Veuillez entrer les dates au format <strong>jj/mm/aaaa</strong>.</p>
      <CalculateurPatrimoine calculerValeurPatrimoine={calculerValeurPatrimoine} />
      
      {personne && (
        <TableauPossessions possessions={personne.possessions} dateEvaluation={dateEvaluation} />
      )}
      
      <h2>Valeur Totale : {valeurTotale} Ar</h2>
    </div>
  );
};

export default App;
