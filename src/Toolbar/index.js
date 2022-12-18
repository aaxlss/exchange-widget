import React, { Fragment, useEffect, useState, useMemo } from "react";
import { callAPI } from "../API";
import { assets, history, icons } from "../API/URL";
import { Input } from "../Components/input";
import { Select } from "../Components/Select";
import { SmallTitle } from "../Components/SmallTitle";
import { ButtonConfirm } from "../Components/ButtonConfirm";
import { Pagination } from "../Pagination";
//socket configuarion
import io from "socket.io-client";
import { Table } from "../Components/Table";
const socket = io.connect("http://localhost:3001");

const CurrencyFrom = ({ value, items, setFunction, setAssetId }) => {
  return (
    <Select
      onChange={(item) => {
        const itemData = JSON.parse(
          item.target.options[item.target.options.selectedIndex].getAttribute(
            "data-item"
          )
        );
        setFunction(itemData);
      }}
    >
      <option value={value}>Select currency</option>
      {items.map((item) => {
        if (item.price_usd) {
          return (
            <option value={item.code} data-item={JSON.stringify(item)}>
              {item.name}
            </option>
          );
        }
      })}
    </Select>
  );
};

const Amount1 = ({ value, onChange }) => {
  return <Input value={value} onChange={onChange} />;
};
const Amount2 = ({ value, onChange }) => {
  return <Input value={value} onChange={onChange} />;
};

const CurrencyTo = ({ value, items, setFunction, icons }) => {
  return (
    <Select
      onChange={(item) => {
        const itemData = JSON.parse(
          item.target.options[item.target.options.selectedIndex].getAttribute(
            "data-item"
          )
        );
        setFunction(itemData);
      }}
    >
      <option value={value}>Select currency</option>
      {items.map((item) => (
        <option value={item.code} data-item={JSON.stringify(item)}>
          {item.name}
        </option>
      ))}
    </Select>
  );
};

const callCrytoAssets = (setFunction) => {
  const queryParams = {
    type_is_crypto: 1,
  };
  const options = {
    method: "GET",
  };
  callAPI(assets, options, queryParams).then((response) =>
    setFunction(response)
  );
};

const callCurrencyAssets = (setFunction) => {
  const queryParams = {
    type_is_crypto: 0,
  };
  const options = {
    method: "GET",
  };
  callAPI(assets, options, queryParams).then((response) =>
    setFunction(response)
  );
};

const callSaveData = (data) => {
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json;charset=UTF-8" },
  };
  callAPI(history, options).then((response) => response);
};

const callHistory = (setFunction) => {
  const options = {
    method: "GET",
  };
  callAPI(history, options).then((response) => setFunction(response));
};

const callIcons = (setFunction) => {
  const options = {
    method: "GET",
  };
  callAPI(icons, options).then((response) => setFunction(response));
};

