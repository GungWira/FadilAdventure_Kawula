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

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { user_id } = await request.json();
    console.log(user_id);
    const { data: videoData, error: videoError } = await supabase
      .from("video")
      .select("*")
      .eq("creator_id", user_id);
    if (videoError || !videoData) {
      return NextResponse.json(videoData, { status: 200 });
    }

    return NextResponse.json(videoData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
