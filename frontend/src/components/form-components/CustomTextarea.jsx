import { ErrorMessage, useField } from 'formik';
import classNames from 'classnames';

const CustomInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <label className="block w-full">
      <div className="text-[15px] text-gray-600 fontCera font-semibold">{label}</div>
      <textarea
        {...props}
        {...field}
        className={classNames({
          'w-full rounded border-b outline-none px-2 fontCera': true,
          'focus:border-black': !meta.error,
          'focus:border-red-600': meta.error,
        })}
      />
      <ErrorMessage name={field.name} component={'small'} className="text-sm block mt-2 text-red-600 fontCera" />
    </label>
  );
};

export default CustomInput;
