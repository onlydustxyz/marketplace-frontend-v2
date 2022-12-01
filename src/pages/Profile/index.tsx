import { gql } from "@apollo/client";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useAuth } from "src/hooks/useAuth";
import { HasuraUserRole } from "src/types";
import { useJwtRole } from "src/hooks/useJwtRole";
import QueryWrapper from "src/components/QueryWrapper";

const Profile: React.FC = () => {
  const { user, hasuraToken } = useAuth();
  const { isLoggedIn } = useJwtRole(hasuraToken?.accessToken);
  const query = useHasuraQuery(GET_PROFILE_QUERY, HasuraUserRole.User, {
    skip: !isLoggedIn,
    variables: { id: user?.id },
  });
  const { data } = query;
  return (
    <QueryWrapper errorMessage="Error fetching profile" query={query}>
      {data && (
        <div className="flex justify-center mt-10 text-2xl">
          Your user id is {data.user.id} and your e-mail address is {data.user.email}
        </div>
      )}
    </QueryWrapper>
  );
};

export const GET_PROFILE_QUERY = gql`
  query Profile($id: uuid!) {
    user(id: $id) {
      id
      email
    }
  }
`;

export default Profile;
