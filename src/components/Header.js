import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <span data-testid="email-field">
          User:
          {' '}
          { email }
        </span>
        <br />
        <span data-testid="total-field">
          Despesa Total:
          {' '}
          { 0 }
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
});

Header.propTypes = ({
  email: PropTypes.any,
}).isRequired;

export default connect(mapStateToProps)(Header);
