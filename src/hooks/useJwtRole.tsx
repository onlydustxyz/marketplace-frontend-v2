import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { CLAIMS_KEY, CustomUserRole, HasuraUserRole, isHasuraJWT, PROJECTS_LED_KEY, UserRole } from "src/types";

export const useJwtRole = (jwtString?: string) => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [ledProjectIds, setLedProjectIds] = useState([]);

  useEffect(() => {
    if (jwtString) {
      setRole(HasuraUserRole.User);
      try {
        const decodedToken = jwtDecode(jwtString);
        if (isHasuraJWT(decodedToken) && decodedToken[CLAIMS_KEY][PROJECTS_LED_KEY].length > 2) {
          setLedProjectIds(JSON.parse(convertCurlyBracesToBrackets(decodedToken[CLAIMS_KEY][PROJECTS_LED_KEY])));
          setRole(CustomUserRole.ProjectLead);
        }
      } catch (e) {
        console.error(`Error decoding JWT: ${e}`);
      }
    } else {
      setRole(HasuraUserRole.Public);
    }
  }, [jwtString]);

  return { role, ledProjectIds, isLoggedIn: role !== HasuraUserRole.Public };
};

function convertCurlyBracesToBrackets(x: string) {
  return x.replace("{", "[").replace("}", "]");
}
