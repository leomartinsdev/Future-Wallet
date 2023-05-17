import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, saveExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  // eventHandlerGenérico
  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  // Reseta todos os estados locais
  stateReset = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  // Primeiro, chama a API para pegar as informações da moeda. Depois, verifica os valores do objeto para compara-lo com a moeda atualmente usada.
  // Por último, retorna só as informações da moeda selecionada.
  getExchangeRate = async () => {
    const getCurrenciesData = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await getCurrenciesData.json();
    const allCurrenciesData = await json;
    return allCurrenciesData;
  };

  // eventHandler do botão de Adicionar Despesa.
  handleAddButton = async () => {
    // será feito tudo que deve ser feito quando eu clickar no botão.
    const { dispatch, expenses } = this.props;
    const allCurrenciesData = await this.getExchangeRate();
    dispatch(saveExpenses(this.state, expenses.length, allCurrenciesData));
    this.stateReset();
  };

  render() {
    const { value, description, currency, method,
      tag } = this.state;
    const { currencyList } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value">
            <input
              name="value"
              type="text"
              placeholder="Valor da Despesa"
              data-testid="value-input"
              value={ value }
              onChange={ this.onInputChange }
            />
          </label>

          <label htmlFor="description">
            Descrição da Despesa:
            <input
              name="description"
              type="text"
              placeholder="Descrição da despesa"
              data-testid="description-input"
              value={ description }
              onChange={ this.onInputChange }
            />
          </label>

          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.onInputChange }
            >
              {currencyList.map((coin, index) => <option key={ index }>{coin}</option>)}
            </select>
          </label>

          <label htmlFor="method">
            Método de Pagamento:
            <select
              name="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.onInputChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Categoria da Despesa:
            <select
              name="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.onInputChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <button
            type="button"
            onClick={ this.handleAddButton }
          >
            Adicionar Despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyList: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = ({
  dispatch: PropTypes.any,
}).isRequired;

export default connect(mapStateToProps)(WalletForm);
