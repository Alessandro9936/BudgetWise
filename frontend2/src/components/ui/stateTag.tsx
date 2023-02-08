const StateTag = ({ state }: { state: string }) => {
  return (
    <p
      className={`w-fit rounded-full py-1 px-3 text-sm font-semibold text-white ${
        state === "paid"
          ? "bg-green-400"
          : state === "upcoming"
          ? "bg-yellow-400"
          : state === "topay"
          ? "bg-red-400"
          : ""
      }`}
    >
      {state}
    </p>
  );
};

export default StateTag;
