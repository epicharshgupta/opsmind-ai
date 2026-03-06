import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  return (
    <div className="app">
      <Navbar />

      <div className="main">

        <Sidebar />

        <div className="content">
          {children}
        </div>

      </div>
    </div>
  );
}

export default MainLayout;