function Toolbar() {
  const [dataSort, setDataSort] = useState({
    date_time: 1,
    currency_from: 1,
    amount_1: 1,
    currency_to: 1,
    amount_2: 1,
    type: 1,
  });
  const [cryptoCollection, setCryptoCollection] = useState([]);
  const [currencyCollection, setCurrencyCollection] = useState([]);
  const [historyCollection, setHistoryCollection] = useState([]);
  const [icons, setIcons] = useState([]);
  const [currencyFrom, setCurrencyFrom] = useState("");
  const [amountFrom, setAmountFrom] = useState(1);
  const [currencyTo, setCurrencyTo] = useState("");
  const [amountTo, setAmountTo] = useState(1);
  const [errorCurrency, setErrorCurrency] = useState("");
  const [limitItems, setLimitItems] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * limitItems;
    const lastPageIndex = firstPageIndex + limitItems;
    return historyCollection.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  useEffect(() => {
    callCrytoAssets(setCryptoCollection);
    callCurrencyAssets(setCurrencyCollection);
    callHistory(setHistoryCollection);
    socket.on("exchange added", (data) => {
      setHistoryCollection((prev) => [...prev, data]);
    });
  }, []);

  useEffect(() => {
    callIcons(setIcons);
  }, [historyCollection]);

  useEffect(() => {
    if (currencyTo != "") {
      let currentValue =
        amountFrom * currencyFrom.price_usd * (currencyTo.price_usd || 1);
      setAmountTo(currentValue);
    }
  }, [currencyFrom, amountFrom, currencyTo]);

  useEffect(() => {
    createPagination();
  }, [historyCollection]);

  const createPagination = () => {
    const pagesNumber = Math.ceil(historyCollection.length / limitItems);
    let pages = [];
    for (let index = 1; index <= pagesNumber; index++) {
      pages.push(index);
    }
    console.log(pages);
  };
  const onSaveExchange = () => {
    if (currencyFrom != "" && currencyTo != "") {
      const data = {
        date_time: new Date().getTime(),
        currency_from: currencyFrom.name,
        curreny_from_asset_id: currencyFrom.asset_id,
        amount_1: amountFrom,
        currency_to: currencyTo.name,
        curreny_to_asset_id: currencyTo.asset_id,
        amount_2: amountTo,
        type: "Exchange",
      };
      console.log(data);
      callSaveData(data);
    } else {
      if (currencyFrom == "") {
        setErrorCurrency("Select a Currency From");
      } else if (currencyTo === "") {
        setErrorCurrency("Select a Currency To");
      }
    }
  };

  const sortTable = (header) => {
    setHistoryCollection((prev) => {
      prev.sort((a, b) => {
        switch (header) {
          case "date_time":
            a = a.date_time;
            b = b.date_time;
            if (dataSort.date_time === 1) {
              setDataSort((prev) => ({ ...prev, date_time: -1 }));
              return new Date(b) - new Date(a);
            } else {
              setDataSort((prev) => ({ ...prev, date_time: 1 }));
              return new Date(a) - new Date(b);
            }
          case "currency_from":
            a = a.currency_from?.toLowerCase();
            b = b.currency_from?.toLowerCase();
            if (dataSort.currency_from === 1) {
              setDataSort((prev) => ({ ...prev, currency_from: -1 }));
              if (a > b) {
                return 1;
              }
              if (a < b) {
                return -1;
              } else {
                return 0;
              }
            } else {
              setDataSort((prev) => ({ ...prev, currency_from: 1 }));
              if (a > b) {
                return -1;
              }
              if (a < b) {
                return 1;
              } else {
                return 0;
              }
            }
          case "amount_1":
            a = a.amount_1;
            b = b.amount_1;
            if (dataSort.amount_1 === 1) {
              setDataSort((prev) => ({ ...prev, amount_1: -1 }));
              return b - a;
            } else {
              setDataSort((prev) => ({ ...prev, amount_1: 1 }));
              return a - b;
            }
          case "currency_to":
            a = a.currency_to?.toLowerCase();
            b = b.currency_to?.toLowerCase();
            if (dataSort.currency_to === 1) {
              setDataSort((prev) => ({ ...prev, currency_to: -1 }));
              if (a > b) {
                return 1;
              }
              if (a < b) {
                return -1;
              } else {
                return 0;
              }
            } else {
              setDataSort((prev) => ({ ...prev, currency_to: 1 }));
              if (a > b) {
                return -1;
              }
              if (a < b) {
                return 1;
              } else {
                return 0;
              }
            }
          case "amount_2":
            a = a.amount_2;
            b = b.amount_2;
            if (dataSort.amount_2 === 1) {
              setDataSort((prev) => ({ ...prev, amount_2: -1 }));
              return b - a;
            } else {
              setDataSort((prev) => ({ ...prev, amount_2: 1 }));
              return a - b;
            }
          case "type":
            a = a.type?.toLowerCase();
            b = b.type?.toLowerCase();
            if (dataSort.type === 1) {
              setDataSort((prev) => ({ ...prev, type: -1 }));
              if (a > b) {
                return 1;
              }
              if (a < b) {
                return -1;
              } else {
                return 0;
              }
            } else {
              setDataSort((prev) => ({ ...prev, type: 1 }));
              if (a > b) {
                return -1;
              }
              if (a < b) {
                return 1;
              } else {
                return 0;
              }
            }
        }
      });
      return [...prev];
    });
  };

  return (
    <Fragment>
      <div class="px-10">
        <div class="grid grid-cols-6">
          <div>
            <SmallTitle>Currency From</SmallTitle>
            <CurrencyFrom
              defaultValue={currencyFrom}
              items={cryptoCollection}
              setFunction={setCurrencyFrom}
            />
          </div>
          <div class="">
            <SmallTitle>Amount</SmallTitle>
            <Amount1
              value={amountFrom}
              onChange={(event) => setAmountFrom(event.target.value)}
            />
          </div>
          <div class=" leading-none relative ">
            <span class="inline-block align-middle">=</span>
          </div>
          <div class="">
            <SmallTitle>Currency To</SmallTitle>
            <CurrencyTo
              defaultValue={currencyTo}
              items={currencyCollection}
              setFunction={setCurrencyTo}
              icons={icons}
            />
          </div>
          <div class="">
            <SmallTitle>Amount</SmallTitle>
            <Amount2
              value={amountTo}
              onChange={(event) => setAmountTo(event.target.value)}
            />
          </div>
          <div class="leading-none flex align-middle items-center">
            <ButtonConfirm onClick={async () => onSaveExchange()}>
              Save
            </ButtonConfirm>
            {errorCurrency && <p>{errorCurrency}</p>}
          </div>
        </div>

        {/* Table  History*/}
        <div>
          <Table>
            <thead class=" bg-neutral-widget">
              <tr class=" text-left cursor-pointer">
                <th onClick={() => sortTable("date_time")}>Data & Time</th>
                <th onClick={() => sortTable("currency_from")}>
                  Currency From
                </th>
                <th onClick={() => sortTable("amount_1")}>Amount 1</th>
                <th onClick={() => sortTable("currency_to")}>Currency To</th>
                <th onClick={() => sortTable("amount_2")}>Amount 2</th>
                <th onClick={() => sortTable("type")}>Type</th>
              </tr>
            </thead>
            <tbody>
              {currentTableData.map((item, index) => {
                const rowClass = index % 2 != 0 ? "bg-neutral-widget" : "";
                const typeClass =
                  item.type == "Exchange"
                    ? "text-primary-widget"
                    : "text-secondary-widget";
                return (
                  <tr class={rowClass}>
                    <td>{item.date_time}</td>
                    <td class="flex flex-row">
                      <img
                        class=" w-8 h-8 rounded-full mr-5"
                        src={icons[item.curreny_from_asset_id]?.url}
                        alt="icon"
                      />
                      {item.currency_from}
                    </td>
                    <td>{item.amount_1}</td>
                    <td class="flex flex-row">
                      <img
                        class=" w-8 h-8 rounded-full mr-5"
                        src={icons[item.curreny_to_asset_id]?.url}
                        alt="icon"
                      />
                      {item.currency_to}
                    </td>
                    <td>{item.amount_2}</td>
                    <td class={typeClass}>{item.type}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <Pagination
            currentPage={currentPage}
            totalCount={historyCollection.length}
            pageSize={limitItems}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </Fragment>
  );
}

export { Toolbar };
