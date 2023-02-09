import { getCurrency } from "../../../../context/userContext";
import { TransactionResponse } from "../../../../services/transaction-services";
import { popupVariants } from "../../utils/variants";
import { EventInfo, motion } from "framer-motion";

type ITransactionPopup = {
  popupInfo: EventInfo;
  transactions: TransactionResponse[];
};

const TransactionPopup = ({ popupInfo, transactions }: ITransactionPopup) => {
  const popupCoords = {
    top: popupInfo.point.y + 10 + "px",
    left: popupInfo.point.x - 150 + "px",
  };

  const currency = getCurrency();
  return (
    <motion.ul
      variants={popupVariants}
      initial="initial"
      animate="ending"
      exit="exit"
      className={`pointer-events-none absolute z-10 flex w-44 origin-top-right flex-col gap-y-3 rounded-xl bg-indigo-500 p-2 px-3 font-semibold text-white shadow-xl`}
      style={popupCoords}
    >
      {transactions.map((transaction) => (
        <li key={transaction._id}>
          <p>{transaction.description}</p>
          <p className="text-sm">
            Type: <span className="font-normal">{transaction.type}</span>
          </p>
          <p className="text-sm">
            Amount:{" "}
            <span className="font-normal">
              {transaction.amount} {currency}
            </span>
          </p>
          {transaction.type === "expense" && (
            <p className="text-sm">
              Budget:{" "}
              <span className="font-normal">{transaction.budget?.name}</span>
            </p>
          )}
        </li>
      ))}
    </motion.ul>
  );
};

export default TransactionPopup;
