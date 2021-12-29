const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

run().catch(err => console.log(err));

async function run() {
  // Load cover and content pdfs
  const cover = await PDFDocument.load(fs.readFileSync('./file/file1.pdf'));
  const content = await PDFDocument.load(fs.readFileSync('./file/file2.pdf'));

  // Create a new document
  const doc = await PDFDocument.create();

  // Add the cover to the new doc
  const [coverPage] = await doc.copyPages(cover, [0]);
  doc.addPage(coverPage);

  // Add individual content pages
  const contentPages = await doc.copyPages(content, content.getPageIndices());
  for (const page of contentPages) {
    doc.addPage(page);
  }

  // Write the PDF to a file
  fs.writeFileSync('./file/output'+ Date.now()+'.pdf', await doc.save());
}