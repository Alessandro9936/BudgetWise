const Card = ({
  gridDisposition,
  children,
}: {
  gridDisposition: string;
  children?: React.ReactNode;
}) => {
  return (
    <section className={`rounded-xl bg-white shadow-md ${gridDisposition}`}>
      {children}
    </section>
  );
};

export default Card;
