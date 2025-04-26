import { NextResponse } from "next/server";
import { supabase } from "../../supa-client";
import { createErrorResponse, handleServerError } from "../../error/error-handle";

export async function GET(): Promise<NextResponse> {
  try {
    const { data: chaptersData, error } = await supabase
      .from("chapters")
      .select("*");

    if (error) {
      return createErrorResponse(error.details, 400);
    }
    if (!chaptersData) {
      return createErrorResponse("Chapters not found", 404);
    }

    const episodesIds = chaptersData.flatMap(chapter => chapter.episodes_id);
    const { data: episodes, error: episodesError } = await supabase
      .from("episodes")
      .select("*")
      .in("id", episodesIds);

    if (episodesError) {
      return createErrorResponse(episodesError.details, 400);
    }

    const resultData = chaptersData.map(chapter => ({
      ...chapter,
      episodes: episodes?.filter(episode => 
        chapter.episodes_id.includes(episode.id)
      )
    }));
    
    return NextResponse.json(resultData, { status: 200 });
  } catch (error) {
    return handleServerError(error);
  }
}