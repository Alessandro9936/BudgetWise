import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const TransactionContext = createContext(null);

const transactionEnums = Object.freeze({
  SET_TRANSACTIONS: "set-transactions",
  ADD_TRANSACTION: "add-transaction",
  UPDATE_TRANSACTION: "update-transaction",
  DELETE_TRANSACTION: "delete-transaction",
  GET_TRANSACTION: "get-transaction",
});

const reducer = (state, action) => {
  const {
    SET_TRANSACTIONS,
    ADD_TRANSACTION,
    UPDATE_TRANSACTION,
    DELETE_TRANSACTION,
    GET_TRANSACTION,
  } = transactionEnums;
  switch (action.type) {
    case SET_TRANSACTIONS: {
      return [...action.payload];
    }

    case ADD_TRANSACTION: {
    }

    case UPDATE_TRANSACTION: {
    }

    case DELETE_TRANSACTION: {
    }

    case GET_TRANSACTION: {
    }

    default: {
      return state;
    }
  }
};

export const TransactionProvider = ({ children }) => {
  const [transactionState, dispatch] = useReducer(reducer, []);

  return (
    <TransactionContext.Provider value={{ transactionState, dispatch }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTranctions = () => {
  const { transactionState, dispatch } = useContext(TransactionContext);

  if (transactionState === undefined)
    throw new Error("Transactions are not defined");

  return { transactionState, dispatch };
};
