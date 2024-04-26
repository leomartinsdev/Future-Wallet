import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import validator from 'validator';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { user } from '../redux/actions';
import '../styles/pages/Login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    loginVerifications: true,
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.loginVerifications);
  };

  loginVerifications = () => {
    const { password, email } = this.state;
    const minPassChars = 6;
    const validPassword = password.length >= minPassChars;
    const validEmail = validator.isEmail(email);

    this.setState({
      loginVerifications: !(validPassword && validEmail),
    });
  };

  handleEnterBtn = (email) => {
    const { history, dispatch } = this.props;
    dispatch(user(email));
    history.push('/carteira');
  };

  render() {
    const { loginVerifications, email, password } = this.state;
    return (
      <div className="container d-flex main-container">
        <div className="glass-effect">
          <div className="form-div">
            <h2>Login</h2>
            <Form>
              <Form.Label htmlFor="email">Endereço de e-mail</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="email@email.com"
                data-testid="email-input"
                value={ email }
                onChange={ this.onInputChange }
              />

              <br />
              <Form.Label htmlFor="password">Senha</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Pelo menos 6 dígitos"
                data-testid="password-input"
                value={ password }
                onChange={ this.onInputChange }
              />
              <br />
            </Form>
            <Button
              className="btn-outline-primary"
              size="lg"
              style={ { backgroundColor: 'white', color: 'rgb(255, 93, 111)' } }
              type="button"
              disabled={ loginVerifications }
              onClick={ () => this.handleEnterBtn(email) }
            >
              Entrar
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = ({
  dispatch: PropTypes.any,
}).isRequired;

export default connect()(Login);
