import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../supa-client";
import {
  createErrorResponse,
  handleServerError,
} from "../error/error-handle";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { data: chapters, error: chapterError } = await supabase
      .from("chapter")
      .select("episode");

    if (chapterError) {
      return createErrorResponse(chapterError.message, 500);
    }

    const episodeIds = chapters?.flatMap(chapter => chapter.episode) || [];

    const { data: episodes, error: episodeError } = await supabase
      .from("episode")
      .select("*")
      .in("id", episodeIds);

    if (episodeError) {
      return createErrorResponse(episodeError.message, 500);
    }

    return NextResponse.json(episodes);
  } catch (error) {
    return handleServerError(error);
  }
}
