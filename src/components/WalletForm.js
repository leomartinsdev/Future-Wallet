import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    currencyInput: 'USD',
    metodoPgto: 'Dinheiro',
    tagDespesa: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { currencyInput, metodoPgto, tagDespesa } = this.state;
    const { currency } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="valorDespesa">
            <input
              name="valorDespesa"
              type="number"
              placeholder="Valor da Despesa"
              data-testid="value-input"
            />
          </label>

          <label htmlFor="descricaoDespesa">
            Descrição da Despesa:
            <input
              name="descricaoDespesa"
              type="text"
              placeholder="Descrição da despesa"
              data-testid="description-input"
            />
          </label>

          <label htmlFor="currencyInput">
            Moeda:
            <select
              name="currencyInput"
              data-testid="currency-input"
              value={ currencyInput }
              onChange={ this.onInputChange }
            >
              {currency.map((coin, index) => <option key={ index }>{coin}</option>)}
            </select>
          </label>

          <label htmlFor="metodoPgto">
            Método de Pagamento:
            <select
              name="metodoPgto"
              data-testid="method-input"
              value={ metodoPgto }
              onChange={ this.onInputChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de Crédito">Cartão de crédito</option>
              <option value="Cartão de Débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tagDespesa">
            Categoria da Despesa:
            <select
              name="tagDespesa"
              data-testid="tag-input"
              value={ tagDespesa }
              onChange={ this.onInputChange }
            >
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.wallet.currencies,
});

WalletForm.propTypes = ({
  dispatch: PropTypes.any,
}).isRequired;

export default connect(mapStateToProps)(WalletForm);
