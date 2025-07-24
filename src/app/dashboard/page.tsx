"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
              <span className="text-xl font-bold">Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Welcome, {session.user?.name}</span>
              <Link
                href="/"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            You&apos;ve successfully accessed the protected dashboard. Your session is active and secure.
          </p>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center justify-center mb-16">
          <div className="text-center">
            {session.user?.image && (
              <div className="mb-6">
                <img
                  src={session.user.image}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto border-4 border-gray-800"
                />
              </div>
            )}
            <h2 className="text-3xl font-bold mb-2">{session.user?.name}</h2>
            <p className="text-gray-400">{session.user?.email}</p>
          </div>
        </div>

        {/* Action Section */}
        <div className="text-center">
          <button
            onClick={async () => {
              try {
                const response = await fetch('/api/protected');
                const data = await response.json();
                alert(JSON.stringify(data, null, 2));
              } catch (error) {
                alert('Error testing API: ' + error);
              }
            }}
            className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors mr-4"
          >
            Test API
          </button>
          <Link
            href="/"
            className="border border-gray-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-24 text-center">
          <p className="text-gray-500 text-sm">
            Protected Dashboard • NextAuth.js • GitHub OAuth
          </p>
        </div>
      </div>
    </div>
  );
} 