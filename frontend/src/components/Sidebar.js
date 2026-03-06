import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">

      <h3>Knowledge Base</h3>

      <Link to="/upload">Upload Document</Link>

      <Link to="/chat">AI Assistant</Link>

    </div>
  );
}

export default Sidebar;