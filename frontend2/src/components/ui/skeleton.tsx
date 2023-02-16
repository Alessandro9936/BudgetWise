type SkeletonDetailsPros = {
  rowSmall?: number;
  rowLarge?: number;
};

const SkeletonDetails = ({ rowLarge, rowSmall }: SkeletonDetailsPros) => {
  return (
    <div className="relative mt-6 flex flex-col gap-6">
      {rowSmall &&
        Array(rowSmall)
          .fill("")
          .map((_, i) => (
            <span
              key={Math.random()}
              className="block h-8 w-full animate-pulse  rounded-xl bg-slate-700"
            />
          ))}
      {rowLarge &&
        Array(rowLarge)
          .fill("")
          .map((_, i) => (
            <span
              key={Math.random()}
              className="block h-24 w-full animate-pulse rounded-xl bg-slate-700"
            />
          ))}
    </div>
  );
};

export default SkeletonDetails;
