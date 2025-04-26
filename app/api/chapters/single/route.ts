import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../supa-client";


export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return new NextResponse("ID is required", { status: 400 });

    const user_id = request.headers.get("user_id");
    if (!user_id) return new NextResponse("User ID is required", { status: 401 });

    const { data: chapterData, error: chapterError } = await supabase
      .from("chapters")
      .select("*")
      .eq("id", id)
      .eq("user_id", user_id)
      .single();
    
    if (chapterError) return new NextResponse(chapterError.message, { status: 400 });
    if (!chapterData) return new NextResponse("Chapter not found", { status: 404 });

    const { data: episodesData, error: episodesError } = await supabase
      .from("episodes")
      .select("*")
      .eq("chapter_id", id);

    if (episodesError) return new NextResponse(episodesError.message, { status: 400 });

    const data = {
      chapter: chapterData,
      episodes: episodesData || []
    }

    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}

// export async function POST(request: NextRequest): Promise<NextResponse> {

// }

// export async function DELETE(request: NextRequest): Promise<NextResponse> {

// }
