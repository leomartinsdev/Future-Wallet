import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './App.css';

function App() {
  return (
    <main>
      <h1>Future Wallet</h1>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/carteira" component={Wallet} />
      </Switch>
    </main>
  );
}

export default App;
