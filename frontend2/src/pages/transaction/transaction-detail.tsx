import ButtonRedirect from "../../components/Buttons/ButtonRedirect";
import Modal from "../../components/Utilities/modal";
import { getCurrency } from "../../context/user-context";
import { useCloseModal } from "../../hooks/useCloseWindow";
import {
  ITransactionResponse,
  useGetTransactionDetail,
} from "../../services/transaction-services";

import { motion } from "framer-motion";
import CloseIcon from "../../components/Icons/CloseIcon";

const parentVariants = {
  initial: { opacity: 0 },
  ending: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      duration: 0.25,
      staggerChildren: 0.15,
    },
  },
};

const childrenVariants = {
  initial: { opacity: 0, y: 20 },
  ending: { opacity: 1, y: 0, transition: { type: "tween" } },
};

const TransactionDetail = () => {
  useCloseModal();

  const queryTransactionDetail = useGetTransactionDetail();
  const transactionDetail =
    queryTransactionDetail?.data as ITransactionResponse;
  const isLoading = queryTransactionDetail?.isLoading;
  const currency = getCurrency();

  return (
    <>
      {!isLoading && (
        <Modal>
          <motion.section
            variants={parentVariants}
            initial="initial"
            animate="ending"
            className="flex flex-col gap-6 p-6"
          >
            <motion.div
              variants={childrenVariants}
              className="flex items-center justify-between"
            >
              <h1 className="text-2xl font-semibold">Transaction details</h1>
              <CloseIcon />
            </motion.div>
            <motion.div
              variants={childrenVariants}
              className="flex items-center justify-between"
            >
              <p className="font-semibold">Type</p>
              <p>
                {transactionDetail.type[0].toUpperCase() +
                  transactionDetail.type.slice(1)}
              </p>
            </motion.div>
            <motion.div
              variants={childrenVariants}
              className="flex items-center justify-between"
            >
              <p className="font-semibold">Date</p>
              <p>
                {transactionDetail.date.toLocaleDateString(navigator.language, {
                  dateStyle: "long",
                })}
              </p>
            </motion.div>
            {transactionDetail.type == "expense" && (
              <>
                <motion.div
                  variants={childrenVariants}
                  className="flex items-center justify-between"
                >
                  <p className="font-semibold">Budget</p>
                  <p>{transactionDetail?.budget?.name}</p>
                </motion.div>
                <motion.div
                  variants={childrenVariants}
                  className="flex items-center justify-between"
                >
                  <p className="font-semibold">State</p>
                  <p
                    className={`rounded-md py-[2px] px-2 font-semibold ${
                      transactionDetail.state === "paid"
                        ? "bg-green-200 text-green-900"
                        : transactionDetail.state === "upcoming"
                        ? "bg-yellow-200 text-yellow-900"
                        : transactionDetail.state === "topay"
                        ? "bg-red-200 text-red-900"
                        : ""
                    }`}
                  >
                    {transactionDetail?.state}
                  </p>
                </motion.div>
              </>
            )}
            <motion.div
              variants={childrenVariants}
              className="flex items-center justify-between"
            >
              <p className="font-semibold">Amount</p>
              <p>
                {transactionDetail.amount} {currency}
              </p>
            </motion.div>
            <motion.div variants={childrenVariants}>
              <p className="mb-4 font-semibold">Description</p>
              <textarea
                className="w-full resize-none rounded-lg border border-gray-300 bg-white p-2 text-sm shadow-sm dark:bg-slate-800"
                disabled
                defaultValue={transactionDetail.description}
              />
            </motion.div>
            <div className="ml-auto flex w-fit justify-end gap-x-2">
              {transactionDetail.type === "expense" && (
                <ButtonRedirect
                  redirect="update"
                  styles="button-primary px-6"
                  label="Update transaction state"
                />
              )}
              <ButtonRedirect
                redirect="delete"
                styles="button-delete px-6"
                label="Delete transaction"
              />
            </div>
          </motion.section>
        </Modal>
      )}
    </>
  );
};

export default TransactionDetail;
