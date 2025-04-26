import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../supa-client";
import { CreateProfileResponse } from "./types";
import { createErrorResponse, handleServerError } from "../error/error-handle";

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
    const formData = await request.formData();
    const imageFile = formData.get("profile") as File;
    const fullname = formData.get("fullname") as string;
    const username = formData.get("username") as string;
    const umur = formData.get("umur") as string;
    const user_id = formData.get("user_id") as string;

    if (!fullname || !umur || !username) {
      return createErrorResponse("Name and email are required", 400);
    }

    let image_url = null;
    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${user_id}-${imageFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("profile-image")
        .upload(fileName, buffer, {
          contentType: imageFile.type,
          upsert: true,
        });

      if (uploadError) {
        return createErrorResponse(uploadError.message, 500);
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("profiles").getPublicUrl(fileName);

      image_url = publicUrl;
    }

    const { data, error }: CreateProfileResponse = await supabase
      .from("profiles")
      .insert([
        {
          fullname,
          username,
          umur,
          user_id,
          image_url,
        },
      ])
      .select("*")
      .single();

    if (error) return createErrorResponse(error.message, 500);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return handleServerError(error);
  }
}
