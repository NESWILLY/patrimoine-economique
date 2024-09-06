import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from 'react-bootstrap/Button';

const CalculateurPatrimoine = ({ calculerValeurPatrimoine }) => {
  const [date, setDate] = useState(new Date());

  const handleValidation = () => {
    calculerValeurPatrimoine(date);
  };

  return (
    <div className="calculateur-patrimoine">
      <h3>Sélectionner une date pour évaluer le patrimoine</h3>
      <DatePicker selected={date} onChange={(d) => setDate(d)} />
      <Button variant="primary" onClick={handleValidation} style={{ marginLeft: '10px' }}>
        Valider
      </Button>
    </div>
  );
};

export default CalculateurPatrimoine;
