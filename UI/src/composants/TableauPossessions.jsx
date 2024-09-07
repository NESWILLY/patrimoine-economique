import React from 'react';
import { Table } from 'react-bootstrap';

const TableauPossessions = ({ possessions }) => {

  // Fonction pour calculer la valeur actuelle d'une possession
  const calculerValeurActuelle = (possession) => {
    const { valeur, tauxAmortissement, dateDebut } = possession;

    if (valeur && dateDebut && typeof tauxAmortissement === 'number') {
      // Si le taux d'amortissement est 0, il n'y a pas d'amortissement à appliquer
      if (tauxAmortissement === 0) {
        return valeur.toFixed(2);  // Valeur inchangée si taux d'amortissement est 0
      }

      // Calcul du temps écoulé en années
      const dateNow = new Date();  // Date actuelle
      const dateDebutObj = new Date(dateDebut);
      const yearsElapsed = (dateNow - dateDebutObj) / (1000 * 60 * 60 * 24 * 365.25);

      // Calcul de l'amortissement total
      const amortissement = valeur * (tauxAmortissement / 100) * yearsElapsed;
      const valeurAmortie = valeur - amortissement;

      // Retourner la valeur actuelle si elle est positive, sinon 0
      return valeurAmortie > 0 ? valeurAmortie.toFixed(2) : '0';
    }

    // Si les données sont manquantes ou incorrectes
    return valeur ? valeur.toFixed(2) : 'Inconnu';
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Type</th>
          <th>Libellé</th>
          <th>Valeur Initiale (Ar)</th>
          <th>Taux d'Amortissement (%)</th>
          <th>Date de Début</th>
          <th>Valeur Actuelle (Ar)</th>
        </tr>
      </thead>
      <tbody>
        {possessions.map((possession, index) => (
          <tr key={index}>
            <td>{possession.type}</td>
            <td>{possession.libelle}</td>
            <td>{possession.valeur.toFixed(2)}</td>
            <td>{possession.tauxAmortissement}</td>
            <td>{new Date(possession.dateDebut).toLocaleDateString()}</td>
            <td>{calculerValeurActuelle(possession)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableauPossessions;
