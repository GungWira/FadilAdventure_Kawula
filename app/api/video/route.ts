import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../supa-client";
import { createErrorResponse, handleServerError } from "../error/error-handle";

interface VideoData {
  video_url: string;
  description: string;
  title: string;
  type: string[];
}

export async function GET() {
  try {
    const { data: streamData, error: streamError } = await supabase
      .from("video")
      .select("*");
    if (streamError || !streamData) {
      return createErrorResponse("Culture not found", 404);
    }

    return NextResponse.json(streamData, { status: 200 });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("video_url") as File;
    const description = formData.get("description") as string;
    const title = formData.get("title") as string;
    const typeString = formData.get("type") as string;
    const user_id = formData.get("user_id") as string;
    const username = formData.get("username") as string;
    const type = typeString ? JSON.parse(typeString) : [];

    if (!file || !description || !title || !type || !user_id || !username) {
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
          creator_id: user_id,
          creator_username: username,
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
