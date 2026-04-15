import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <p>読み込み中...</p>;

  return (
    <div>
      {session ? <Home session={session} /> : <Auth />}
    </div>
  );
}

export default App;