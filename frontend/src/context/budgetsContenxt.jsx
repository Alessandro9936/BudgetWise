import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const BudgetContext = createContext(null);

const budgetEnums = Object.freeze({
  SET_BUDGETS: "set-budgets",
  ADD_BUDGET: "add-budget",
  UPDATE_BUDGET: "update-budget",
  DELETE_BUDGET: "delete-budget",
  GET_BUDGET: "get-budget",
});

const reducer = (state, action) => {
  const { SET_BUDGETS, ADD_BUDGET, UPDATE_BUDGET, DELETE_BUDGET, GET_BUDGET } =
    budgetEnums;
  switch (action.type) {
    case SET_BUDGETS: {
      return [...action.payload];
    }

    case ADD_BUDGET: {
    }

    case UPDATE_BUDGET: {
    }

    case DELETE_BUDGET: {
    }

    case GET_BUDGET: {
    }

    default: {
      return state;
    }
  }
};

export const BudgetProvider = ({ children }) => {
  const [budgetsState, dispatch] = useReducer(reducer, []);

  return (
    <BudgetContext.Provider value={{ budgetsState, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudgets = () => {
  const { budgetsState, dispatch } = useContext(BudgetContext);

  if (budgetsState === undefined) throw new Error("Budgets are not defined");

  return { budgetsState, dispatch };
};
