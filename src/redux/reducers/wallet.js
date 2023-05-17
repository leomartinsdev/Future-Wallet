// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { RECEIVE_CURRENCIES, SAVE_EXPENSES } from '../actions/index';

const INITIAL_STATE2 = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE2, action) => {
  switch (action.type) {
  case RECEIVE_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.currencies).filter((ele) => ele !== 'USDT'),
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
};

export default wallet;
