import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Upload from "./pages/Upload";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/upload"
                        element={
                            <ProtectedRoute>
                                <Upload />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/chat"
                        element={
                            <ProtectedRoute>
                                <Chat />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <AdminRoute>
                                <AdminDashboard />
                            </AdminRoute>
                        }
                    />

                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;