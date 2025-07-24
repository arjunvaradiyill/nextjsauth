"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    await signIn("github", { callbackUrl: "/" });
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: "/" });
  };

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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
              <span className="text-xl font-bold">NextAuth.js Demo</span>
            </div>
            <div className="flex items-center space-x-4">
              {session ? (
                <span className="text-sm text-gray-400">Welcome, {session.user?.name}</span>
              ) : (
                <span className="text-sm text-gray-400">Not signed in</span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            NextAuth.js Demo
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience seamless authentication with GitHub OAuth. Built with Next.js, NextAuth.js, and Tailwind CSS.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {session ? (
            <div className="text-center">
              {/* User Profile */}
              <div className="mb-12">
                {session.user?.image && (
                  <div className="mb-6">
                    <img
                      src={session.user.image}
                      alt="Profile"
                      className="w-24 h-24 rounded-full mx-auto border-4 border-gray-800"
                    />
                  </div>
                )}
                <h2 className="text-3xl font-bold mb-2">Welcome back, {session.user?.name}!</h2>
                <p className="text-gray-400">{session.user?.email}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center flex-wrap mb-12">
                <a
                  href="/dashboard"
                  className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Go to Dashboard
                </a>
                <button
                  onClick={handleSignOut}
                  disabled={isLoading}
                  className="border border-gray-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  {isLoading ? "Signing out..." : "Sign Out"}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              {/* Sign In Section */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
                <p className="text-gray-400 text-lg mb-8">
                  Sign in with your GitHub account to access the protected dashboard and explore the features.
                </p>
              </div>

              {/* Sign In Button */}
              <button
                onClick={handleSignIn}
                disabled={isLoading}
                className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {isLoading ? "Signing in..." : "Sign in with GitHub"}
              </button>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Authentication</h3>
              <p className="text-gray-400 text-sm">Built with OAuth 2.0 standards and industry best practices.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-400 text-sm">Optimized for performance with minimal configuration.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Integration</h3>
              <p className="text-gray-400 text-sm">Simple setup and seamless integration with Next.js.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 text-center">
          <p className="text-gray-500 text-sm">
            NextAuth.js Demo • Next.js • GitHub OAuth • Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}
