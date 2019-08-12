import * as React from "react"

type LoginState = {
    email: string,
    password: string,
    passwordConfirmation: string,
}

const Login = () => {
    const [state, updateState] = React.useState<LoginState>({
        email: '',
        password: '',
        passwordConfirmation: '',
    });
    const onChangeInputText = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            event.persist();
            updateState(prev => ({
                ...prev,
                [event.target.name]: event.target.value
            }))
        },
        []
    );

    return <div>
        <div id={'email'}>
            Email: {state.email}
        </div>
        <div id={'password'}>
            Password: {state.password}
        </div>
        <div id={'password_confirmation'}>
            Password Confirmation: {state.passwordConfirmation}
        </div>
    </div>
};

export default Login;
