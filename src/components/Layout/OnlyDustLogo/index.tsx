import onlyDustLogo from "assets/img/onlydust-logo.png";
import { useT } from "talkr";

export default function OnlyDustLogo() {
  const { T } = useT();
  return <img className="md:w-32 w-16 hover:opacity-90" src={onlyDustLogo} alt={T("onlyDustLogo")} />;
}
