export const SAVE_EMAIL = 'SAVE_EMAIL';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const SAVE_RATE = 'SAVE_RATE';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const user = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const getCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies,
});

// Essa função é uma action creator thunk que é usada no WalletForm para renderizar as options com cada moeda.
export function fetchCurrencies() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currencies) => dispatch(getCurrencies(currencies)));
}

export const saveExchangeRate = (currencies) => ({
  type: SAVE_RATE,
  exchangeRates: currencies,

});

export const saveExpenses = (stateLocal, id, exchangeRates) => ({
  type: SAVE_EXPENSES,
  payload:
    {
      ...stateLocal,
      id,
      exchangeRates,
    },
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});
