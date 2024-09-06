import React from 'react';
import Table from 'react-bootstrap/Table';

const TableauPossessions = ({ possessions }) => {
  const afficherPossession = (possession, index) => {
    // Assurez-vous que la possession a toutes les propriétés requises
    const {
      libelle,
      valeur,
      valeurActuelle,
      dateDebut,
      dateFin,
      tauxAmortissement,
      type
    } = possession || {};

    // Vérifiez si toutes les propriétés requises sont présentes et correctes
    const valeursCorrectes =
      typeof valeur === 'number' &&
      (valeurActuelle === undefined || typeof valeurActuelle === 'number') &&
      (dateDebut instanceof Date || !dateDebut) &&
      (dateFin === null || dateFin instanceof Date) &&
      (tauxAmortissement === null || typeof tauxAmortissement === 'number');

    if (!valeursCorrectes) {
      console.error('Données de possession incorrectes:', possession);
      return (
        <tr key={index}>
          <td colSpan="6">Données de possession manquantes ou incorrectes</td>
        </tr>
      );
    }

    return (
      <tr key={index}>
        <td>{libelle || 'Inconnu'}</td>
        <td>{typeof valeur === 'number' ? valeur.toLocaleString() : 'Inconnu'} FMG</td>
        <td>{dateDebut ? new Date(dateDebut).toLocaleDateString() : 'Inconnu'}</td>
        <td>{dateFin ? new Date(dateFin).toLocaleDateString() : 'N/A'}</td>
        <td>{typeof tauxAmortissement === 'number' ? `${tauxAmortissement}%` : 'N/A'}</td>
        <td>{typeof valeurActuelle === 'number' ? valeurActuelle.toLocaleString() : 'Inconnu'} FMG</td>
      </tr>
    );
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Libellé</th>
          <th>Valeur Initiale</th>
          <th>Date de Début</th>
          <th>Date de Fin</th>
          <th>Amortissement (%)</th>
          <th>Valeur Actuelle</th>
        </tr>
      </thead>
      <tbody>
        {possessions.map((possession, index) => afficherPossession(possession, index))}
      </tbody>
    </Table>
  );
};

export default TableauPossessions;
