import { NextResponse } from "next/server";

export const createErrorResponse = (message: string, status: number) => {
  return new NextResponse(JSON.stringify({ error: message }), { status });
};

export const handleServerError = (error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  return new NextResponse(
    JSON.stringify({
      error: "Internal server error",
      details: errorMessage,
    }),
    { status: 500 }
  );
};
