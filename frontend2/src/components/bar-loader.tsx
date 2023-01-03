import { BarLoader } from "react-spinners";
const CustomBarLoader = () => {
  return (
    <div className="absolute top-1/2 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 justify-center">
      <BarLoader width={"50%"} color="#a855f7" />
    </div>
  );
};

export default CustomBarLoader;
