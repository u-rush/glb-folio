import { supabase } from "../supabase";

function Home({ session }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div>
      <p>ログイン中: {session.user.email}</p>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
}

export default Home;