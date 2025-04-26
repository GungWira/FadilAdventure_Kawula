import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../supa-client";
import { Profile, CreateProfileResponse } from "./types";

const createErrorResponse = (message: string, status: number) => {
  return new NextResponse(JSON.stringify({ error: message }), { status });
};

const handleServerError = (error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  return new NextResponse(
    JSON.stringify({
      error: "Internal server error",
      details: errorMessage,
    }),
    { status: 500 }
  );
};

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return createErrorResponse("ID is required", 400);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", id);

    if (error) return createErrorResponse(error.message, 500);
    if (!data) return createErrorResponse("Profile not found", 404);

    return NextResponse.json(data);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { fullname, username, email, user_id }: Profile =
      await request.json();

    if (!fullname || !email || !username) {
      return createErrorResponse("Name and email are required", 400);
    }

    const { data, error }: CreateProfileResponse = await supabase
      .from("profiles")
      .insert([{ fullname, username, email, user_id }])
      .select("*")
      .single();

    if (error) return createErrorResponse(error.message, 500);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const { user_id, fields } = await request.json();
    if (!user_id) return createErrorResponse("ID is required", 400);

    if (fields.culture_name) {
      const { data: culture } = await supabase
        .from("culture")
        .select("id")
        .eq("culture_name", fields.culture_name);

      if (culture?.[0]) {
        fields.culture_id = culture[0].id;
      }
    }

    const { data, error } = await supabase
      .from("profiles")
      .update(fields)
      .eq("user_id", user_id)
      .select("*");

    if (error) return createErrorResponse(error.message, 500);

    if (!data) return createErrorResponse("Profile not found", 404);

    return NextResponse.json(data);
  } catch (error) {
    return handleServerError(error);
  }
}
