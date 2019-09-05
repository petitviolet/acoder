import * as React from "react"
import {Redirect} from 'react-router-dom';
import style from 'styled-components';
import {useForm, Validator} from "./useForm";
import * as Flash from "./Flash";
import * as Auth from "./Auth";
import UserGateway from "gateways/UserGateway";

type LoginState = {
    readonly email: string,
    readonly password: string,
    readonly passwordConfirmation: string,
}

const moveToAfterLogin = (returnUrl: string | null = null) => {
    console.debug(`[AfterLogin]move to ${returnUrl || '/me'}`);
    if (returnUrl) {
        return (
            <Redirect to={returnUrl}/>
        )
    } else {
        return (
            <Redirect to={"/me"}/>
        );
    }
};

const Login = () => {
    const {authState, authDispatch, loggedIn} = React.useContext(Auth.Context);

    if (loggedIn) {
        return moveToAfterLogin();
    }

    const onSubmit = (values) => {
        console.debug(`authState onSubmit: ${JSON.stringify(authState)}`);
        if (values.email && values.password && values.password == values.passwordConfirmation) {
            UserGateway()
                .login(values.email, values.password)
                .then((token) => {
                    Flash.success("Login successfully");
                    console.debug(`authState onLogin: ${JSON.stringify(authState)}`);
                    authDispatch({
                        type: Auth.ActionType.SetToken,
                        token: token,
                    });
                    return token;
                }).then((token) => {
                    return UserGateway(token).currentUser(token);
                }).then((user) => {
                    console.debug(`authState onLogin: ${JSON.stringify(authState)}`);
                    authDispatch({
                        type: Auth.ActionType.SetCurrentUser,
                        user: user,
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

    const u = JSON.stringify(authState);
    return <form onSubmit={handleSubmit}>
        <div>{u}</div>
        <Inputs>Email:
            <Input
                key={'email'}
                name={'email'}
                type={'email'}
                value={state.email}
                onChange={handleChange}
            />
            <div>{errors.get('email')}</div>
        </Inputs>
        <Inputs>Password:
            <Input
                key={'password'}
                name={'password'}
                type={'password'}
                value={state.password}
                onChange={handleChange}
            />
            <div>{errors.get('password')}</div>
        </Inputs>
        <Inputs>Password(again):
            <Input
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

const Input = style.input`
    margin: 5px;
`
