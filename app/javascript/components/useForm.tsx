import * as React from "react";

export interface Validator<State extends {}> {
    runAll(state: State): Errors
}

type Errors = Map<string, string>;

export const useForm = <State extends {}>(onSubmit, initial: State, validator: Validator<State>) => {
    const [state, setState] = React.useState<State>(initial);
    const [errors, setErrors] = React.useState<Errors>(new Map());
    const [disable, setDisable] = React.useState<boolean>(true);
    const [isEditing, setIsEditing] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (isEditing) {
            setDisable(false);
        }
    }, [isEditing, errors]);

    const isValid: () => boolean = React.useCallback(() => {
        const _errors = Array.from(validator.runAll(state)).reduce<Map<string, string>>((map, [key, error]) => {
                if (error) { // kill undefined or null
                    return map.set(key, error);
                } else {
                    return map;
                }
            }, new Map() // initial value
        );
        setErrors(_errors);
        console.dir(_errors);
        return _errors.size == 0;
    }, [state, errors]);

    const handleSubmit = React.useCallback((event) => {
        if (event) event.preventDefault();

        if (!disable && isValid()) {
            onSubmit(state);
        } else {
            console.log(`submit is disabled. error = ${errors}`)
        }
    }, [state, errors, disable]);

    const handleChange = React.useCallback((event) => {
        setIsEditing(true);
        const name: string = event.target.name;
        const value: string = event.target.value;
        setState(prevState => {
            const newState = {...prevState, [name]: value};

            return newState;
        });

    }, [validator, state]);

    return {
        state,
        errors,
        disable,
        handleChange,
        handleSubmit,
    };
};

