import { useState } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../supabase";

function Upload({ session }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    // タイトルとファイルが入力されているか確認
    if (!title || !file) {
      setMessage("タイトルとファイルを入力してください");
      return;
    }

    setUploading(true);

    // ①ファイル名を作る（重複しないようにIDをつける）
    const fileExt = file.name.split(".").pop();
    const fileName = `${session.user.id}_${Date.now()}.${fileExt}`;

    // ②Storageにアップロード
    const { error: uploadError } = await supabase.storage
      .from("glb-models")
      .upload(fileName, file);

    if (uploadError) {
      setMessage("アップロードに失敗しました");
      console.error(uploadError);
      setUploading(false);
      return;
    }

    // ③アップロードしたファイルのURLを取得
    const { data: urlData } = supabase.storage
      .from("glb-models")
      .getPublicUrl(fileName);

    // ④modelsテーブルに保存
    const { error: dbError } = await supabase.from("models").insert({
      user_id: session.user.id,
      title: title,
      description: description,
      glb_url: urlData.publicUrl,
    });

    if (dbError) {
      setMessage("データの保存に失敗しました");
      console.error(dbError);
    } else {
      setMessage("アップロード完了！");
      setTitle("");
      setDescription("");
      setFile(null);
    }

    setUploading(false);
  };

  return (
    <div>
      <Navbar session={session} />
      <h1>モデルをアップロード</h1>

      <input
        type="text"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="説明（任意）"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="file"
        accept=".glb"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "アップロード中..." : "アップロード"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Upload;