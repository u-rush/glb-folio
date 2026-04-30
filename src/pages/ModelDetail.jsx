import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ModelViewer from "../components/ModelViewer";
import { supabase } from "../supabase";

function ModelDetail({ session }) {
  const { id } = useParams();
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getModel = async () => {
      const { data, error } = await supabase
        .from("models")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setModel(data);
      }
      setLoading(false);
    };

    getModel();
  }, [id]);

  if (loading) return <p>読み込み中...</p>;
  if (!model) return <p>モデルが見つかりません</p>;

  return (
    <div>
      <Navbar session={session} />
      <h1>{model.title}</h1>
      <p>{model.description}</p>
      <ModelViewer url={model.glb_url} />
    </div>
  );
}

export default ModelDetail;