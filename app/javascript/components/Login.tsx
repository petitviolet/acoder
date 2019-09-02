import * as React from "react"
import style from 'styled-components';
import {useForm, Validator} from "./useForm";
import axios from "axios";
import * as Flash from "./Flash";
import * as Auth from "./Auth";
import Token from "../models/Token";

type LoginState = {
    readonly email: string,
    readonly password: string,
    readonly passwordConfirmation: string,
}

const Login = () => {
    const {state: authState, dispatch: authDispatch} = React.useContext(Auth.Context);

    const onSubmit = (values) => {
        if (values.email && values.password && values.password == values.passwordConfirmation) {
            axios.post('/login', {
                email: values.email,
                password: values.password,
            }).then((res) => {
                console.dir('Login response', res);
                const token: Token = JSON.parse(res.data);
                Flash.success("Login successfully");
                authDispatch({
                    type: Auth.ActionType.SetToken,
                    token,
                });
            }).catch((err) => {
                Flash.error(`Failed to login. message = ${err}`);
            })
        } else {
            Flash.error("Invalid inputs");
        }
    };

    const validator: Validator<LoginState> = new class implements Validator<LoginState> {
        emailValidator(email: string): string | null {
            if (email.length == 0) {
                return "Email is empty.";
            } else if (!email.match(/.+@.+\..+/)) {
                return "Email is not valid format";
            }
        }

        passwordValidator(password: string): string | null {
            if (password.length == 0) {
                return "Password is empty.";
            } else if (password.length < 8) {
                return "Password min length is 8";
            } else if (password.length > 100) {
                return "Password max length is 100";
            }
        }

        passwordConfirmationValidator(password: string, passwordConfirmation: string): string | null {
            if (password != passwordConfirmation) {
                return "PasswordConfirmation is not match";
            }
        }

        runAll(state: LoginState): Map<string, string> {
            return new Map([
                ['email', this.emailValidator(state.email)],
                ['password', this.passwordValidator(state.password)],
                ['passwordConfirmation', this.passwordConfirmationValidator(state.password, state.passwordConfirmation)],
            ]);
        }
    };

    const {state, errors, disable, handleChange, handleSubmit} = useForm<LoginState>(onSubmit, {
        email: '',
        password: '',
        passwordConfirmation: '',
    }, validator);


    return <form onSubmit={handleSubmit}>
        <Inputs>Email:
            <input
                key={'email'}
                name={'email'}
                type={'email'}
                value={state.email}
                onChange={handleChange}
            />
            <div>{errors.get('email')}</div>
        </Inputs>
        <Inputs>Password:
            <input
                key={'password'}
                name={'password'}
                type={'password'}
                value={state.password}
                onChange={handleChange}
            />
            <div>{errors.get('password')}</div>
        </Inputs>
        <Inputs>Password(again):
            <input
                key={'passwordConfirmation'}
                name={'passwordConfirmation'}
                type={'password'}
                value={state.passwordConfirmation}
                onChange={handleChange}
            />
            <div>{errors.get('passwordConfirmation')}</div>
        </Inputs>
        <button type="submit" disabled={disable}>送信</button>

    </form>
};

export default Login;

const Inputs = style.label`
    div {
        color: red;
    }
    margin-bottom: 10px;
`;
