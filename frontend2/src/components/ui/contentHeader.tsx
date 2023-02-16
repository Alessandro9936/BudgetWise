import { PuffLoader } from "react-spinners";

type ContentHeaderProps = {
  isFetching: boolean;
  sectionTitle: string;
};

const ContentHeader = ({ isFetching, sectionTitle }: ContentHeaderProps) => {
  return (
    <div className="flex items-center gap-2">
      <h3>{sectionTitle}</h3>
      {isFetching && <PuffLoader color="#6366f1" size={20} />}
    </div>
  );
};

export default ContentHeader;
