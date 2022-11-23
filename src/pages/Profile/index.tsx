import { gql } from "@apollo/client";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useAuth } from "src/hooks/useAuth";
import { USER_ROLES } from "src/types";

export default function Profile() {
  const { getUser, isLoggedIn } = useAuth();
  const user = getUser();
  const { loading, error, data } = useHasuraQuery(GET_PROFILE_QUERY, USER_ROLES.USER, {
    skip: !isLoggedIn,
    variables: { id: user?.id },
  });
  return (
    <>
      {loading && <div className="flex justify-center mt-10 text-2xl">Loading</div>}
      {data && (
        <div className="flex justify-center mt-10 text-2xl">
          Your user id is {data.user.id} and your e-mail address is {data.user.email}
        </div>
      )}
      {error && <div className="flex justify-center mt-10 text-2xl">Error fetching profile</div>}
    </>
  );
}

export const GET_PROFILE_QUERY = gql`
  query Profile($id: uuid!) {
    user(id: $id) {
      id
      email
    }
  }
`;
