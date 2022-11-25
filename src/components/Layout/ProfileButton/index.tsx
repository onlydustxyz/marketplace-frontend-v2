import { useAuth } from "src/hooks/useAuth";

const ProfileButton = () => {
  const { logout } = useAuth();
  return (
    <button className="px-5" onClick={logout}>
      Logout
    </button>
  );
};

export default ProfileButton;
