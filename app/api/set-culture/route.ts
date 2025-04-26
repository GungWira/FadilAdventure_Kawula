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
    const { culture, user_id } = await request.json();

    if (!culture || !user_id) {
      return createErrorResponse("Culture and user_id are required", 400);
    }

    const { data: cultureData, error: cultureError } = await supabase
      .from("cultures")
      .select("id")
      .eq("culture_name", culture)
      .single();
    if (cultureError || !cultureData) {
      return createErrorResponse("Culture not found", 404);
    }

    const { data: profileData, error: updateError } = await supabase
      .from("profiles")
      .update({ culture: cultureData.id })
      .eq("user_id", user_id)
      .select("*")
      .single();

    return NextResponse.json(profileData, { status: 200 });
  } catch (error) {
    return handleServerError(error);
  }
}
