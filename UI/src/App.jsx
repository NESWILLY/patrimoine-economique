import React, { useState, useEffect } from 'react';
import TableauPossessions from './composants/TableauPossessions';
import CalculateurPatrimoine from './composants/CalculateurPatrimoine';
import Argent from '../../models/Possessions/Argent';
import BienMateriel from '../../models/Possessions/BienMateriel';
import Flux from '../../models/Possessions/Flux';
import Patrimoine from '../../models/Patrimoine';
import Personne from '../../models/Personne';
import data from '../../data/data.json';
import './App.css';

const App = () => {
  const [personne, setPersonne] = useState(null);
  const [valeurTotale, setValeurTotale] = useState(0);

  useEffect(() => {
    const personneData = data.find((item) => item.model === 'Personne');
    const patrimoineData = data.find((item) => item.model === 'Patrimoine');

    if (personneData && patrimoineData) {
      const possesseur = new Personne(personneData.data.nom);

      const possessions = patrimoineData.data.possessions.map((possession) => {
        // Afficher les données de chaque possession pour le débogage
        console.log('Possession:', possession);

        if (!possession.type) {
          console.error('Type de possession manquant:', possession);
          return null;
        }

        // Gestion des dates nulles
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
  }, []);

  const calculerValeurPatrimoine = (date) => {
    if (personne) {
      const total = personne.getValeur(date);
      setValeurTotale(total.toFixed(2));
    }
  };

  return (
    <div className="container">
      <h1>Gestion du Patrimoine</h1>
      <CalculateurPatrimoine calculerValeurPatrimoine={calculerValeurPatrimoine} />
      {personne && <TableauPossessions possessions={personne.possessions} />}
      <h2>Valeur Totale : {valeurTotale} FMG</h2>
    </div>
  );
};

export default App;
