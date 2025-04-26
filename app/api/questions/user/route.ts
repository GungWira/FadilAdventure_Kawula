import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../supa-client";
import { createErrorResponse, handleServerError } from "../../error/error-handle";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const questionId = body.questionId;

    if (!questionId) {
      return createErrorResponse('Question ID is required', 400);
    }

    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('id', questionId)
      .single();

    if (error) {
      return createErrorResponse('Failed to fetch question', 500);
    }

    if (!data) {
      return createErrorResponse('Question not found', 404);
    }

    return NextResponse.json(data);
  } catch (error) {
    return handleServerError(error);
  }
}