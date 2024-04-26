import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import ExpensesTable from '../components/Table';
import '../styles/pages/Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet-page d-flex flex-column align">
        <Header />
        <WalletForm />
        <ExpensesTable />
      </div>
    );
  }
}

export default connect()(Wallet);
