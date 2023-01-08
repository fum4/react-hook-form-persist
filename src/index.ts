import { type FieldValues, useForm } from 'react-hook-form';
import usePersist, { PersistOptions } from '@nw/use-persist';

export interface ReactHookFormPersistProps extends Pick<
  PersistOptions,
  'key' | 'setToStorage' | 'getFromStorage' | 'include' | 'exclude' | 'encode' | 'decode'
>{
  session?: boolean;
}

const ReactHookFormPersist = ({
  key = 'formikPersist',
  session = false,
  setToStorage,
  getFromStorage,
  include,
  exclude,
  encode,
  decode,
}: ReactHookFormPersistProps) => {
  const { watch, setValue } = useForm<FieldValues>();
  const storage = session ? sessionStorage : localStorage;
  const values = watch();

  const setValues = (values: FieldValues) => {
    Object.entries(values).forEach(([ key, value ]) => {
      setValue(key, value);
    });
  };

  usePersist({
    key,
    values,
    setValues,
    setToStorage: setToStorage || storage.setItem,
    getFromStorage: getFromStorage || storage.getItem,
    include,
    exclude,
    encode,
    decode,
  });

  return null;
};

export type PersistProps = ReactHookFormPersistProps;
export default ReactHookFormPersist;
