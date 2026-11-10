import { access, readFile } from "fs/promises";
import path from "path";
import { studySchema } from "./schema";

const getStudyMaterial=async()=>{
    try{
        const filePath = path.join(process.cwd(),"data","study-material.json");
        
        // Check whether the file exists
        try {
        await access(filePath);
        } catch (error){
            // const fakeFilePath = path.join(process.cwd(),"data","fake-material.json");
            // const studyMaterial = await readFile(fakeFilePath,"utf-8");
            // if(studyMaterial.trim() !== ""){
            //  return studySchema.parse(JSON.parse(studyMaterial));
            // }
            console.log("File does not exist");
            return null;
        }
        
        const studyMaterial = await readFile(filePath,"utf-8");
        if(studyMaterial.trim() !== ""){
             return studySchema.parse(JSON.parse(studyMaterial));
            }
        return null;
    }catch(error){
        console.error("Failed to read study material:", error);
        return null;
    }
}

export default getStudyMaterial;