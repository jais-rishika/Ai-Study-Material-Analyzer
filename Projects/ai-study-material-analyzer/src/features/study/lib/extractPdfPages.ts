import { PDFDocument } from "pdf-lib";

export async function extractPdfPages(
  file: File,
  fromPage: number,
  toPage: number
): Promise<File> {
  const sourcePdf = await PDFDocument.load(await file.arrayBuffer());

  const totalPages = sourcePdf.getPageCount();

  // Validate the selected range
  if (
    !Number.isInteger(fromPage) ||
    !Number.isInteger(toPage) ||
    fromPage < 1 ||
    toPage > totalPages ||
    fromPage > toPage
  ) {
    throw new Error(`Please select a valid page range (1–${totalPages}).`);
  }

  // PDF page indices are zero-based, but the UI uses one-based numbers.
  const pageIndices = Array.from(
    { length: toPage - fromPage + 1 },
    (_, index) => fromPage - 1 + index
  );

  const newPdf = await PDFDocument.create();

  const selectedPages = await newPdf.copyPages(sourcePdf, pageIndices);

  selectedPages.forEach((page) => newPdf.addPage(page));

  const pdfBytes = await newPdf.save();

  return new File([pdfBytes], file.name, {
    type: "application/pdf",
  });
}