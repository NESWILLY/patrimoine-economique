import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'; // Import Alert for messages

const CalculateurPatrimoine = ({ calculerValeurPatrimoine }) => {
  const [date, setDate] = useState(new Date());
  const [message, setMessage] = useState(null);

  const handleValidation = () => {
    if (!date) {
      setMessage("Veuillez sélectionner une date valide: dd/mm/yyyy");
    } else {
      setMessage(""); 
      calculerValeurPatrimoine(date);

    }
  };

  return (
    <div className="calculateur-patrimoine">
      <h3>Sélectionner une date pour évaluer le patrimoine</h3>
      <DatePicker selected={date} onChange={(d) => setDate(d)} />
      <Button variant="primary" onClick={handleValidation} style={{ marginLeft: '20px' }}>
        Valider
      </Button>
      {message && <Alert variant="info" style={{ marginTop: '10px' }}>{message}</Alert>}
    </div>
  );
};

export default CalculateurPatrimoine;
