import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../supa-client";
import { createErrorResponse, handleServerError } from "../error/error-handle";

interface VideoData {
  video_url: string;
  description: string;
  title: string;
  type: string[];
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("video_url") as File;
    const description = formData.get("description") as string;
    const title = formData.get("title") as string;
    const typeString = formData.get("type") as string;
    const type = typeString ? JSON.parse(typeString) : [];

    if (!file || !description || !title || !type) {
      return createErrorResponse("Missing required fields", 400);
    }

    const fileBuffer = await file.arrayBuffer();
    const fileName = `${Date.now()}-${file.name}`;

    const { data: storageData, error: storageError } = await supabase.storage
      .from("video-learning")
      .upload(fileName, fileBuffer, {
        contentType: file.type,
      });

    if (storageError) {
      console.log("Error storage");
      return createErrorResponse(storageError.message, 500);
    }

    const { data: publicUrl } = supabase.storage
      .from("video-learning")
      .getPublicUrl(fileName);

    const video_url = publicUrl.publicUrl;

    const { data, error } = await supabase
      .from("video")
      .insert([
        {
          video_url,
          description,
          title,
          type,
        },
      ])
      .select();

    if (error) {
      return createErrorResponse(error.message, 500);
    }

    return NextResponse.json(
      {
        message: "Video inserted successfully",
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleServerError(error);
  }
}
