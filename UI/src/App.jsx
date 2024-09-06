import React, { useState, useEffect } from 'react';
import TableauPossessions from './composants/TableauPossessions';
import CalculateurPatrimoine from './composants/CalculateurPatrimoine';
import Patrimoine from '../models/Patrimoine';
import Personne from '../models/Personne';
import data from '../data/data.json';
import './styles/main.css';

const App = () => {
  const [personne, setPersonne] = useState(null);
  const [valeurTotale, setValeurTotale] = useState(0);

  useEffect(() => {
    const personneData = data.find((item) => item.model === 'Personne');
    const patrimoineData = data.find((item) => item.model === 'Patrimoine');

    const possesseur = new Personne(personneData.data.nom);
    const possessions = patrimoineData.data.possessions.map((possession) => {
      return new Patrimoine(
        possesseur,
        possession.libelle,
        possession.valeur,
        possession.dateDebut,
        possession.tauxAmortissement
      );
    });

    possesseur.ajouterPossessions(possessions);
    setPersonne(possesseur);
    setValeurTotale(possesseur.calculerValeurTotale(new Date()).toFixed(2));
  }, []);

  const calculerValeurPatrimoine = (date) => {
    if (personne) {
      const total = personne.calculerValeurTotale(date);
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
