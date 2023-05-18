import React from 'react';
import validator from 'validator';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { user } from '../redux/actions';

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
      <div>
        <span>Login</span>
        <section>
          <label htmlFor="email">
            <input
              name="email"
              type="email"
              placeholder="email@email.com"
              data-testid="email-input"
              value={ email }
              onChange={ this.onInputChange }
            />
          </label>

          <label htmlFor="password">
            <input
              name="password"
              type="password"
              placeholder="Senha"
              data-testid="password-input"
              value={ password }
              onChange={ this.onInputChange }
            />
          </label>

          <button
            type="button"
            disabled={ loginVerifications }
            onClick={ () => this.handleEnterBtn(email) }
          >
            Entrar
          </button>
        </section>
      </div>
    );
  }
}

Login.propTypes = ({
  dispatch: PropTypes.any,
}).isRequired;

export default connect()(Login);
