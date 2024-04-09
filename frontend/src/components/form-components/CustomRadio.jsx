import { useField } from 'formik';
import { FiCheck } from 'react-icons/fi';
import classNames from 'classnames';

const CustomInput = ({ label, ...props, options }) => {
  //options'u dizi olarka yollayacaksın.
  // options={[
  //   {key: '', value:''}
  // ]}
  // gibi
  const [field, meta, helpers] = useField(props);
  return (
    <div className="grid gap-y-2">
      <div className="text-sm text-gray-600 block mb-1.5">{label}</div>
      {options.map((option, key) => {
        <label key={key} className="flex gap-x-2 text-sm cursor-pointer items-center" htmlFor="">
          <button
            onClick={() => helpers.setValue(option.key)}
            className={classNames({
              'w-5 h-5 rounded-full border transition-all flex items-center justify-center ': true,
              'text-transparent border-gray-300': field.value !== option.key,
              'border-blue-600': field.value === option.key,
            })}
          >
            <div
              className={classNames({
                'w-3 h-3 rounded-full': true,
                'bg-blue-600': field.value === option.key,
              })}
            />
          </button>
          {option.value}
        </label>;
      })}
    </div>
  );
};

export default CustomInput;
