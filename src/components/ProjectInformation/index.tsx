import githubLogo from "assets/img/github-logo.svg";
import telegramLogo from "assets/img/telegram-logo.svg";
import onlyDustLogo from "assets/img/onlydust-logo.png";

export const REMAINING_AMOUNT_KEY = "remaining_amount";
export const INITIAL_AMOUNT_KEY = "initial_amount";
export const TELEGRAM_LINK_KEY = "telegram_link";

interface ProjectInformationProps {
  name: string;
  details?: {
    description: string;
    [TELEGRAM_LINK_KEY]: string;
  };
  budget?: {
    [REMAINING_AMOUNT_KEY]: number;
    [INITIAL_AMOUNT_KEY]: number;
  };
}

export default function ProjectInformation({ name, details, budget }: ProjectInformationProps) {
  const linkClickHandlerFactory = (url: string) => (e: any) => {
    e.preventDefault();
    window?.open(url, "_blank")?.focus();
  };
  return (
    <div className="flex flex-row md:flex-nowrap flex-wrap justify-between items-center ">
      <div className="flex flex-1 flex-col space-y-3">
        <div className="flex flex-row">
          <div>
            <img className="md:w-8 w-4 hover:opacity-90" src={onlyDustLogo} alt="GitHub Logo" />
          </div>
          <div className="px-3 font-bold text-2xl">{name}</div>
        </div>
        <div className="text-lg">{details?.description}</div>
      </div>
      <div className="flex flex-1 flex-col space-y-1 text-lg w-1/4">
        {budget && (
          <>
            <div>Remaining budget</div>
            <div className="flex flex-row items-center space-x-3 md:flex-nowrap flex-wrap">
              <div className="text-xl font-black">${budget?.[REMAINING_AMOUNT_KEY]}</div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{
                    width: budget
                      ? `${Math.floor((budget?.[REMAINING_AMOUNT_KEY] * 100) / budget?.[INITIAL_AMOUNT_KEY])}%`
                      : "100%",
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-1 flex-row space-x-3 justify-end">
        {details && (
          <>
            <div className="border-1 rounded-md p-2 grayscale bg-white border-slate-500 opacity-80 hover:opacity-50">
              <img className="md:w-8 w-4" src={githubLogo} alt="GitHub Logo" />
            </div>
            {details[TELEGRAM_LINK_KEY] && (
              <div className="border-1 rounded-md p-2 grayscale bg-white border-slate-500 opacity-80 hover:opacity-50">
                <div onClick={linkClickHandlerFactory(details?.[TELEGRAM_LINK_KEY])}>
                  <img className="md:w-8 w-4" src={telegramLogo} alt="Telegram Logo" />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
