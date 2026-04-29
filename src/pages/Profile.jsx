import Navbar from "../components/Navbar";

function Profile({ session }) {
  return (
    <div>
      <Navbar session={session} />
      <h1>プロフィール</h1>
      <p>{session.user.email}</p>
    </div>
  );
}

export default Profile;