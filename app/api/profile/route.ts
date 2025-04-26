import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../supa-client";
import { Profile, CreateProfileResponse } from "./types";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return new NextResponse(JSON.stringify({ error: "ID is required" }), {
        status: 400,
      });
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", id);

    if (error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    if (!data) {
      return new NextResponse(JSON.stringify({ error: "Profile not found" }), {
        status: 404,
      });
    }

    return NextResponse.json(data); 
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
        status: 500,
      }),
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { fullname, username, email, user_id }: Profile = await request.json();

    if (!fullname || !email || !username) {
      return new NextResponse(
        JSON.stringify({ error: "Name and email are required" }),
        { status: 400 },
      );
    }

    const { data, error }: CreateProfileResponse = await supabase
      .from("profiles")
      .insert([{ fullname, username, email, user_id }])
      .select("*")
      .single();

    if (error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new NextResponse(JSON.stringify(data), { status: 201 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    const { user_id, ...fields } = body;

    if (!user_id) {
      return new NextResponse(JSON.stringify({ error: "ID is required" }), {
        status: 400,
      });
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({ ...fields })
      .eq("user_id", user_id)
      .select("*");

    if (error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    if (!data) {
      return new NextResponse(JSON.stringify({ error: "Profile not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 },
    );
  }
}