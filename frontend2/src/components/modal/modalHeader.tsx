import CloseIcon from "@/components/icons/closeIcon";

const ModalHeader = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold">{label}</h1>
      <CloseIcon />
    </div>
  );
};

export default ModalHeader;
