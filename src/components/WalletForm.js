/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { fetchCurrencies, saveExpenses } from '../redux/actions';
import '../styles/components/WalletForm.css';

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
    const { value, description, currency, method, tag } = this.state;
    const { currencyList } = this.props;
    return (
      <div className="wallet-form d-flex">
        <Form className="text-center">
          <Row className="mb-3">
            <Form.Group className="md-3" as={Col}>
              <Form.Label htmlFor="value">
                Valor da Despesa:{' '}
                <Form.Control
                  name="value"
                  type="text"
                  placeholder="Valor da Despesa"
                  data-testid="value-input"
                  value={value}
                  onChange={this.onInputChange}
                />
              </Form.Label>
            </Form.Group>

            <Form.Group className="md-3" as={Col}>
              <Form.Label htmlFor="description">
                Descrição da Despesa:{' '}
                <Form.Control
                  name="description"
                  type="text"
                  placeholder="Descrição da despesa"
                  data-testid="description-input"
                  value={description}
                  onChange={this.onInputChange}
                />
              </Form.Label>
            </Form.Group>

            <Form.Group className="md-3" as={Col}>
              <Form.Label htmlFor="currency">
                Moeda:{' '}
                <Form.Select
                  name="currency"
                  data-testid="currency-input"
                  value={currency}
                  onChange={this.onInputChange}
                >
                  {currencyList.map((coin, index) => (
                    <option key={index}>{coin}</option>
                  ))}
                </Form.Select>
              </Form.Label>
            </Form.Group>

            <Form.Group className="md-3" as={Col}>
              <Form.Label htmlFor="method">
                Método de Pagamento:{' '}
                <Form.Select
                  name="method"
                  data-testid="method-input"
                  value={method}
                  onChange={this.onInputChange}
                >
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cartão de crédito">Cartão de crédito</option>
                  <option value="Cartão de débito">Cartão de débito</option>
                </Form.Select>
              </Form.Label>
            </Form.Group>

            <Form.Group className="md-3" as={Col}>
              <Form.Label htmlFor="tag">
                Categoria da Despesa:{' '}
                <Form.Select
                  name="tag"
                  data-testid="tag-input"
                  value={tag}
                  onChange={this.onInputChange}
                >
                  <option value="Alimentação">Alimentação</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Trabalho">Trabalho</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Saúde">Saúde</option>
                </Form.Select>
              </Form.Label>
            </Form.Group>
          </Row>
          <Button
            type="button"
            style={{
              backgroundColor: 'white',
              color: 'rgb(255, 93, 111)',
              fontWeight: 'bold',
            }}
            onClick={this.handleAddButton}
          >
            Adicionar Despesa
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyList: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.any,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
