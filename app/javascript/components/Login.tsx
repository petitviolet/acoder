import * as React from "react"
import useForm from "./useForm";

type LoginState = {
    readonly email: string,
    readonly password: string,
    readonly passwordConfirmation: string,
}

const Login = (onSubmit) => {
    const { values, handleChange, handleSubmit } = useForm<LoginState>(onSubmit, {
        email: '',
        password: '',
        passwordConfirmation: '',
    });

    return <form action={"javascript:void(0)"} onSubmit={handleSubmit}>
        <label>Email:
            <input
                key={'email'}
                name={'email'}
                type={'email'}
                value={values.email}
                onChange={handleChange}
            />
        </label>
        <label>Password:
            <input
                key={'password'}
                name={'password'}
                type={'password'}
                value={values.password}
                onChange={handleChange}
            />
        </label>
        <label>Password(again):
            <input
                key={'passwordConfirmation'}
                name={'passwordConfirmation'}
                type={'passwordConfirmation'}
                value={values.passwordConfirmation}
                onChange={handleChange}
            />
        </label>
        <button type="submit">送信</button>

    </form>
};


export default Login;
