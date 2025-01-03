import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import { deleteExpense } from '../redux/actions';
import '../styles/components/Table.css';

class ExpensesTable extends Component {
  render() {
    const { expenses, dispatch } = this.props;
    return (
      <div className="scrollable-table">
        <Table responsive="sm">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                <td>
                  {(
                    Number(expense.value) * expense.exchangeRates[expense.currency].ask
                  ).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-custom"
                    data-testid="delete-btn"
                    onClick={() => dispatch(deleteExpense(expense.id))}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpensesTable.propTypes = {
  expenses: PropTypes.any,
}.isRequired;

export default connect(mapStateToProps)(ExpensesTable);
