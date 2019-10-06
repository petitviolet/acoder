import * as React from 'react';
import { Redirect } from 'react-router-dom';
import style from 'styled-components';
import { useForm, Validator, Errors } from './useForm';
import * as Flash from './Flash';
import * as Auth from './Auth';
import UserGateway from 'gateways/UserGateway';
import * as bs from 'react-bootstrap';

type LoginState = {
  readonly email: string;
  readonly password: string;
  readonly passwordConfirmation: string;
};

const validator: Validator<LoginState> = new (class implements Validator<LoginState> {
  emailValidator(email: string): string | null {
    if (email.length == 0) {
      return 'Email is empty.';
    } else if (!email.match(/.+@.+\..+/)) {
      return 'Email is not valid format';
    }
  }

  passwordValidator(password: string): string | null {
    if (password.length == 0) {
      return 'Password is empty.';
    } else if (password.length < 8) {
      return 'Password min length is 8';
    } else if (password.length > 100) {
      return 'Password max length is 100';
    }
  }

  passwordConfirmationValidator(password: string, passwordConfirmation: string): string | null {
    if (password != passwordConfirmation) {
      return 'PasswordConfirmation is not match';
    }
  }

  runAll(state: LoginState): Map<string, string> {
    return new Map([
      ['email', this.emailValidator(state.email)],
      ['password', this.passwordValidator(state.password)],
      ['passwordConfirmation', this.passwordConfirmationValidator(state.password, state.passwordConfirmation)],
    ]);
  }
})();

const moveToAfterLogin = (returnUrl: string | null = null) => {
  const url = returnUrl || '/me';
  console.debug(`[AfterLogin]move to ${url}`);
  return <Redirect to={url} />;
};

const Login = () => {
  const { authState, authDispatch, loggedIn } = React.useContext(Auth.Context);

  if (loggedIn) {
    return moveToAfterLogin();
  }

  const onSubmit = values => {
    console.debug(`authState onSubmit: ${JSON.stringify(authState)}`);
    if (values.email && values.password && values.password == values.passwordConfirmation) {
      UserGateway()
        .login(values.email, values.password)
        .then(token => {
          Flash.success('Login successfully');
          console.debug(`authState onLogin: ${JSON.stringify(authState)}`);
          authDispatch({
            type: Auth.ActionType.SetToken,
            token: token,
          });
          return token;
        })
        .then(token => {
          return UserGateway(token).currentUser(token);
        })
        .then(user => {
          console.debug(`authState onLogin: ${JSON.stringify(authState)}`);
          authDispatch({
            type: Auth.ActionType.SetCurrentUser,
            user: user,
          });
        })
        .catch(err => {
          Flash.error(`Failed to login. message = ${err}`);
        });
    } else {
      Flash.error('Invalid inputs');
    }
  };

  const { state, errors, disable, handleChange, handleSubmit } = useForm<LoginState>(
    onSubmit,
    {
      email: "",
      password: "",
      passwordConfirmation: ""
    },
    validator,
  );

  const u = JSON.stringify(authState);
  return (
    <form onSubmit={handleSubmit}>
      <div>{u}</div>
      <Inputs
        title={'Email'}
        name={'email'}
        type={'email'}
        value={state.email}
        placeholder={''}
        errors={errors}
        onChange={handleChange}
      />
      <Inputs
        title={'Password'}
        name={'password'}
        type={'password'}
        value={state.password}
        placeholder={''}
        errors={errors}
        onChange={handleChange}
      />
      <Inputs
        title={'Password(again)'}
        name={'passwordConfirmation'}
        type={'password'}
        value={state.passwordConfirmation}
        placeholder={''}
        errors={errors}
        onChange={handleChange}
      />
      <bs.Button type="submit" disabled={disable}>
        送信
      </bs.Button>
    </form>
  );
};

export default Login;

const Inputs = (props: {
  title: string;
  name: string;
  type: string;
  value: string;
  placeholder: string;
  errors: Errors;
  onChange: (event: any) => void;
}) => {
  const { title, name, type, value, placeholder, errors, onChange } = props;
  return (
    <bs.InputGroup>
      <label htmlFor={name}>
        <bs.InputGroup.Prepend>
          <bs.InputGroup.Text>{title}</bs.InputGroup.Text>
        </bs.InputGroup.Prepend>
      </label>
      <bs.FormControl
        id={name}
        placeholder={placeholder}
        name={name}
        type={type}
        aria-label={name}
        aria-describedby={name}
        onChange={onChange}
        value={value}
      />
      <div>{errors.get(name)}</div>
    </bs.InputGroup>
  );
};

const Label = style.label`
    div {
        color: red;
    }
    margin-bottom: 10px;
`;

const Input = style(bs.InputGroup)`
    margin: 5px;
`;
