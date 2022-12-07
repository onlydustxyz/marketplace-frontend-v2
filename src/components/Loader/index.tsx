import { useFormatMessage } from "src/hooks/useIntl";

const Loader: React.FC = () => {
  const formatMessage = useFormatMessage();
  return <div className="flex justify-center mt-10 text-2xl">{formatMessage("loading")}</div>;
};

export default Loader;
