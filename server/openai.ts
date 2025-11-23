import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
let openai: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error(
        "OpenAI API key not configured. Please provide your OPENAI_API_KEY."
      );
    }
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
}

export async function summarizeMeeting(transcript: string): Promise<{
  summary: string;
  actionItems: any[];
}> {
  try {
    const client = getOpenAI();
    const response = await client.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content:
            "You are an expert meeting analyst. Analyze meeting transcripts and provide concise summaries and extract action items. Respond with JSON in this format: { 'summary': string, 'actionItems': [{ 'title': string, 'assignee': string, 'deadline': string }] }",
        },
        {
          role: "user",
          content: `Analyze this meeting transcript and extract key points and action items:\n\n${transcript}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      summary: result.summary || "No summary available",
      actionItems: result.actionItems || [],
    };
  } catch (error) {
    console.error("Error summarizing meeting:", error);
    return {
      summary: "Failed to generate summary",
      actionItems: [],
    };
  }
}

export async function answerDocumentQuestion(
  question: string,
  documents: Array<{ title: string; content: string }>
): Promise<string> {
  try {
    const client = getOpenAI();
    const context = documents
      .map((doc) => `Document: ${doc.title}\n${doc.content}`)
      .join("\n\n---\n\n");

    const response = await client.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that answers questions based on company documentation. Only use the provided documents to answer questions. If the answer is not in the documents, say so.",
        },
        {
          role: "user",
          content: `Context:\n${context}\n\nQuestion: ${question}`,
        },
      ],
      max_completion_tokens: 2048,
    });

    return (
      response.choices[0].message.content ||
      "I couldn't generate an answer to your question."
    );
  } catch (error) {
    console.error("Error answering question:", error);
    throw new Error("Failed to generate answer");
  }
}
