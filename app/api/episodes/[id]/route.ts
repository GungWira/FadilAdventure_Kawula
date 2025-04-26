import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../supa-client";
import {
  createErrorResponse,
  handleServerError,
} from "../../error/error-handle";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const episodeId = (await params).id;

    console.log(episodeId, "episodeId");

    if (!episodeId) {
      return createErrorResponse("Episode ID is required", 400);
    }
    
    const { data: episode_questions, error: episodeQuestionsError } = await supabase
      .from("episodes")
      .select("questions_id")
      .eq("id", episodeId)
      .single();

    if (episodeQuestionsError) {
      return createErrorResponse(episodeQuestionsError.message, 500);
    }

    const { data: questions, error: questionsError } = await supabase
      .from("questions")
      .select("id, question, answer, answer_options, type")
      .in("id", episode_questions.questions_id || []);

      
    const flattenedQuestions = questions?.flatMap(q => ({
      id: q.id,
      question: q.question,
      answer: q.answer,
      options: q.answer_options,
      types : q.type
    })) || [];

    if (questionsError) {
      return createErrorResponse(questionsError.message, 500);
    } 

    return NextResponse.json(flattenedQuestions);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const episodeId = (await params).id;

    if (!episodeId) {
      return createErrorResponse("Episode ID is required", 400);
    }

    const { data, error } = await supabase
      .from("episodes")
      .update({ is_completed: true })
      .eq("id", episodeId)
      .select();

    if (error) {
      return createErrorResponse(error.message, 500);
    }

    return NextResponse.json(data);
  } catch (error) {
    return handleServerError(error);
  }
}
