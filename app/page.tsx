"use client";

const LoginPage: React.FC = () => {
  const loginWithGoogle = () => {
    window.location.href = "http://localhost:8080/auth/login";
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="mb-4 text-xl font-semibold">Login with Google</h1>
        <button
          onClick={loginWithGoogle}
          className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;