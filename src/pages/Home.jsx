import Navbar from "../components/Navbar";

function Home({ session }) {
  return (
    <div>
      <Navbar session={session} />
      <h1>ホーム</h1>
      <p>ログイン中: {session.user.email}</p>
    </div>
  );
}

export default Home;