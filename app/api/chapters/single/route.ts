import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../supa-client";


export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return new NextResponse("ID is required", { status: 400 });

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("culture")
      .eq("user_id", id);

    const { data, error } = await supabase
      .from("chapters")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return new NextResponse(error.message, { status: 500 });
    if (!data) return new NextResponse("Chapter not found", { status: 404 });

    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}

// export async function POST(request: NextRequest): Promise<NextResponse> {

// }

// export async function DELETE(request: NextRequest): Promise<NextResponse> {

// }
