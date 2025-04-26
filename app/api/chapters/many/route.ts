import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../supa-client";
import { createErrorResponse, handleServerError } from "../../error/error-handle";

export async function GET(): Promise<NextResponse> {
  try {
    const { data, error } = await supabase
      .from("chapters")
      .select("*");

    if (error) {
      return createErrorResponse(error.details, 400);
    }
    if (!data) {
      return createErrorResponse("Chapters not found", 404);
    }
    
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return handleServerError(error);
  }
}