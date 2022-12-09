import { useT } from "talkr";

export default function ErrorFallback() {
  const refresh = () => {
    window.location.reload();
  };
  const { T } = useT();

  return (
    <div className="min-h-screen flex-grow flex flex-col items-center justify-center text-center">
      <div className="mb-8 text-4xl text-red-400/70">{T("errorOccured")}</div>
      <div onClick={refresh} className="cursor-pointer text-2xl text-light-purple/90 underline">
        {T("tryToRefresh")}
      </div>
    </div>
  );
}
