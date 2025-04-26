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
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('profile') as File;
    const fullname = formData.get('fullname') as string;
    const username = formData.get('username') as string;
    const umur = formData.get('umur') as string;
    const user_id = formData.get('user_id') as string;

    if (!fullname || !umur || !username) {
      return createErrorResponse("Name and email are required", 400);
    }

    let image_url = null;
    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${user_id}-${imageFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('profile-image')
        .upload(fileName, buffer, {
          contentType: imageFile.type,
          upsert: true
        });

      if (uploadError) {
        return createErrorResponse(uploadError.message, 500);
      }

      const { data: { publicUrl } } = supabase
        .storage
        .from('profiles')
        .getPublicUrl(fileName);

      image_url = publicUrl;
    }

    const { data, error }: CreateProfileResponse = await supabase
      .from("profiles")
      .insert([{ 
        fullname, 
        username, 
        umur, 
        user_id,
        image_url 
      }])
      .select("*")
      .single();

    if (error) return createErrorResponse(error.message, 500);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return handleServerError(error);
  }
};

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("profile") as File;
    const user_id = formData.get("user_id") as string;
    const fields = JSON.parse(formData.get("fields") as string);

    if (!user_id) return createErrorResponse("ID is required", 400);

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

      fields.image_url = publicUrl;
    }

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
