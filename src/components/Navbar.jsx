import { Link } from "react-router-dom";
import { supabase } from "../supabase";

function Navbar({ session }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav>
      <Link to="/">ホーム</Link>
      <Link to="/upload">アップロード</Link>
      <Link to="/profile">プロフィール</Link>
      <button onClick={handleLogout}>ログアウト</button>
    </nav>
  );
}

export default Navbar;