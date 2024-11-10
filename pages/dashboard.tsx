import React, { useState, useEffect } from 'react';

const Dashboard: React.FC = () => {
    const [postData, setPostData] = useState(null);
    const [error, setError] = useState(null);

    const handleLogout = async () => {
        window.location.href = "http://localhost:8080/auth/logout";
    };

    const fetchProtectedData = async () => {
        // Get the auth_token from the cookie
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('auth_token='))
            ?.split('=')[1];

        if (!token) {
            throw new Error("Authentication token not found.");
        }

        // Make the request to the protected endpoint
        const response = await fetch("http://localhost:8080/v1/posts/37f19ff4-9b85-4d43-af80-4d864aae9ab5", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`Request failed: ${response.statusText}`);
        }

        const data = await response.json();
        setPostData(data);
    };

    // Function to refresh the session token every 5 seconds
    const refreshSession = async () => {
        try {
            const response = await fetch("http://localhost:8080/auth/refresh", {
                method: "GET",
                credentials: "include", // Include cookies (important for the session cookie)
            });

            if (!response.ok) {
                console.error("Failed to refresh session");
            }
        } catch (error) {
            console.error("Error refreshing session:", error);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(refreshSession, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-2xl font-semibold mb-4">Welcome to the Dashboard</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 mb-4"
            >
                Logout
            </button>
            <button
                onClick={fetchProtectedData}
                className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600"
            >
                Fetch Protected Data
            </button>
            {postData && (
                <pre className="mt-4 text-left p-4 bg-gray-100 rounded">{JSON.stringify(postData, null, 2)}</pre>
            )}
            {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
    );
};

export default Dashboard;