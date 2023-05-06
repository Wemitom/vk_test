import useForm from '../../utils/hooks/useForm';
import { FormDataAction } from '../App';

/**
 * Компонент отображающий выпадающий список. Может использоваться только в контексте FormContext.
 * @param options - доступные варианты. Принимает массив из строк;
 * @param name - имя поля, которое будет изменять список;
 * @example
 * <FormContext.Provider>
 * ...
 *     <Select options={['A', 'B']} name="TOWER" />
 * ...
 * </FormContext.Provider>
 */
const Select = ({
  options,
  name,
}: {
  options: string[];
  name: 'TOWER' | 'STORE' | 'NUM';
}) => {
  const { dispatch } = useForm();

  function getValue(
    name: 'TOWER' | 'STORE' | 'NUM',
    // eslint-disable-next-line prettier/prettier
    value: string
  ): FormDataAction {
    switch (name) {
      case 'TOWER':
        return {
          type: name,
          payload: value === 'A' || value === 'B' ? value : 'A',
        };
      case 'STORE':
        return {
          type: name,
          payload: typeof +value === 'number' ? +value : 3,
        };
      case 'NUM':
        return {
          type: name,
          payload: typeof +value === 'number' ? +value : 0,
        };
    }
  }

  return (
    <select
      className="w-full rounded-lg border border-[#4B5E51] bg-[#09090A] px-6 py-2"
      onChange={(e) => dispatch!(getValue(name, e.target.value))}
      name={name.toLowerCase()}
    >
      {options.map((str, i) => (
        <option key={`option_${str}_${i}`} value={str}>
          {str}
        </option>
      ))}
    </select>
  );
};

export default Select;
