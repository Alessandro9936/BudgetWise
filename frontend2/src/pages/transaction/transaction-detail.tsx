import ButtonRedirect from "../../components/Buttons/ButtonRedirect";
import CloseIcon from "../../components/Icons/CloseIcon";
import Modal from "../../components/Utilities/modal";
import { getCurrency } from "../../context/user-context";
import { useCloseModal } from "../../hooks/useCloseWindow";
import {
  ITransactionResponse,
  useGetTransactionDetail,
} from "../../services/transaction-services";

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
          <section className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Transaction details</h1>
              <CloseIcon />
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold">Type</p>
              <p>{transactionDetail.type}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold">Date</p>
              <p>
                {transactionDetail.date.toLocaleDateString(navigator.language, {
                  dateStyle: "long",
                })}
              </p>
            </div>
            {transactionDetail.type == "expense" && (
              <>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Budget</p>
                  <p>{transactionDetail?.budget?.name}</p>
                </div>
                <div className="flex items-center justify-between">
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
                </div>
              </>
            )}
            <div className="flex items-center justify-between">
              <p className="font-semibold">Amount</p>
              <p>
                {transactionDetail.amount} {currency}
              </p>
            </div>
            <div>
              <p className="mb-2 font-semibold">Description</p>
              <textarea
                className="w-full resize-none rounded-lg border border-gray-300 bg-white p-2 text-sm shadow-sm"
                disabled
                defaultValue={transactionDetail.description}
              />
            </div>
            <div className="ml-auto flex w-fit justify-end gap-x-2">
              {transactionDetail.type === "expense" && (
                <ButtonRedirect
                  redirect="update"
                  styles="px-6 bg-slate-900 text-white hover:bg-purple-500"
                  label="Update transaction state"
                />
              )}
              <ButtonRedirect
                redirect="delete"
                styles="px-6 bg-white text-red-500 ring-1 ring-red-500 hover:bg-red-500 hover:text-white"
                label="Delete transaction"
              />
            </div>
          </section>
        </Modal>
      )}
    </>
  );
};

export default TransactionDetail;
