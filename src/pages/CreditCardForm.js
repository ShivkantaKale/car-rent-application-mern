import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

function CreditCardForm() {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focus, setFocus] = useState('');

  return (
    <div>
      <h2>Enter your credit card information:</h2>
      <form>
        <div>
          <label htmlFor="number">Card number:</label>
          <input
            type="tel"
            id="number"
            name="number"
            placeholder="Card number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
          />
        </div>
        <div>
          <label htmlFor="name">Cardholder name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Cardholder name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
          />
        </div>
        <div>
          <label htmlFor="expiry">Expiration date:</label>
          <input
            type="tel"
            id="expiry"
            name="expiry"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
          />
        </div>
        <div>
          <label htmlFor="cvc">CVV:</label>
          <input
            type="tel"
            id="cvc"
            name="cvc"
            placeholder="CVV"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
          />
        </div>
      </form>
      <Cards
        number={number}
        name={name}
        expiry={expiry}
        cvc={cvc}
        focused={focus}
      />
    </div>
  );
}

export default CreditCardForm;