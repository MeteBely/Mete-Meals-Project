import { useField } from 'formik';
import { FiCheck } from 'react-icons/fi';
import classNames from 'classnames';

const CustomInput = ({ label, ...props }) => {
  const [field, helpers] = useField(props);
  return (
    <label className="flex gap-x-2 cursor-pointer items-center" htmlFor="">
      <button
        type="button"
        onClick={() => helpers.setValue(!field.value)}
        className={classNames({
          'w-5 h-5 rounded border transition-all flex items-center justify-center ': true,
          'text-transparent border-gray-300': !field.value,
          'bg-blue-600 border-blue-600 text-white': field.value,
        })}
      >
        <FiCheck size={16} />
      </button>
      <span className="fontCera text-[15px]">{label}</span>
    </label>
  );
};

export default CustomInput;
