import { Dispatch, createContext, useReducer } from 'react';

import Button from './Button';
import Select from './Select';

import DatePicker from 'react-datepicker';

import { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ru', ru);

interface FormData {
  tower: 'A' | 'B';
  store: number;
  num: number;
  date: Date;
  timeStart: Date;
  timeEnd: Date;
  comments: string;
}
export type FormDataAction =
  | { type: 'TOWER'; payload: 'A' | 'B' }
  | { type: 'STORE'; payload: number }
  | { type: 'NUM'; payload: number }
  | { type: 'DATE'; payload: Date }
  | { type: 'TIME_START'; payload: Date }
  | { type: 'TIME_END'; payload: Date }
  | { type: 'COMMENTS'; payload: string }
  | { type: 'RESET' };
const initState: FormData = {
  tower: 'A',
  store: 3,
  num: 0,
  date: new Date(),
  timeStart: new Date(),
  timeEnd: new Date(),
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
          date: action.payload,
        };
      case 'TIME_START':
        return {
          ...state,
          timeStart: action.payload,
        };
      case 'TIME_END':
        return {
          ...state,
          timeEnd: action.payload,
        };
      case 'COMMENTS':
        return {
          ...state,
          comments: action.payload,
        };
      case 'RESET':
        return initState;
      default:
        return state;
    }
  };
  const [formData, dispatch] = useReducer(reducer, initState);

  const maxTime = new Date();
  maxTime.setHours(18, 30);

  return (
    <FormContext.Provider value={{ data: formData, dispatch }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(JSON.stringify(formData));
        }}
        className="mx-auto my-6 flex w-10/12 flex-col items-center gap-6 sm:w-5/12"
      >
        <div className="flex w-full gap-3">
          <div className="flex w-full flex-col">
            <label htmlFor="tower">Башня</label>
            <Select options={['A', 'B']} name="TOWER" />
          </div>

          <div className="flex w-full flex-col">
            <label htmlFor="store">Этаж</label>
            <Select
              options={Array.from({ length: 25 }, (_, i) => `${i + 3}`)}
              name="STORE"
            />
          </div>
        </div>

        <div className="flex w-full flex-col">
          <label htmlFor="tower">№ переговорной</label>
          <Select
            options={Array.from(
              { length: 10 },
              (_, i) => `${i + 1 + (formData.store - 3) * 10}`
            )}
            name="NUM"
          />
        </div>

        <div className="flex w-full flex-col">
          <label htmlFor="date">Дата</label>
          <DatePicker
            className="w-full rounded-lg border border-[#4B5E51] bg-[#09090A] px-6 py-2"
            name="date"
            selected={formData.date}
            onChange={(date) =>
              dispatch({ type: 'DATE', payload: date ?? new Date() })
            }
            locale="ru"
            dateFormat={'d MMMM, yyyy'}
          />
        </div>

        <div className="flex w-full gap-3">
          <div className="flex w-full flex-col">
            <label htmlFor="timeStart">Время начала</label>
            <DatePicker
              className="w-full rounded-lg border border-[#4B5E51] bg-[#09090A] px-6 py-2"
              selected={formData.timeStart}
              onChange={(date) =>
                dispatch({ type: 'TIME_START', payload: date ?? new Date() })
              }
              name="timeStart"
              locale="ru"
              dateFormat="HH:mm"
              minTime={new Date()}
              maxTime={maxTime}
              timeIntervals={5}
              timeCaption="Время"
              showTimeSelect
              showTimeSelectOnly
            />
          </div>

          <div className="flex w-full flex-col">
            <div className="flex w-full flex-col">
              <label htmlFor="timeEnd">Время конца</label>
              <DatePicker
                className="w-full rounded-lg border border-[#4B5E51] bg-[#09090A] px-6 py-2"
                selected={formData.timeEnd}
                onChange={(date) =>
                  dispatch({ type: 'TIME_END', payload: date ?? new Date() })
                }
                name="timeEnd"
                locale="ru"
                dateFormat="HH:mm"
                minTime={formData.timeStart}
                maxTime={maxTime}
                timeIntervals={5}
                timeCaption="Время"
                showTimeSelect
                showTimeSelectOnly
              />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col">
          <label htmlFor="comments">Комментарии</label>
          <textarea
            className="rounded-lg border border-[#4B5E51] bg-[#09090A] px-6 py-2"
            name="comments"
            onChange={(e) =>
              dispatch({ type: 'COMMENTS', payload: e.target.value })
            }
          />
        </div>

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
