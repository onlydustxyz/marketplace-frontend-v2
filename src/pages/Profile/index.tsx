import { useQuery, gql } from "@apollo/client";
import { useAuth } from "src/hooks/useAuth";

export default function Profile() {
  const { hasuraJwt } = useAuth();
  const { loading, error, data } = useQuery(GET_PROFILE_QUERY, {
    skip: !hasuraJwt,
    variables: { id: hasuraJwt.user.id },
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
