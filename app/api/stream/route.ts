import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../supa-client";

const createErrorResponse = (message: string, status: number) =>
  NextResponse.json({ error: message }, { status });

const handleServerError = (error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  return NextResponse.json(
    {
      error: "Internal server error",
      details: errorMessage,
    },
    { status: 500 }
  );
};

export async function GET() {
  try {
    const { data: streamData, error: streamError } = await supabase
      .from("video")
      .select("*");
    if (streamError || !streamData) {
      return createErrorResponse("Culture not found", 404);
    }

    return NextResponse.json(streamData, { status: 200 });
  } catch (error) {
    return handleServerError(error);
  }
}
