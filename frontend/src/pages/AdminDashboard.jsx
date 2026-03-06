import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";

function AdminDashboard() {

    const [stats, setStats] = useState({
        users: 0,
        documents: 0
    });

    const [users, setUsers] = useState([]);
    const [documents, setDocuments] = useState([]);

    useEffect(() => {

        axios.get(`${API_BASE_URL}/api/admin/stats`)
            .then(res => setStats(res.data))
            .catch(err => console.log(err));

        axios.get(`${API_BASE_URL}/api/admin/users`)
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));

        axios.get(`${API_BASE_URL}/api/admin/documents`)
            .then(res => setDocuments(res.data))
            .catch(err => console.log(err));

    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}

            <div className="w-64 bg-slate-900 text-white p-6">

                <h2 className="text-2xl font-bold mb-10">
                    OpsMind AI
                </h2>

                <p className="text-gray-400 mb-4">
                    Admin Panel
                </p>

                <div className="space-y-3">

                    <div className="hover:text-blue-400 cursor-pointer">
                        📊 Dashboard
                    </div>

                    <div className="hover:text-blue-400 cursor-pointer">
                        👥 Users
                    </div>

                    <div className="hover:text-blue-400 cursor-pointer">
                        📄 Documents
                    </div>

                </div>

            </div>

            {/* Main Content */}

            <div className="flex-1 p-10">

                <h1 className="text-3xl font-bold mb-8">
                    Admin Dashboard
                </h1>

                {/* Stats */}

                <div className="grid grid-cols-2 gap-6 mb-10">

                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-sm opacity-80">
                            Total Users
                        </h2>
                        <p className="text-3xl font-bold">
                            {stats.users}
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-sm opacity-80">
                            Total Documents
                        </h2>
                        <p className="text-3xl font-bold">
                            {stats.documents}
                        </p>
                    </div>

                </div>

                {/* Users Table */}

                <div className="bg-white rounded-xl shadow p-6 mb-10">

                    <h2 className="text-xl font-semibold mb-4">
                        Registered Users
                    </h2>

                    <table className="w-full">

                        <thead>

                            <tr className="border-b text-left">

                                <th className="py-2">Name</th>
                                <th>Email</th>
                                <th>Role</th>

                            </tr>

                        </thead>

                        <tbody>

                            {users.map((user, index) => (

                                <tr key={index} className="border-b">

                                    <td className="py-2">
                                        {user.name}
                                    </td>

                                    <td>
                                        {user.email}
                                    </td>

                                    <td className="text-blue-600 font-medium">
                                        {user.role}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {/* Documents Table */}

                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="text-xl font-semibold mb-4">
                        Uploaded Documents
                    </h2>

                    <table className="w-full">

                        <thead>
                            <tr className="border-b text-left">
                                <th className="py-2">Document Name</th>
                            </tr>
                        </thead>

                        <tbody>
                            {documents.map((doc, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-2">{doc.filename}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;