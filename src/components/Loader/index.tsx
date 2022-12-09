import { useT } from "talkr";

const Loader: React.FC = () => {
  const { T } = useT();
  return <div className="flex justify-center mt-10 text-2xl">{T("loading")}</div>;
};

export default Loader;
