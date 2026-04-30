import { supabase } from "../supabase";

function Auth() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  return (
    <div>
      <h1>GLB Folio</h1>
      <button onClick={handleLogin}>Googleでログイン</button>
    </div>
  );
}

export default Auth;