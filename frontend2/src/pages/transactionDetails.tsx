import ButtonRedirect from "@/components/buttons/redirectButton";
import Modal from "@/components/modal/modal";
import { getCurrency } from "@/context/userContext";
import { useCloseModal } from "@/hooks/useCloseWindow";
import { useGetTransactionDetail } from "@/services/transaction-services";

import { motion } from "framer-motion";

import ModalHeader from "@/components/modal/modalHeader";
import StateTag from "@/components/ui/stateTag";
import {
  parentVariants,
  transitionFadeInVariants,
} from "@/utils/reusableVariants";
import SkeletonDetails from "@/components/ui/skeleton";

const TransactionDetail = () => {
  useCloseModal();

  const queryTransactionDetail = useGetTransactionDetail();
  const transactionDetail = queryTransactionDetail?.data;
  const currency = getCurrency();

  console.log(transactionDetail);

  return (
    <Modal>
      <section className="p-6">
        <ModalHeader label="Transaction details" />
        {transactionDetail ? (
          <motion.div
            variants={parentVariants}
            initial="initial"
            animate="ending"
            custom={0.15}
            className="flex flex-col gap-6"
          >
            {/* Transaction type */}
            <motion.div
              variants={transitionFadeInVariants}
              transition={{ type: "tween" }}
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
              variants={transitionFadeInVariants}
              transition={{ type: "tween" }}
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
                  variants={transitionFadeInVariants}
                  transition={{ type: "tween" }}
                  className="flex items-center justify-between"
                >
                  <p className="font-semibold">Budget</p>
                  <p>{transactionDetail.budget!.name}</p>
                </motion.div>

                {/* Transaction state */}
                <motion.div
                  variants={transitionFadeInVariants}
                  transition={{ type: "tween" }}
                  className="flex items-center justify-between"
                >
                  <p className="font-semibold">State</p>
                  <StateTag state={transactionDetail.state!} />
                </motion.div>
              </>
            )}

            {/* Transaction description */}
            <motion.div
              variants={transitionFadeInVariants}
              transition={{ type: "tween" }}
            >
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
          </motion.div>
        ) : (
          <SkeletonDetails rowSmall={4} rowLarge={1} />
        )}
      </section>
    </Modal>
  );
};

export default TransactionDetail;
