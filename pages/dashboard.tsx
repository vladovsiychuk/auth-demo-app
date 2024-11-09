import React from 'react';

const Dashboard: React.FC = () => {

    const handleLogout = async () => {
        window.location.href = "http://localhost:8080/auth/logout";
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-2xl font-semibold mb-4">Welcome to the Dashboard</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600"
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;