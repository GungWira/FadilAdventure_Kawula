import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../supa-client";
import {
  createErrorResponse,
  handleServerError,
} from "../../error/error-handle";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from('questions')
      .insert(body)
      .select();

    if (error) return createErrorResponse(error.message, 400);
    return NextResponse.json(data);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    const { error } = await supabase
      .from('questions')
      .delete()
      .eq('id', id);

    if (error) return createErrorResponse(error.message, 400);
    return NextResponse.json({ message: 'Question deleted successfully' });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();

    const { data, error } = await supabase
      .from('questions')
      .update(body)
      .eq('id', id)
      .select();

    if (error) return createErrorResponse(error.message, 400);
    return NextResponse.json(data);
  } catch (error) {
    return handleServerError(error);
  }
}