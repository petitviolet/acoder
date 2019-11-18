import * as React from 'react';

export interface Validator<State extends {}> {
  runAll(state: State): Errors;
}

export type Errors = Map<string, string>;

export const useForm = <State extends {}>(onSubmit, initial: State, validator: Validator<State>) => {
  const [state, setState] = React.useState<State>(initial);
  const [errors, setErrors] = React.useState<Errors>(new Map());
  const [submitEnabled, submitEnable] = React.useState<boolean>(false);

  const isValid: () => boolean = React.useCallback(() => {
    const _errors = Array.from(validator.runAll(state)).reduce<Map<string, string>>(
      (map, [key, error]) => {
        if (error) {
          // kill undefined or null
          return map.set(key, error);
        } else {
          return map;
        }
      },
      new Map(), // initial value
    );
    setErrors(_errors);
    console.dir(_errors);
    return _errors.size == 0;
  }, [state]);

  const handleSubmit = React.useCallback(
    event => {
      if (event) event.preventDefault();

      if (submitEnabled && isValid()) {
        onSubmit(state);
      } else {
        console.log(`submit is disabled. error = ${errors}`);
      }
    },
    [state],
  );

  const handleChange = React.useCallback(
    (event: any) => {
      const name: string = event.target.name;
      const value: string = event.target.value;
      if (!submitEnabled && value.length > 0) {
        submitEnable(true);
      }
      setState(prevState => {
        const newState = { ...prevState, [name]: value };
        console.log(`newState: ${JSON.stringify(newState)}`);

        return newState;
      });
    },
    [state],
  );

  return {
    state,
    errors,
    disabled: !submitEnabled,
    handleChange,
    handleSubmit,
  };
};
