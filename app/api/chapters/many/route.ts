import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../supa-client";
import { createErrorResponse, handleServerError } from "../../error/error-handle";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const user_id = request.headers.get('user_id');
    
    if (!user_id) {
      return NextResponse.json(
        { error: 'User ID not found in headers' },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("chapters")
      .select("*")  
      .eq("user_id", user_id);

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
