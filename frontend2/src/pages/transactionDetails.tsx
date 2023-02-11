import ButtonRedirect from "@/components/buttons/redirectButton";
import Modal from "@/components/modal/modal";
import { getCurrency } from "@/context/userContext";
import { useCloseModal } from "@/hooks/useCloseWindow";
import { useGetTransactionDetail } from "@/services/transaction-services";

import { motion } from "framer-motion";
import {
  childrenVariants,
  parentVariants,
} from "@/features/transactionForm/utils/variants";
import ModalHeader from "@/components/modal/modalHeader";
import StateTag from "@/components/ui/stateTag";

const TransactionDetail = () => {
  useCloseModal();

  const queryTransactionDetail = useGetTransactionDetail();
  const transactionDetail = queryTransactionDetail?.data;
  const currency = getCurrency();

  return (
    <Modal>
      <motion.section
        variants={parentVariants}
        initial="initial"
        animate="ending"
        className="flex flex-col gap-6 p-6"
      >
        <ModalHeader label="Transaction details" />
        {transactionDetail ? (
          <>
            {/* Transaction type */}
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

            {/* Transaction amount */}
            <motion.div
              variants={childrenVariants}
              className="flex items-center justify-between"
            >
              <p className="font-semibold">Amount</p>
              <p>
                {transactionDetail.amount} {currency}
              </p>
            </motion.div>

            {transactionDetail.type == "expense" && (
              <>
                {/* Transaction budget */}
                <motion.div
                  variants={childrenVariants}
                  className="flex items-center justify-between"
                >
                  <p className="font-semibold">Budget</p>
                  <p>{transactionDetail.budget!.name}</p>
                </motion.div>

                {/* Transaction state */}
                <motion.div
                  variants={childrenVariants}
                  className="flex items-center justify-between"
                >
                  <p className="font-semibold">State</p>
                  <StateTag state={transactionDetail.state!} />
                </motion.div>
              </>
            )}

            {/* Transaction description */}
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
          </>
        ) : (
          <h3>Loading...</h3>
        )}
      </motion.section>
    </Modal>
  );
};

export default TransactionDetail;
