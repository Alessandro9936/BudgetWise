type CardProps = {
  classNames?: string;
  children?: React.ReactNode;
};

const Card = ({ classNames, children }: CardProps) => {
  return (
    <section className={`rounded-xl bg-white shadow ${classNames}`}>
      {children}
    </section>
  );
};

export default Card;
