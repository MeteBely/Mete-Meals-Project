/* eslint-disable react/prop-types */
const Warning = ({ message, negative }) => {
  return <>{negative ? <div className="w-full my-4 text-red-500 bg-[#F9D5CF] h-12 flex rounded-md items-center justify-center text-[20px] fontCera">{message}</div> : <div className="w-full my-4 text-green-500 bg-[#D4EDDA] h-12 flex rounded-md items-center justify-center text-[20px] fontCera">{message}</div>}</>;
};

export default Warning;
