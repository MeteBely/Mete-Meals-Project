/* eslint-disable react/prop-types */
const Warning = ({ message, negative }) => {
  return <>{negative ? <div className="w-full my-4 text-red-600 bg-[#F9D5CF] h-12 flex rounded-md items-center justify-center text-[20px] fontCera">{message}</div> : <div className="w-full my-4 text-[#235091] bg-green-300 h-12 flex rounded-md items-center justify-center text-[20px] fontCera">{message}</div>}</>;
};

export default Warning;
