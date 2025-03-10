import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center">
      <h3 className="text-3xl font-bold mb-4">메인페이지</h3>
      <Link to="/browser-extension">browser-extension 페이지</Link>
      <br />
      <Link to="/pokemon">포켓몬 페이지</Link>
    </div>
  );
}
