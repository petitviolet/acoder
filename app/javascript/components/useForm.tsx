import * as React from "react";

const useForm = <State extends {}>(onSubmit, initial: State) => {
    const [values, setValues] = React.useState<State>(initial);

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        onSubmit();
    };

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({...values, [event.target.name]: event.target.value}));
    };

    return {
        handleChange,
        handleSubmit,
        values,
    };
};

export default useForm;
