import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button } from "@mui/material";

const PdfDownloader = ({ rootElementId, downloadFileName }: any) => {
  const downloadPdfDocument = () => {
    const input = document.getElementById(rootElementId);
    html2canvas(input as any).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf: any = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${downloadFileName}.pdf`);
    });
  };

  return (
    <Button variant="contained" onClick={downloadPdfDocument}>
      Download Pdf
    </Button>
  );
};

export default PdfDownloader;
