import { gql } from "@apollo/client";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useAuth } from "src/hooks/useAuth";
import { HasuraUserRole } from "src/types";
import { useJwtRole } from "src/hooks/useJwtRole";
import QueryWrapper from "src/components/QueryWrapper";
import ProfileForm from "./components/ProfileForm";

const Profile: React.FC = () => {
  const { user, hasuraToken } = useAuth();
  const { isLoggedIn } = useJwtRole(hasuraToken?.accessToken);
  const query = useHasuraQuery(GET_PROFILE_QUERY, HasuraUserRole.User, {
    skip: !isLoggedIn,
    variables: { id: user?.id },
  });
  const { data } = query;
  return (
    <div className="flex flex-col mt-10 text-2xl">
      <h1>Edit Profile</h1>
      <br />
      <QueryWrapper errorMessage="Error fetching profile" query={query}>
        {data && <ProfileForm user={data.user} />}
      </QueryWrapper>
    </div>
  );
};

export const GET_PROFILE_QUERY = gql`
  query Profile($id: uuid!) {
    user(id: $id) {
      id
      email
      metadata
    }
  }
`;

export default Profile;
