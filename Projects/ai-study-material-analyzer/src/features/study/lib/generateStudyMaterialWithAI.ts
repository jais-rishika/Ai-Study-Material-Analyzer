    import { StudyMaterialSchema, studySchema } from "./schema";
    import { extractPdfPages } from "./extractPdfPages";
    import ai from "@/ai/ai";
    import prompt from "@/features/study/lib/prompt";

    export async function generateStudyMaterialWithAI(file: File,pages?: {fromPage: number ; toPage: number ;}){
        
        try{
            if(!file){
                console.log("File doesn't exist");
                return null;
            }

            const pdfToSend = pages
            ? await extractPdfPages(file, pages.fromPage, pages.toPage)
            : file;

            const base64Pdf = Buffer.from(await pdfToSend.arrayBuffer()).toString("base64");  
        
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
