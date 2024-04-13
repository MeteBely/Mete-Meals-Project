import { useField } from 'formik';

const CustomInput = ({ label, options, ...props }) => {
  //options'u dizi olarka yollayacaksın.
  // options={[
  //   {key: '', value:''}
  // ]}
  // gibi

  const [field, meta, helpers] = useField(props);
  return (
    <label className="block w-full">
      <div className="text-sm text-gray-600 ">{label}</div>
      <select {...props} {...field} className="w-full h-10 rounded border-b outline-none focus:border-black">
        {options.map((option, key) => (
          <option value={option.key} key={key}>
            {option.value}
          </option>
        ))}
      </select>
    </label>
  );
};

export default CustomInput;
