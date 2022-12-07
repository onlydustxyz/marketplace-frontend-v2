import onlyDustLogo from "assets/img/onlydust-logo.png";
import { useFormatMessage } from "src/hooks/useIntl";

export default function OnlyDustLogo() {
  const formatMessage = useFormatMessage();
  return <img className="md:w-32 w-16 hover:opacity-90" src={onlyDustLogo} alt={formatMessage("onlyDustLogo")} />;
}
