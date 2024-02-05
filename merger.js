import PDFMerger from 'pdf-merger-js';

var merger = new PDFMerger();

export const pdfmerger=async (p1,p2) => {
  await merger.add(p1);  //merge all pages. parameter is the path to file and filename.
  await merger.add(p2); 

  await merger.save('public/merged.pdf'); //save under given name and reset the internal document
  merger.reset();
  // Export the merged PDF as a nodejs Buffer
  // const mergedPdfBuffer = await merger.saveAsBuffer();
  // fs.writeSync('merged.pdf', mergedPdfBuffer);
};
