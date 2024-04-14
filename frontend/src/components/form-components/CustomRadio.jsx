import { useField, ErrorMessage } from 'formik';
import classNames from 'classnames';

const CustomInput = ({ label, options, ...props }) => {
  const [field, helpers] = useField(props);
  return (
    <div className="grid gap-y-2">
      <div className="text-sm text-gray-600 block mb-1.5">{label}</div>
      {options.map((option, key) => (
        <label key={key} className="flex gap-x-2 text-sm cursor-pointer items-center" htmlFor="">
          <button
            type="button"
            onClick={() => helpers.setValue(option.key)}
            className={classNames({
              'w-5 h-5 rounded-full border transition-all flex items-center justify-center': true,
              ' border-gray-300': field.value !== option.key,
              'border-blue-600': field.value === option.key,
            })}
          >
            <div
              className={classNames({
                'w-[14px] h-[14px] rounded-full': true,
                'bg-blue-600': field.value === option.key,
              })}
            />
          </button>
          {option.value}
        </label>
      ))}
      <ErrorMessage name={field.name} component={'small'} className="text-sm block mt-2 text-red-600 fontCera" />
    </div>
  );
};

export default CustomInput;
