import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../supa-client";
import {
  createErrorResponse,
  handleServerError,
} from "../error/error-handle";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { episodeId } = await request.json();

    if (!episodeId) {
      return createErrorResponse("Episode ID is required", 400);
    }

    const { data: episode, error } = await supabase
      .from("episode")
      .select("*")
      .eq("id", episodeId)
      .single();

    if (error) {
      return createErrorResponse(error.message, 500);
    }

    if (!episode) {
      return createErrorResponse("Episode not found", 404);
    }

    return NextResponse.json(episode);
  } catch (error) {
    return handleServerError(error);
  }
}
