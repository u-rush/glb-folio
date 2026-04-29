import Navbar from "../components/Navbar";

function Upload({ session }) {
  return (
    <div>
      <Navbar session={session} />
      <h1>モデルをアップロード</h1>
    </div>
  );
}

export default Upload;