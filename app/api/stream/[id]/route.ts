import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../supa-client";

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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const { data: videoData, error: videoError } = await supabase
      .from("video")
      .select("*")
      .eq("id", id)
      .single();
    if (videoError || !videoData) {
      return createErrorResponse("Culture not found", 404);
    }

    return NextResponse.json(videoData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
