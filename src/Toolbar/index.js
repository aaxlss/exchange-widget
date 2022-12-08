import React, { Fragment, useEffect, useState } from "react";

const crypto = [
  {
    code: "BTN",
    name: "Bitcoin",
    price_dollar: 4400
  },
];

const currency = [
  {
    code: "USD",
    name: "American dollar",
  },
];

const CurrencyFrom = ({value, items, setFunction}) => {
  return (
    <select onChange={item => setFunction(item.target.value)}>
        <option value={value} >Select currency</option>
        {items.map(item => (<option value={item.code}>{item.name}</option>))}
       </select>
  );
};



const CurrencyTo = ({value, items, setFunction}) => {
  return (
    <select onChange={item => setFunction(item.target.value)}>
        <option value={value} >Select currency</option>
        {items.map(item => (<option value={item.code}>{item.name}</option>))}
       </select>
  );
};

function Toolbar() {
    const [currencyFrom, setCurrencyFrom] = useState('');
    const [amountFrom, setAmountFrom] = useState(1);
    const [currencyTo, setCurrencyTo] = useState('')
    const [amountTo, setAmountTo] = useState(0);
    const [saveExchange, setSaveExchange] = useState([])
    
    
    useEffect(() =>{

    },[currencyFrom,amountFrom,currencyTo,amountTo]);


    const onSaveExchange = () =>{
        setSaveExchange(prev => [...prev, {
            data_time: new Date().getTime(),
            currency_from: currencyFrom,
            amount_1: amountFrom,
            currency_to: currencyTo,
            amount_2: amountTo,
            type: 'Exchange',
        }])
    }

  return <Fragment>
    <label>Currency From</label>
    <CurrencyFrom defaultValue={currencyFrom} items={crypto} setFunction={setCurrencyFrom}/>
    <label>Amount</label>
    <input value={amountFrom} onChange={event => setAmountFrom(event.target.value)}></input>
    =
    <label>Currency To</label>
    <CurrencyTo defaultValue={currencyTo} items={currency} setFunction={setCurrencyTo}/>
    <label>Amount</label>
    <input value={amountTo} onChange={event => setAmountTo(event.target.value)}></input>
    <buton onClick={() => onSaveExchange()}>Save</buton>

{/* Table  History*/}
<table>
    <thead>
        <th>Data & Time</th>
        <th>Currency From</th>
        <th>Amount 1</th>
        <th>Currency To</th>
        <th>Amount 2</th>
        <th>Type</th>
    </thead>
    <tbody>
        {saveExchange && saveExchange.map(item => (
            <tr>
                <td>{item.data_time}</td>
                <td>{item.currency_from}</td>
                <td>{item.amount_1}</td>
                <td>{item.currency_to}</td>
                <td>{item.amount_2}</td>
                <td>{item.type}</td>
            </tr>
        ))}
    </tbody>
</table>
    
  </Fragment>;
}

export { Toolbar };
