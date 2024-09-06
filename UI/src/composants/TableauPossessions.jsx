import React from 'react';
import Table from 'react-bootstrap/Table';

const TableauPossessions = ({ possessions }) => {
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
        {possessions.map((possession, index) => (
          <tr key={index}>
            <td>{possession.libelle}</td>
            <td>{possession.valeur.toLocaleString()} FMG</td>
            <td>{new Date(possession.dateDebut).toLocaleDateString()}</td>
            <td>{possession.dateFin ? new Date(possession.dateFin).toLocaleDateString() : 'N/A'}</td>
            <td>{possession.tauxAmortissement ? `${possession.tauxAmortissement}%` : 'N/A'}</td>
            <td>{possession.valeurActuelle.toLocaleString()} FMG</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableauPossessions;
