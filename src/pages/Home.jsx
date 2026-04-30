import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { supabase } from "../supabase";

function Home({ session }) {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getModels = async () => {
      const { data, error } = await supabase
        .from("models")
        .select("*, profiles(username, display_name)")
        .eq("is_public", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setModels(data);
      }
      setLoading(false);
    };

    getModels();
  }, []);

  if (loading) return <p>読み込み中...</p>;

  return (
    <div>
      <Navbar session={session} />
      <h1>ホーム</h1>

      {models.length === 0 ? (
        <p>まだ投稿がありません</p>
      ) : (
        <div>
          {models.map((model) => (
            <div key={model.id}>
              <h2>
                <Link to={`/model/${model.id}`}>{model.title}</Link>
              </h2>
              <p>{model.profiles?.display_name || model.profiles?.username}</p>
              <p>{model.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;