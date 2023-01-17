import CloseIcon from "../Icons/CloseIcon";
import Modal from "./modal";
import ButtonRedirect from "../Buttons/ButtonRedirect";
import { useCloseModal } from "../../hooks/useCloseWindow";
import { useDeleteTransaction } from "../../services/transaction-services";
import { useDeleteBudget } from "../../services/budget-services";
import { useNavigate } from "react-router-dom";

const DeleteModal = ({ toDelete }: { toDelete: "transaction" | "budget" }) => {
  useCloseModal();
  const navigate = useNavigate();

  const { deleteTransaction } = useDeleteTransaction();
  const { deleteBudget } = useDeleteBudget();

  const handleDelete = () => {
    toDelete === "transaction" ? deleteTransaction() : deleteBudget();
    navigate("..");
  };

  return (
    <Modal>
      <section className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Delete {toDelete}</h1>
          <CloseIcon />
        </div>
        <p>Are you sure you want to delete this {toDelete}?</p>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={handleDelete}
            className="rounded-lg bg-red-500 px-6 py-3 text-center font-semibold text-white"
          >
            Delete
          </button>
          <ButtonRedirect
            label="Go back"
            redirect={".."}
            styles="bg-white text-purple-500 ring-1 ring-purple-500 px-6"
          />
        </div>
      </section>
    </Modal>
  );
};

export default DeleteModal;
