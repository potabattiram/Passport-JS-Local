import React, { useRef, useState } from "react";
import QRCode from "qrcode.react";
import { Document, Page } from "react-pdf";
// import "react-pdf/dist/Page/AnnotationLayer.css";
import pdfjs from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PrintQRCode = () => {
  const [numPages, setNumPages] = useState(null);
  const [value, setValue] = useState("Enter data for QR code");
  const pdfRef = useRef(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const downloadPDF = () => {
    const pdfDocGenerator = pdfRef.current.pdfDocument.getData();
    pdfDocGenerator.then((pdfData) => {
      pdfjs.getDocument({ data: pdfData }).promise.then((pdf) => {
        pdf.getData().then((data) => {
          const a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          const blob = new Blob([data], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          a.href = url;
          a.download = "qrcode.pdf";
          a.click();
          URL.revokeObjectURL(url);
        });
      });
    });
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Document file="./example.pdf" ref={pdfRef} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (_, i) => (
          <Page key={i + 1}>
            <QRCode value={value} />
          </Page>
        ))}
      </Document>
      <div>
        <button onClick={downloadPDF}>Download PDF</button>
      </div>
    </div>
  );
};

export default PrintQRCode;
