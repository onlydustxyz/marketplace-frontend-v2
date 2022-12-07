import { useFormatMessage } from "src/hooks/useIntl";

export default function ErrorFallback() {
  const refresh = () => {
    window.location.reload();
  };
  const formatMessage = useFormatMessage();

  return (
    <div className="min-h-screen flex-grow flex flex-col items-center justify-center text-center">
      <div className="mb-8 text-4xl text-red-400/70">{formatMessage("errorOccured")}</div>
      <div onClick={refresh} className="cursor-pointer text-2xl text-light-purple/90 underline">
        {formatMessage("tryToRefresh")}
      </div>
    </div>
  );
}
