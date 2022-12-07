import { gql } from "@apollo/client";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useAuth } from "src/hooks/useAuth";
import { HasuraUserRole } from "src/types";
import { useJwtRole } from "src/hooks/useJwtRole";
import QueryWrapper from "src/components/QueryWrapper";
import ProfileForm from "./components/ProfileForm";
import { useFormatMessage } from "src/hooks/useIntl";
import { ProfileQuery, ProfileQueryVariables } from "src/__generated/graphql";

const Profile: React.FC = () => {
  const { user, hasuraToken } = useAuth();
  const { isLoggedIn } = useJwtRole(hasuraToken?.accessToken);
  const query = useHasuraQuery<ProfileQuery, ProfileQueryVariables>(GET_PROFILE_QUERY, HasuraUserRole.User, {
    skip: !isLoggedIn,
    variables: { id: user?.id },
  });
  const formatMessage = useFormatMessage();
  const { data } = query;
  return (
    <div className="flex flex-col mt-10 text-2xl">
      <h1>{formatMessage("editProfile")}</h1>
      <br />
      <QueryWrapper errorMessage={formatMessage("errorFetchingProfile")} query={query}>
        {data?.user && <ProfileForm user={data.user} />}
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
