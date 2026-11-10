
"use server";

import { mkdir, readFile, rename, unlink, writeFile } from "fs/promises";
import path from "path";
import { generateStudyMaterialWithAI } from "../lib/generateStudyMaterialWithAI";
import { StudyMaterial } from "../lib/schema";
import { revalidatePath } from "next/cache";

type ActionState = {
  ok: boolean;
  message: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const SOURCE_PATH = path.join(DATA_DIR, "source.pdf");
const MATERIAL_PATH = path.join(DATA_DIR, "study-material.json");

const MAX_FILE_SIZE = 20 * 1024 * 1024;

export async function generateStudyMaterial(
  prevState: ActionState,
  formdata: FormData
): Promise<ActionState> {
  try {
    const uploadedFile = formdata.get("pdfFile");

    let pdfFile: File | null =
      uploadedFile instanceof File && uploadedFile.size > 0
        ? uploadedFile
        : null;

    // If no new file was uploaded, reuse the existing PDF.
    if (!pdfFile && formdata.get("useExistingPdf") === "on") {
      const buffer = await readFile(SOURCE_PATH);

      let filename = "previous-session.pdf";

      try {
        const savedMaterial = JSON.parse(
          await readFile(MATERIAL_PATH, "utf-8")
        );
        filename = savedMaterial.source?.filename || filename;
      } catch {
        // Use fallback filename.
      }

      pdfFile = new File([new Uint8Array(buffer)], filename, {
        type: "application/pdf",
      });
    }

    if (!pdfFile) {
      return {
        ok: false,
        message: "Please upload a PDF file.",
      };
    }

    if (pdfFile.size > MAX_FILE_SIZE) {
      return {
        ok: false,
        message: "PDF size must not exceed 20 MB.",
      };
    }

    // Parse page selection.
    const allPages = formdata.get("allPages") === "on";

    let pages: { fromPage: number; toPage: number } | undefined;

    if (!allPages) {
      const fromPage = Number(formdata.get("fromPage"));
      const toPage = Number(formdata.get("toPage"));

      if (
        !Number.isInteger(fromPage) ||
        !Number.isInteger(toPage) ||
        fromPage < 1 ||
        toPage < fromPage
      ) {
        return {
          ok: false,
          message: "Please enter a valid page range.",
        };
      }

      pages = { fromPage, toPage };
    }

    // Generate before replacing the previous session.
    const studyMaterial: StudyMaterial | null =
      await generateStudyMaterialWithAI(pdfFile, pages);

    if (!studyMaterial) {
      return {
        ok: false,
        message: "Failed to generate study material. Your previous session is preserved.",
      };
    }

    await mkdir(DATA_DIR, { recursive: true });

    // Write temporary files first.
    const sourceTemp = SOURCE_PATH + ".tmp";
    const materialTemp = MATERIAL_PATH + ".tmp";

    await writeFile(
      sourceTemp,
      Buffer.from(await pdfFile.arrayBuffer())
    );

    await writeFile(
      materialTemp,
      JSON.stringify(
        {
          source: { filename: pdfFile.name },
          pages,
          ...studyMaterial,
        },
        null,
        2
      ),
      "utf-8"
    );

    // Replace previous session files.
    await rename(sourceTemp, SOURCE_PATH);
    await rename(materialTemp, MATERIAL_PATH);

    revalidatePath("/planner");

    return {
      ok: true,
      message: "Study material generated successfully!",
    };
  } catch (error) {
    console.error("Failed to generate study material:", error);

    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong.",
    };
  }
}

// Clear the current session.
export async function clearStudySession(): Promise<ActionState> {
  try {
    for (const filePath of [SOURCE_PATH, MATERIAL_PATH]) {
      try {
        await unlink(filePath);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
          throw error;
        }
      }
    }

    revalidatePath("/planner");

    return {
      ok: true,
      message: "Session cleared.",
    };
  } catch (error) {
    console.error("Failed to clear session:", error);

    return {
      ok: false,
      message: "Could not clear the previous session.",
    };
  }
}
