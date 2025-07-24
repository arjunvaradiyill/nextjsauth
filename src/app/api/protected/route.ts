import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      { error: "You must be signed in to access this endpoint" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    message: "This is a protected API endpoint",
    user: {
      name: session.user?.name,
      email: session.user?.email,
      image: session.user?.image,
    },
    timestamp: new Date().toISOString(),
  });
} 