import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../supa-client";
import { createErrorResponse, handleServerError } from "../error/error-handle";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const lessonId = (await params).id;

    if (!lessonId) {
      return createErrorResponse("Lesson ID is required", 400);
    }

    const { data: lesson, error: lessonError } = await supabase
      .from("lessons")
      .select("translate, question, audio")
      .eq("id", lessonId)
      .single();

    if (lessonError) {
      return createErrorResponse(lessonError.message, 500);
    }

    return NextResponse.json(lesson);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function PUT( 
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const lessonId = (await params).id;
    const { user_id } = await request.json();

    if (!lessonId) {
      return createErrorResponse("Lesson ID is required", 400);
    }

    if (!user_id) {
      return createErrorResponse("User ID is required", 400);
    }

    const { error: lessonError } = await supabase
      .from("lessons")
      .update({ is_completed: true })
      .eq("id", lessonId);

    if (lessonError) {
      return createErrorResponse(lessonError.message, 500);
    }

    const { data: userData, error: userError } = await supabase
      .from("profiles")
      .update({ xp: supabase.rpc("increment", { value: 20 }) })
      .eq("id", user_id)
      .select();

    if (userError) {
      return createErrorResponse(userError.message, 500);
    }

    return NextResponse.json(userData);
  } catch (error) {
    return handleServerError(error);
  }
}
