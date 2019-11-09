import * as React from 'react';
import {useHistory} from 'react-router-dom';

import style from 'styled-components';
import {Errors, useForm, Validator} from './useForm';
import * as Flash from './Flash';
import UserGateway from '../gateways/UserGateway';
import * as bs from 'react-bootstrap';


type SignUpState = {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly passwordConfirmation: string;
};

const validator: Validator<SignUpState> = new (class implements Validator<SignUpState> {
  nameValidator(name: string): string | null {
    if (name.length == 0) {
      return 'Name is empty.';
    }
  }

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

  runAll(state: SignUpState): Map<string, string> {
    return new Map([
      ['name', this.nameValidator(state.name)],
      ['email', this.emailValidator(state.email)],
      ['password', this.passwordValidator(state.password)],
      ['passwordConfirmation', this.passwordConfirmationValidator(state.password, state.passwordConfirmation)],
    ]);
  }
})();

const SignUp = () => {
  const [signUpSucceeded, setSignUpSucceeded] = React.useState<boolean>(false);

  const moveToAfterSignUp = () => {
    const url = '/login';
    console.debug(`[AfterSignUp]move to ${url}`);
    return useHistory().push(url);
  };

  React.useEffect(() => {
      console.log(`signUpSucceeded? ${signUpSucceeded}`);
    if (!signUpSucceeded) {
      return;
    }
    const timer = setTimeout(moveToAfterSignUp, 1000);
    return () => clearTimeout(timer);
  }, [signUpSucceeded]);

  const onSubmit = values => {
    if (values.name && values.email && values.password && values.password == values.passwordConfirmation) {
      UserGateway()
        .signUp(values.name, values.email, values.password)
        .then(response => {
          Flash.success('Sign up succeeded. Please login.');
          setSignUpSucceeded(true);
        })
        .catch(err => {
          Flash.error(`Failed to sign up. message = ${err}`);
        });
    } else {
      Flash.error('Invalid inputs');
    }
  };

  const { state, errors, disable, handleChange, handleSubmit } = useForm<SignUpState>(
    onSubmit,
    {
      name: 'alice',
      email: 'alice@example.com',
      password: 'password',
      passwordConfirmation: 'password',
    },
    validator,
  );

  return (
    <bs.Container>
      <bs.Row>
        <bs.Col md={{ span: 6, offset: 3 }}>
          <form onSubmit={handleSubmit}>
            <Inputs
                title={'Name'}
                name={'name'}
                type={'text'}
                value={state.name}
                placeholder={''}
                errors={errors}
                onChange={handleChange}
            />
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
        </bs.Col>
      </bs.Row>
    </bs.Container>
  );
};

export default SignUp;

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
