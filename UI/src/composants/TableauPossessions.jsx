import React from 'react';
import { Table } from 'react-bootstrap';

// Fonction pour afficher la date au format jj/mm/aaaa
const afficherDate = (date) => {
  return date ? date.toLocaleDateString('fr-FR') : 'N/A';
};

const TableauPossessions = ({ possessions, dateEvaluation }) => {

  const calculerValeurActuelle = (possession) => {
    const { valeur, tauxAmortissement, dateDebut, type } = possession;

    if (valeur && dateDebut && typeof tauxAmortissement === 'number') {
      if (type === 'Flux') {
        return (possession.getValeur(dateEvaluation)).toFixed(2);
      }

      if (tauxAmortissement === 0) {
        return valeur.toFixed(2);
      }

      const yearsElapsed = (dateEvaluation - dateDebut) / (1000 * 60 * 60 * 24 * 365.25);
      const amortissement = valeur * (tauxAmortissement / 100) * yearsElapsed;
      const valeurAmortie = valeur - amortissement;

      return valeurAmortie > 0 ? valeurAmortie.toFixed(2) : '0';
    }

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
          <th>Date de Fin</th>
          <th>Valeur Actuelle (Ar)</th>
        </tr>
      </thead>
      <tbody>
        {possessions.map((possession, index) => (
          <tr key={index}>
            <td>
              {possession.type}
              {possession.type === 'Flux' && (
                <>
                  ,<br /><strong>Jour : {possession.jour}</strong> 
                </>
              )}
            </td>
            <td>{possession.libelle}</td>
            <td>{possession.valeur.toFixed(2)}</td>
            <td>{possession.tauxAmortissement}</td>
            <td>{afficherDate(possession.dateDebut)}</td>
            <td>{possession.dateFin ? afficherDate(possession.dateFin) : 'N/A'}</td>
            <td>{calculerValeurActuelle(possession)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableauPossessions;
