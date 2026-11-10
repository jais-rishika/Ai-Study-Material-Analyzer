"use server"

import { writeFile } from "fs/promises";
import path from "path";
import { generateStudyMaterialWithAI } from "../lib/generateStudyMaterialWithAI";
import {StudyMaterial} from "../lib/schema";
import { revalidatePath } from "next/cache";

type ActionState = { ok: boolean; message: string };


export const generateStudyMaterial = async (
  prevState: ActionState,
  formdata: FormData): Promise<ActionState> => {

    const pdfFile = formdata.get("pdfFile") as File;

    if(!pdfFile){
      return {ok: false, message: "No File Received"};
    }

    const allPages = formdata.get("allPages");
    let pages;

    if(allPages !== "on"){
        pages={
            fromPage: formdata.get("fromPage") as number | null,
            toPage: formdata.get("toPage") as number | null
        };
    }

    try{
      const buffer = Buffer.from(await pdfFile.arrayBuffer());
      const filepath= path.join(process.cwd(), "data", "source.pdf");
      
      await writeFile(filepath, buffer);

    }catch(error){
      console.error("Failed to save file:", error);
      return {ok: false, message: "Failed to save file:"};
    }
    const studyMaterial: StudyMaterial | null = await generateStudyMaterialWithAI(pdfFile as File,pages);
        
    if(studyMaterial === null){
      return {ok: false, message: "Failed to generate study material"};
    }

    const filePath = path.join(
    process.cwd(),
    "data",
    "study-material.json"
  );


  try {
    await writeFile(filePath, JSON.stringify({ 
        source: { filename: pdfFile!.name }, 
        pages, 
        ...studyMaterial 
    }, null, 2), "utf-8");
    revalidatePath("/planner"); 
    return {ok: true, message: "study material File Received"};

  } catch (error) {
      // console.error("Failed to write file:", error); // Confirmation of failure
      const message = error instanceof Error ? error.message : String(error);
      return {ok: false, message: message+ " Could not save study material file"};
  }
}     