import githubLogo from "assets/img/github-logo.svg";
import telegramLogo from "assets/img/telegram-logo.svg";
import onlyDustLogo from "assets/img/onlydust-logo.png";

interface MyProjectProps {
  projectName: string;
  remainingBudget: number;
  initialBudget: number;
}

export default function MyProject({ projectName, initialBudget, remainingBudget }: MyProjectProps) {
  return (
    <div className="w-full flex flex-row md:flex-nowrap flex-wrap justify-between items-center bg-gradient-to-br from-fuchsia-800/40 to-fuchsia-900/10 px-8 py-8 border-2 rounded-lg font-walsheim hover:-translate-y-1 hover:scale-105 duration-200 ">
      <div className="flex flex-col space-y-3">
        <div className="flex flex-row">
          <div>
            <img className="md:w-8 w-4 hover:opacity-90" src={onlyDustLogo} alt="GitHub Logo" />
          </div>
          <div className="px-3 font-bold text-2xl">{projectName}</div>
        </div>
        <div className="text-lg">Project description</div>
      </div>
      <div className="flex flex-col space-y-1 text-lg w-1/4">
        <div>Remaining budget</div>
        <div className="flex flex-row items-center space-x-3 md:flex-nowrap flex-wrap">
          <div className="text-xl font-black">${remainingBudget}</div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${Math.floor((remainingBudget * 100) / initialBudget)}%` }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row space-x-3">
        <div className="border-1 rounded-md p-2 grayscale bg-white border-slate-500 opacity-80 hover:opacity-50">
          <img className="md:w-8 w-4" src={githubLogo} alt="GitHub Logo" />
        </div>
        <div className="border-1 rounded-md p-2 grayscale bg-white border-slate-500 opacity-80 hover:opacity-50">
          <img className="md:w-8 w-4" src={telegramLogo} alt="Telegram Logo" />
        </div>
        <div></div>
      </div>
    </div>
  );
}
