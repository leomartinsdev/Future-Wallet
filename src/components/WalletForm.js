import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    return (
      <div>
        <form>
          <label htmlFor="valorDespesa">
            <input
              name="valorDespesa"
              type="number"
              placeholder="Valor da Despesa"
              data-testid="value-input"
              // value={}
              // onChange={}
            />
          </label>

          <label htmlFor="descricaoDespesa">
            Descrição da Despesa:
            <input
              name="descricaoDespesa"
              type="text"
              placeholder="Descrição da despesa"
              data-testid="description-input"
              // value={}
              // onChange={}
            />
          </label>

          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              data-testid="currency-input"
            >
              {/* aqui vem o map do retorno da API. Cada elemento gera um option. */}
            </select>
          </label>

          <label htmlFor="metodoPgto">
            Método de Pagamento:
            <select
              name="metodoPgto"
              data-testid="method-input"
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

WalletForm.propTypes = ({
  dispatch: PropTypes.any,
}).isRequired;

export default connect()(WalletForm);
