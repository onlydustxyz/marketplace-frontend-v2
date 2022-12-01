import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { CLAIMS_KEY, CustomUserRole, HasuraJWT, HasuraUserRole, PROJECTS_LED_KEY, UserRole } from "src/types";

function getRoleListFromJwt(jwtString?: string) {
  const newRoleList: UserRole[] = [HasuraUserRole.Public];
  if (jwtString) {
    newRoleList.push(HasuraUserRole.User);
    try {
      const decodedToken = jwtDecode<HasuraJWT>(jwtString);
      if (decodedToken[CLAIMS_KEY][PROJECTS_LED_KEY].length > 2) {
        newRoleList.push(CustomUserRole.ProjectLead);
      }
    } catch (e) {
      console.error(`Error decoding JWT: ${e}`);
    }
  }
  return newRoleList;
}

export const useJwtRole = (jwtString?: string) => {
  const [roleList, setRoleList] = useState<UserRole[]>(getRoleListFromJwt(jwtString));
  const [ledProjectIds, setLedProjectIds] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => setRoleList(getRoleListFromJwt(jwtString)), [jwtString]);

  useEffect(() => {
    if (jwtString && roleList.includes(CustomUserRole.ProjectLead)) {
      const decodedToken = jwtDecode<HasuraJWT>(jwtString);
      if (decodedToken[CLAIMS_KEY][PROJECTS_LED_KEY].length > 2) {
        setLedProjectIds(JSON.parse(convertCurlyBracesToBrackets(decodedToken[CLAIMS_KEY][PROJECTS_LED_KEY])));
      }
    }
  }, [JSON.stringify(roleList)]);

  useEffect(() => {
    setIsLoggedIn(!(roleList.includes(HasuraUserRole.Public) && roleList.length === 1));
  }, [JSON.stringify(roleList)]);

  return { roleList, ledProjectIds, isLoggedIn };
};

function convertCurlyBracesToBrackets(x: string) {
  return x.replace("{", "[").replace("}", "]");
}
