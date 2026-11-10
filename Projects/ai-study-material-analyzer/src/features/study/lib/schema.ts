  import { Type } from "@google/genai";
  import { z } from "zod";

  export const studySchema = z.object({
    heading: z.string(),

    summary: z.object({
      overview: z.string(),

      sections: z.array(
        z.object({
          id: z.string(),
          heading: z.string(),
          explanation: z.object({
            heading: z.string(), 
            points: z.array(z.string()),
          }),
          points: z.array(z.string()),
          
        }),
      ),

      keyTakeaways: z.array(z.string()),
    }),

    concepts: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        explain: z.string(),
        sectionId: z.string(),
      }),
    ),

    quiz: z.array(
      z.object({
        id: z.string(),
        question: z.string(),
        options: z.array(z.string()),
        answer: z.string(),
        explanation: z.string(),
        difficulty: z.enum(["easy", "medium", "hard"]),
      }),
    ),
  });

  export type StudyMaterial = z.infer<typeof studySchema>;

  export const StudyMaterialSchema = {
    type: Type.OBJECT,
    properties: {
      heading: {
        type: Type.STRING,
      },
      summary: {
        type: Type.OBJECT,
        properties: {
          overview: {
            type: Type.STRING,
          },
          sections: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                heading: { type: Type.STRING },
                  explanation: {
                    type: Type.OBJECT,
                    properties: {
                      heading: { type: Type.STRING },
                      points: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                    },
                    required: ["heading", "points"],
                  },
                points: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: ["id", "heading", "explanation", "points"],
            },
          },
          keyTakeaways: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ["overview", "sections", "keyTakeaways"],
      },
      concepts: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: {
              type: Type.STRING,
            },
            title: {
              type: Type.STRING,
            },
            description: {
              type: Type.STRING,
            },
            explain: {
              type: Type.STRING,
            },
            sectionId: {
              type: Type.STRING,
            },
          },
          required: ["id", "title", "description","explain","sectionId"],
        },
      },
      quiz: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: {
              type: Type.STRING,
            },
            question: {
              type: Type.STRING,
            },
            options: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
            answer: {
              type: Type.STRING,
            },
            explanation: {
              type: Type.STRING,
            },
            difficulty: {
              type: Type.STRING,
              enum: ["easy", "medium", "hard"],
            },
          },
          required: [
            "id",
            "question",
            "options",
            "answer",
            "explanation",
            "difficulty",
          ],
        },
      },
    },
    required: ["heading", "summary", "concepts", "quiz"],
  };
