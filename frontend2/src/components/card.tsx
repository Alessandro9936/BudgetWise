const Card = ({
  classNames,
  children,
}: {
  classNames?: string;
  children?: React.ReactNode;
}) => {
  return (
    <section className={`rounded-xl bg-white shadow-md ${classNames}`}>
      {children}
    </section>
  );
};

export default Card;
