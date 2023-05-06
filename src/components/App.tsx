import { Dispatch, createContext, useReducer } from 'react';

import Button from './Button';
import Select from './Select';

interface FormData {
  tower: 'A' | 'B';
  store: number;
  num: number;
  dateTime: Date;
  comments: string;
}
export type FormDataAction =
  | { type: 'TOWER'; payload: 'A' | 'B' }
  | { type: 'STORE'; payload: number }
  | { type: 'NUM'; payload: number }
  | { type: 'DATE'; payload: number }
  | { type: 'TIME'; payload: number }
  | { type: 'COMMENTS'; payload: string }
  | { type: 'RESET' };
const initState: FormData = {
  tower: 'A',
  store: 3,
  num: 0,
  dateTime: new Date(),
  comments: '',
};

export const FormContext = createContext<{
  data: FormData;
  dispatch: Dispatch<FormDataAction> | null;
}>({
  data: initState,
  dispatch: null,
});
FormContext.displayName = 'FormContext';

const Form = () => {
  const reducer = (state: FormData, action: FormDataAction): FormData => {
    switch (action.type) {
      case 'TOWER':
        return {
          ...state,
          tower: action.payload,
        };
      case 'STORE':
        return {
          ...state,
          store: action.payload,
        };
      case 'NUM':
        return {
          ...state,
          num: action.payload,
        };
      case 'DATE':
        return {
          ...state,
        };
      case 'TIME':
        return {
          ...state,
        };
      case 'COMMENTS':
        return {
          ...state,
        };
      case 'RESET':
        return initState;
      default:
        return state;
    }
  };
  const [formData, dispatch] = useReducer(reducer, initState);

  return (
    <FormContext.Provider value={{ data: formData, dispatch }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(formData);
        }}
      >
        <Select options={['A', 'B']} name="TOWER" />

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button type="reset" />
          <Button type="submit" />
        </div>
      </form>
    </FormContext.Provider>
  );
};

function App() {
  return (
    <>
      <h1 className="text-accent my-6 text-center text-8xl">booking</h1>
      <p className="text-center text-3xl">Бронирование переговорной</p>

      <Form />
    </>
  );
}

export default App;
