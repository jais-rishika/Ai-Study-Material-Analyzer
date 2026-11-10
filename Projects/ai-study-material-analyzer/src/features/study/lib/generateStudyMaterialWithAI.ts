    import { StudyMaterialSchema, studySchema } from "./schema";
    import ai from "@/ai/ai";
    import prompt from "@/features/study/lib/prompt";

    export async function generateStudyMaterialWithAI(file: File,pages?: {fromPage: number | null; toPage: number | null;}){
        
        try{
            if(!file){
                console.log("File doesn't exist");
                return null;
            }

            const arrayBuffer = await file.arrayBuffer();
            const base64Pdf = Buffer.from(arrayBuffer).toString("base64");
        
            const interaction = await ai.interactions.create({
            model: "gemini-3.5-flash",
            input:[
                {
                    type: "text",
                    text: prompt
                },
                {
                    type: "document",
                    data: base64Pdf,
                    mime_type: "application/pdf",
                }
            ],
                response_format: {
                type: "text",
                mime_type: "application/json",
                schema: StudyMaterialSchema
            },
            });
        
            const studyMaterial = studySchema.parse(
                interaction.output_text && JSON.parse(interaction.output_text)
            );
            console.log(studyMaterial);
            return studyMaterial;
        }catch(error){
            console.error("Failed to generate study material:", error);
            // alert("Rate limit exceeded. Please try again later.");
            return null;
        }
    }
