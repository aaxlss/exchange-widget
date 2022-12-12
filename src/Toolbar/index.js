import React, { Fragment, useEffect, useState } from "react";
import { callAPI } from "../API";
import { assets, history } from "../API/URL";
import { Input } from "../Components/input";
const CurrencyFrom = ({value, items, setFunction}) => {
  return (
    <select onChange={item => setFunction(item.target.value)} class="">
        <option value={value} >Select currency</option>
        {items.map(item => (<option value={item.code}>{item.name}</option>))}
       </select>
  );
};

const Amount1 = ({value, onChange}) => {
  return <Input value={value} onChange={onChange}/>
}
const Amount2 = ({value, onChange}) => {
  return <Input value={value} onChange={onChange}/>
}

const CurrencyTo = ({value, items, setFunction}) => {
  return (
    <select onChange={item => setFunction(item.target.value)}>
        <option value={value} >Select currency</option>
        {items.map(item => (<option value={item.code}>{item.name}</option>))}
       </select>
  );
};

const callCrytoAssets = (setFunction) => {
  const queryParams = {
    'type_is_crypto': 1
  }
  const options = {
    method: 'GET',
  }
  callAPI(assets, options, queryParams)
  .then(response => setFunction(response));
}

const callCurrencyAssets = (setFunction) => {
  const queryParams = {
    'type_is_crypto': 0
  }
  const options = {
    method: 'GET',
  }
  callAPI(assets, options, queryParams)
  .then(response => setFunction(response))
}

const callSaveData = (data) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {"Content-type": "application/json;charset=UTF-8"}
  }
  callAPI(history,options).then(response => response);
}

const callHistory = (setFunction) => {
  const options = {
    method: 'GET',
  }
  callAPI(history, options)
  .then(response => setFunction(response));
}

function Toolbar() {
    const [cryptoCollection, setCryptoCollection] = useState([]);
    const [currencyCollection, setCurrencyCollection] = useState([]);
    const [historyCollection, setHistoryCollection] = useState([])
    const [currencyFrom, setCurrencyFrom] = useState('');
    const [amountFrom, setAmountFrom] = useState(1);
    const [currencyTo, setCurrencyTo] = useState('')
    const [amountTo, setAmountTo] = useState(0);
    
    useEffect(()=>{
      callCrytoAssets(setCryptoCollection);
      callCurrencyAssets(setCurrencyCollection);
      callHistory(setHistoryCollection);
    },[]);
    useEffect(() =>{
      
    },[currencyFrom,amountFrom,currencyTo,amountTo]);

    
    const onSaveExchange = () =>{
      const data = {
        date_time: new Date().getTime(),
        currency_from: currencyFrom,
        amount_1: amountFrom,
        currency_to: currencyTo,
        amount_2: amountTo,
        type: 'Exchange',
      }

      callSaveData(data);
    }

  return <Fragment>
    <label>Currency From</label>
    <CurrencyFrom defaultValue={currencyFrom} items={cryptoCollection} setFunction={setCurrencyFrom}/>
    <label>Amount</label>
    <Amount1 value={amountFrom} onChange={event => setAmountFrom(event.target.value)}/>
    =
    <label>Currency To</label>
    <CurrencyTo defaultValue={currencyTo} items={currencyCollection} setFunction={setCurrencyTo}/>
    <label>Amount</label>
    <Amount2 value={amountTo} onChange={event => setAmountTo(event.target.value)}/>
    <buton onClick={async () => {
      await onSaveExchange();
      callHistory(setHistoryCollection);
      }}>Save</buton>

{/* Table  History*/}
<table class="bg-yellow-500 text-white border-8 border-sky-500">
    <thead>
        <th>Data & Time</th>
        <th>Currency From</th>
        <th>Amount 1</th>
        <th>Currency To</th>
        <th>Amount 2</th>
        <th>Type</th>
    </thead>
    <tbody>
        {historyCollection && historyCollection.map(item => (
            <tr>
                <td>{item.date_time}</td>
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
