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

    return <form>
        <label>Email:
            <input
                key={'email'}
                name={'email'}
                type={'email'}
                value={state['email']}
                onChange={onChangeInputText}
            />
        </label>
        <label>Password:
            <input
                key={'password'}
                name={'password'}
                type={'password'}
                value={state['password']}
                onChange={onChangeInputText}
            />
        </label>
        <label>Password(again):
            <input
                key={'passwordConfirmation'}
                name={'passwordConfirmation'}
                type={'passwordConfirmation'}
                value={state['passwordConfirmation']}
                onChange={onChangeInputText}
            />
        </label>
    </form>
};



export default Login;
