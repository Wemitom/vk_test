import { useContext } from 'react';

import { FormContext } from '../../components/App';

export default function useSelect() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error(`useForm must be used within a FormProvider`);
  }

  return context;
}
