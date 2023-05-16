export const SAVE_EMAIL = 'SAVE_EMAIL';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';

export const user = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const getCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies,
});

export function fetchCurrencies() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currencies) => dispatch(getCurrencies(currencies)));
}
