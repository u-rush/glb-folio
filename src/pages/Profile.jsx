import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../supabase";

function Profile({ session }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setProfile(data);
        setDisplayName(data.display_name || "");
        setBio(data.bio || "");
      }
      setLoading(false);
    };

    getProfile();
  }, [session]);

  const handleSave = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName, bio: bio })
      .eq("id", session.user.id);

    if (error) {
      console.error(error);
    } else {
      setProfile({ ...profile, display_name: displayName, bio: bio });
      setEditing(false);
    }
  };

  if (loading) return <p>読み込み中...</p>;

  return (
    <div>
      <Navbar session={session} />
      <h1>プロフィール</h1>
      <p>ユーザー名: {profile?.username}</p>

      {editing ? (
        <div>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="表示名"
          />
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="自己紹介"
          />
          <button onClick={handleSave}>保存</button>
          <button onClick={() => setEditing(false)}>キャンセル</button>
        </div>
      ) : (
        <div>
          <p>表示名: {profile?.display_name}</p>
          <p>自己紹介: {profile?.bio}</p>
          <button onClick={() => setEditing(true)}>編集</button>
        </div>
      )}
    </div>
  );
}

export default Profile;