import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/components/Header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    let gastoTotal = 0;
    expenses
      .map((ele) => {
        gastoTotal += ele.exchangeRates[ele.currency].ask * Number(ele.value);
        return gastoTotal;
      });
    return (
      <div className="header d-flex text-center">
        <span data-testid="email-field">
          Carteira de:
          {' '}
          { email }
        </span>
        <br />
        <span data-testid="total-field">
          Depesa Total: R$
          { gastoTotal.toFixed(2) }
        </span>
        <br />

        <span data-testid="header-currency-field">
          Câmbio:
          {' '}
          BRL
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = ({
  email: PropTypes.any,
}).isRequired;

export default connect(mapStateToProps)(Header);
