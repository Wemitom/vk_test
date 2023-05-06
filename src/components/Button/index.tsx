import useForm from '../../utils/hooks/useForm';

/**
 * Кнопка для сброса или отправки данных. Может использоваться только в контексте FormContext.
 * @param type - тип кнопки
 * @example
 * <FormContext.Provider>
 * ...
 *      <Button type='submit' />
 * ...
 * </FormContext.Provider>
 */
const Button = ({ type }: { type: 'submit' | 'reset' }) => {
  const { dispatch } = useForm();

  return (
    <button
      type={type}
      onClick={
        type === 'reset' ? () => dispatch!({ type: 'RESET' }) : undefined
      }
      className="bg-accent text-md hover:bg-accent/90 focus:ring-accent/70 w-4/12 rounded-md px-5 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm"
    >
      {type === 'reset' ? 'Сбросить' : 'Забронировать'}
    </button>
  );
};

export default Button;
