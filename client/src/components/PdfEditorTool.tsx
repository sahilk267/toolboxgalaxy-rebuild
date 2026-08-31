import { useEffect, useRef, useState } from "react";
import { PDFDocument, rgb, StandardFonts, degrees } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import {
  Download,
  FileText,
  RotateCw,
  Trash2,
  Type,
  Square,
  PenTool,
  Check,
  Plus,
  ArrowLeft,
  ArrowRight,
  Stamp,
  Eraser,
  Upload,
  Eye,
  FileCheck
} from "lucide-react";

// Configure pdfjs worker safely
if (typeof window !== "undefined") {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || "4.10.38"}/pdf.worker.min.mjs`;
  } catch {
    // fallback if cdn is blocked
  }
}

interface TextAnnotation {
  id: string;
  pageIndex: number;
  type: "text";
  text: string;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  fontSize: number;
  color: string;
  isBold?: boolean;
}

interface WhiteoutAnnotation {
  id: string;
  pageIndex: number;
  type: "whiteout";
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

interface DrawingPath {
  id: string;
  pageIndex: number;
  type: "draw";
  points: { x: number; y: number }[]; // percentages
  color: string;
  strokeWidth: number;
}

interface StampAnnotation {
  id: string;
  pageIndex: number;
  type: "stamp";
  text: string;
  x: number;
  y: number;
  color: string;
}

type Annotation = TextAnnotation | WhiteoutAnnotation | DrawingPath | StampAnnotation;

export default function PdfEditorTool() {
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [fileName, setFileName] = useState<string>("document.pdf");
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageRotations, setPageRotations] = useState<number[]>([]);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [activeTool, setActiveTool] = useState<"select" | "text" | "whiteout" | "draw" | "stamp">("select");
  
  // Tool options
  const [textColor, setTextColor] = useState<string>("#1e293b");
  const [fontSize, setFontSize] = useState<number>(14);
  const [isBold, setIsBold] = useState<boolean>(false);
  const [whiteoutColor, setWhiteoutColor] = useState<string>("#ffffff");
  const [drawColor, setDrawColor] = useState<string>("#ef4444");
  const [drawWidth, setDrawWidth] = useState<number>(3);
  const [stampText, setStampText] = useState<string>("CONFIDENTIAL");
  const [stampColor, setStampColor] = useState<string>("#ef4444");
  
  // Watermark & Page Numbering
  const [watermarkText, setWatermarkText] = useState<string>("");
  const [includePageNumbers, setIncludePageNumbers] = useState<boolean>(false);

  // Canvas drawing state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([]);
  const [whiteoutStart, setWhiteoutStart] = useState<{ x: number; y: number } | null>(null);
  const [tempWhiteout, setTempWhiteout] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);

  // Load sample PDF for instant testing
  const loadSamplePdf = async () => {
    setIsProcessing(true);
    try {
      const doc = await PDFDocument.create();
      const page = doc.addPage([595, 842]); // A4
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      const regularFont = await doc.embedFont(StandardFonts.Helvetica);
      
      page.drawText("Toolbox Galaxy — Verified PDF Document", {
        x: 50,
        y: 780,
        size: 20,
        font,
        color: rgb(0.1, 0.15, 0.3),
      });

      page.drawText("This is a local in-browser document ready for visual editing.", {
        x: 50,
        y: 740,
        size: 12,
        font: regularFont,
        color: rgb(0.3, 0.35, 0.45),
      });

      page.drawText("Sample Form Fields & Notes:", {
        x: 50,
        y: 690,
        size: 14,
        font,
        color: rgb(0.1, 0.15, 0.3),
      });

      page.drawText("Name: _________________________________", {
        x: 50,
        y: 650,
        size: 12,
        font: regularFont,
        color: rgb(0.2, 0.2, 0.2),
      });

      page.drawText("Date: __________________________________", {
        x: 50,
        y: 610,
        size: 12,
        font: regularFont,
        color: rgb(0.2, 0.2, 0.2),
      });

      page.drawText("Status: [ Pending Approval ]", {
        x: 50,
        y: 570,
        size: 12,
        font: regularFont,
        color: rgb(0.8, 0.2, 0.2),
      });

      const page2 = doc.addPage([595, 842]);
      page2.drawText("Page 2: Terms & Confidential Details", {
        x: 50,
        y: 780,
        size: 18,
        font,
        color: rgb(0.1, 0.15, 0.3),
      });

      page2.drawText("Sensitive reference ID: TG-98442-SECRET-KEY", {
        x: 50,
        y: 740,
        size: 12,
        font: regularFont,
        color: rgb(0.5, 0.1, 0.1),
      });

      const bytes = await doc.save();
      setPdfBytes(bytes);
      setFileName("sample_document.pdf");
      setNumPages(2);
      setCurrentPage(0);
      setPageRotations([0, 0]);
      setAnnotations([]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsProcessing(true);
    try {
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const pdfDoc = await PDFDocument.load(bytes);
      const count = pdfDoc.getPageCount();
      setPdfBytes(bytes);
      setFileName(file.name);
      setNumPages(count);
      setCurrentPage(0);
      setPageRotations(new Array(count).fill(0));
      setAnnotations([]);
    } catch (err) {
      alert("Could not load this PDF. Please ensure it is a valid, unencrypted PDF file.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Render current page to canvas using pdfjs-dist
  useEffect(() => {
    if (!pdfBytes || numPages === 0) return;
    let isCancelled = false;

    const renderPage = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({ data: pdfBytes.slice() });
        const pdf = await loadingTask.promise;
        if (isCancelled) return;
        
        const page = await pdf.getPage(currentPage + 1);
        const rotation = pageRotations[currentPage] || 0;
        const viewport = page.getViewport({ scale: 1.5, rotation });
        
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const context = canvas.getContext("2d");
        if (!context) return;
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          canvas: canvas,
        };
        await (page.render as any)(renderContext).promise;
      } catch (e) {
        console.warn("Canvas render notice:", e);
      }
    };

    renderPage();
    return () => {
      isCancelled = true;
    };
  }, [pdfBytes, currentPage, pageRotations]);

  // Handle overlay click to add Text, Whiteout, Stamp
  const handleOverlayMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!overlayRef.current) return;
    const rect = overlayRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (activeTool === "text") {
      const textInput = prompt("Enter text to add to document:", "Sample Note");
      if (textInput && textInput.trim()) {
        const newAnnotation: TextAnnotation = {
          id: `text-${Date.now()}`,
          pageIndex: currentPage,
          type: "text",
          text: textInput,
          x,
          y,
          fontSize,
          color: textColor,
          isBold,
        };
        setAnnotations((prev) => [...prev, newAnnotation]);
      }
    } else if (activeTool === "stamp") {
      const newStamp: StampAnnotation = {
        id: `stamp-${Date.now()}`,
        pageIndex: currentPage,
        type: "stamp",
        text: stampText,
        x,
        y,
        color: stampColor,
      };
      setAnnotations((prev) => [...prev, newStamp]);
    } else if (activeTool === "whiteout") {
      setWhiteoutStart({ x, y });
      setTempWhiteout({ x, y, w: 0, h: 0 });
    } else if (activeTool === "draw") {
      setIsDrawing(true);
      setCurrentPath([{ x, y }]);
    }
  };

  const handleOverlayMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!overlayRef.current) return;
    const rect = overlayRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));

    if (activeTool === "draw" && isDrawing) {
      setCurrentPath((prev) => [...prev, { x, y }]);
    } else if (activeTool === "whiteout" && whiteoutStart) {
      const startX = Math.min(whiteoutStart.x, x);
      const startY = Math.min(whiteoutStart.y, y);
      const width = Math.abs(x - whiteoutStart.x);
      const height = Math.abs(y - whiteoutStart.y);
      setTempWhiteout({ x: startX, y: startY, w: width, h: height });
    }
  };

  const handleOverlayMouseUp = () => {
    if (activeTool === "draw" && isDrawing) {
      if (currentPath.length > 1) {
        const newDraw: DrawingPath = {
          id: `draw-${Date.now()}`,
          pageIndex: currentPage,
          type: "draw",
          points: currentPath,
          color: drawColor,
          strokeWidth: drawWidth,
        };
        setAnnotations((prev) => [...prev, newDraw]);
      }
      setIsDrawing(false);
      setCurrentPath([]);
    } else if (activeTool === "whiteout" && whiteoutStart && tempWhiteout) {
      if (tempWhiteout.w > 1 && tempWhiteout.h > 1) {
        const newWhiteout: WhiteoutAnnotation = {
          id: `whiteout-${Date.now()}`,
          pageIndex: currentPage,
          type: "whiteout",
          x: tempWhiteout.x,
          y: tempWhiteout.y,
          width: tempWhiteout.w,
          height: tempWhiteout.h,
          color: whiteoutColor,
        };
        setAnnotations((prev) => [...prev, newWhiteout]);
      }
      setWhiteoutStart(null);
      setTempWhiteout(null);
    }
  };

  // Rotate current page
  const rotateCurrentPage = () => {
    setPageRotations((prev) => {
      const updated = [...prev];
      updated[currentPage] = (updated[currentPage] + 90) % 360;
      return updated;
    });
  };

  // Delete an annotation
  const deleteAnnotation = (id: string) => {
    setAnnotations((prev) => prev.filter((a) => a.id !== id));
  };

  // Delete current page
  const deleteCurrentPage = async () => {
    if (numPages <= 1) {
      alert("Document must have at least one page.");
      return;
    }
    if (!confirm(`Are you sure you want to delete Page ${currentPage + 1}?`)) return;

    try {
      const doc = await PDFDocument.load(pdfBytes!);
      doc.removePage(currentPage);
      const updatedBytes = await doc.save();
      
      const newPageRotations = pageRotations.filter((_, idx) => idx !== currentPage);
      const newAnnotations = annotations
        .filter((a) => a.pageIndex !== currentPage)
        .map((a) => (a.pageIndex > currentPage ? { ...a, pageIndex: a.pageIndex - 1 } : a));

      setPdfBytes(updatedBytes);
      setNumPages(numPages - 1);
      setPageRotations(newPageRotations);
      setAnnotations(newAnnotations);
      setCurrentPage(Math.max(0, currentPage - 1));
    } catch (e) {
      console.error(e);
    }
  };

  // Export & Download Modified PDF
  const exportModifiedPdf = async () => {
    if (!pdfBytes) return;
    setIsProcessing(true);
    try {
      const doc = await PDFDocument.load(pdfBytes);
      const helvetica = await doc.embedFont(StandardFonts.Helvetica);
      const helveticaBold = await doc.embedFont(StandardFonts.HelveticaBold);
      const pageCount = doc.getPageCount();

      // Apply rotations
      for (let i = 0; i < pageCount; i++) {
        const page = doc.getPage(i);
        const addedRot = pageRotations[i] || 0;
        if (addedRot > 0) {
          page.setRotation(degrees((page.getRotation().angle + addedRot) % 360));
        }
      }

      // Apply annotations per page
      for (let p = 0; p < pageCount; p++) {
        const page = doc.getPage(p);
        const { width, height } = page.getSize();
        const pageAnns = annotations.filter((a) => a.pageIndex === p);

        for (const ann of pageAnns) {
          if (ann.type === "text") {
            const font = ann.isBold ? helveticaBold : helvetica;
            const pdfX = (ann.x / 100) * width;
            const pdfY = height - (ann.y / 100) * height - ann.fontSize;
            
            // parse hex color
            const r = parseInt(ann.color.slice(1, 3), 16) / 255 || 0;
            const g = parseInt(ann.color.slice(3, 5), 16) / 255 || 0;
            const b = parseInt(ann.color.slice(5, 7), 16) / 255 || 0;

            page.drawText(ann.text, {
              x: pdfX,
              y: pdfY,
              size: ann.fontSize,
              font,
              color: rgb(r, g, b),
            });
          } else if (ann.type === "whiteout") {
            const pdfX = (ann.x / 100) * width;
            const pdfW = (ann.width / 100) * width;
            const pdfH = (ann.height / 100) * height;
            const pdfY = height - (ann.y / 100) * height - pdfH;

            const r = parseInt(ann.color.slice(1, 3), 16) / 255 || 1;
            const g = parseInt(ann.color.slice(3, 5), 16) / 255 || 1;
            const b = parseInt(ann.color.slice(5, 7), 16) / 255 || 1;

            page.drawRectangle({
              x: pdfX,
              y: pdfY,
              width: pdfW,
              height: pdfH,
              color: rgb(r, g, b),
            });
          } else if (ann.type === "stamp") {
            const pdfX = (ann.x / 100) * width;
            const pdfY = height - (ann.y / 100) * height;
            const r = parseInt(ann.color.slice(1, 3), 16) / 255 || 1;
            const g = parseInt(ann.color.slice(3, 5), 16) / 255 || 0;
            const b = parseInt(ann.color.slice(5, 7), 16) / 255 || 0;

            page.drawText(ann.text, {
              x: pdfX,
              y: pdfY,
              size: 22,
              font: helveticaBold,
              color: rgb(r, g, b),
              rotate: degrees(-15),
            });
          } else if (ann.type === "draw" && ann.points.length > 1) {
            // Draw connected lines
            const r = parseInt(ann.color.slice(1, 3), 16) / 255 || 1;
            const g = parseInt(ann.color.slice(3, 5), 16) / 255 || 0;
            const b = parseInt(ann.color.slice(5, 7), 16) / 255 || 0;

            for (let i = 0; i < ann.points.length - 1; i++) {
              const p1 = ann.points[i];
              const p2 = ann.points[i + 1];
              page.drawLine({
                start: { x: (p1.x / 100) * width, y: height - (p1.y / 100) * height },
                end: { x: (p2.x / 100) * width, y: height - (p2.y / 100) * height },
                thickness: ann.strokeWidth,
                color: rgb(r, g, b),
              });
            }
          }
        }

        // Apply page numbers if enabled
        if (includePageNumbers) {
          const numText = `Page ${p + 1} of ${pageCount}`;
          page.drawText(numText, {
            x: width / 2 - 35,
            y: 20,
            size: 10,
            font: helvetica,
            color: rgb(0.4, 0.4, 0.4),
          });
        }

        // Apply watermark if specified
        if (watermarkText.trim()) {
          page.drawText(watermarkText.trim(), {
            x: width * 0.2,
            y: height * 0.45,
            size: 42,
            font: helveticaBold,
            color: rgb(0.85, 0.85, 0.85),
            rotate: degrees(35),
          });
        }
      }

      const modifiedBytes = await doc.save();
      const blob = new Blob([modifiedBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName.replace(/\.pdf$/i, "") + "_edited.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (e) {
      alert("Error compiling edited PDF: " + (e instanceof Error ? e.message : "Unknown error"));
    } finally {
      setIsProcessing(false);
    }
  };

  const currentAnnotations = annotations.filter((a) => a.pageIndex === currentPage);

  return (
    <div className="runner-stack space-y-6">
      {/* Upload Header / Quick Start */}
      {!pdfBytes ? (
        <div className="rounded-xl border border-dashed border-white/20 bg-white/[0.02] p-8 text-center">
          <FileText className="mx-auto h-12 w-12 text-[#c7f36b]" />
          <h3 className="mt-4 text-xl font-semibold text-white">Visual PDF Studio & Annotator</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/60">
            Fill forms, add text, whiteout/redact sensitive details, draw signatures, rotate pages, and add watermarks. 100% in-browser, zero server uploads.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <label className="signal-button inline-flex cursor-pointer items-center gap-2">
              <Upload size={16} />
              Choose PDF File
              <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
            </label>
            <button onClick={loadSamplePdf} className="reset-button inline-flex items-center gap-2">
              <Eye size={16} />
              Load Interactive Sample PDF
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* File summary & Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <div className="flex items-center gap-2">
              <FileCheck className="text-[#c7f36b]" size={18} />
              <span className="font-mono text-sm font-medium text-white">{fileName}</span>
              <span className="rounded bg-white/10 px-2 py-0.5 text-xs text-white/70">
                {numPages} {numPages === 1 ? "page" : "pages"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <label className="signal-button cursor-pointer py-1.5 px-3 text-xs">
                Open Another PDF
                <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
              </label>
              <button
                onClick={exportModifiedPdf}
                disabled={isProcessing}
                className="signal-button flex items-center gap-1.5 bg-[#c7f36b] text-[#0b1020] font-semibold hover:bg-[#b8eb55]"
              >
                {exportSuccess ? <Check size={16} /> : <Download size={16} />}
                {exportSuccess ? "Exported!" : "Export & Download PDF"}
              </button>
            </div>
          </div>

          {/* Editor Toolset */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            {/* Left Controls / Tools */}
            <div className="space-y-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 lg:col-span-1">
              <div>
                <p className="mono-label text-xs text-[#c7f36b]">01 · SELECT TOOL</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setActiveTool("select")}
                    className={`flex items-center gap-2 rounded-lg border p-2 text-xs font-medium transition-colors ${
                      activeTool === "select"
                        ? "border-[#c7f36b] bg-[#c7f36b]/10 text-[#c7f36b]"
                        : "border-white/10 bg-white/[0.02] text-white/80 hover:bg-white/5"
                    }`}
                  >
                    <Eye size={14} /> Select / View
                  </button>
                  <button
                    onClick={() => setActiveTool("text")}
                    className={`flex items-center gap-2 rounded-lg border p-2 text-xs font-medium transition-colors ${
                      activeTool === "text"
                        ? "border-[#c7f36b] bg-[#c7f36b]/10 text-[#c7f36b]"
                        : "border-white/10 bg-white/[0.02] text-white/80 hover:bg-white/5"
                    }`}
                  >
                    <Type size={14} /> Add Text / Form
                  </button>
                  <button
                    onClick={() => setActiveTool("whiteout")}
                    className={`flex items-center gap-2 rounded-lg border p-2 text-xs font-medium transition-colors ${
                      activeTool === "whiteout"
                        ? "border-[#c7f36b] bg-[#c7f36b]/10 text-[#c7f36b]"
                        : "border-white/10 bg-white/[0.02] text-white/80 hover:bg-white/5"
                    }`}
                  >
                    <Square size={14} /> Whiteout / Redact
                  </button>
                  <button
                    onClick={() => setActiveTool("draw")}
                    className={`flex items-center gap-2 rounded-lg border p-2 text-xs font-medium transition-colors ${
                      activeTool === "draw"
                        ? "border-[#c7f36b] bg-[#c7f36b]/10 text-[#c7f36b]"
                        : "border-white/10 bg-white/[0.02] text-white/80 hover:bg-white/5"
                    }`}
                  >
                    <PenTool size={14} /> Freehand Pen
                  </button>
                  <button
                    onClick={() => setActiveTool("stamp")}
                    className={`col-span-2 flex items-center justify-center gap-2 rounded-lg border p-2 text-xs font-medium transition-colors ${
                      activeTool === "stamp"
                        ? "border-[#c7f36b] bg-[#c7f36b]/10 text-[#c7f36b]"
                        : "border-white/10 bg-white/[0.02] text-white/80 hover:bg-white/5"
                    }`}
                  >
                    <Stamp size={14} /> Stamp / Stamp Note
                  </button>
                </div>
              </div>

              {/* Active Tool Config */}
              {activeTool === "text" && (
                <div className="space-y-2 rounded-lg border border-white/10 bg-black/20 p-3">
                  <span className="text-xs font-semibold text-white/90">Text Settings</span>
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span>Size: {fontSize}px</span>
                    <input
                      type="range"
                      min={10}
                      max={36}
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Color</span>
                    <div className="flex gap-1.5">
                      {["#1e293b", "#ef4444", "#2563eb", "#16a34a", "#ffffff"].map((c) => (
                        <button
                          key={c}
                          onClick={() => setTextColor(c)}
                          className={`h-5 w-5 rounded-full border border-white/40 ${textColor === c ? "ring-2 ring-[#c7f36b]" : ""}`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                  <label className="flex items-center gap-2 text-xs text-white/80">
                    <input type="checkbox" checked={isBold} onChange={(e) => setIsBold(e.target.checked)} />
                    Bold Font
                  </label>
                  <p className="text-[11px] text-white/50">Click on the document page to position your text.</p>
                </div>
              )}

              {activeTool === "whiteout" && (
                <div className="space-y-2 rounded-lg border border-white/10 bg-black/20 p-3">
                  <span className="text-xs font-semibold text-white/90">Blocker Color</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setWhiteoutColor("#ffffff")}
                      className={`flex-1 rounded border py-1 text-xs ${whiteoutColor === "#ffffff" ? "border-[#c7f36b] bg-white text-black" : "border-white/20 bg-white/5"}`}
                    >
                      White Box
                    </button>
                    <button
                      onClick={() => setWhiteoutColor("#000000")}
                      className={`flex-1 rounded border py-1 text-xs ${whiteoutColor === "#000000" ? "border-[#c7f36b] bg-black text-white" : "border-white/20 bg-white/5"}`}
                    >
                      Black Redact
                    </button>
                  </div>
                  <p className="text-[11px] text-white/50">Click and drag over any area on the page to hide it.</p>
                </div>
              )}

              {activeTool === "draw" && (
                <div className="space-y-2 rounded-lg border border-white/10 bg-black/20 p-3">
                  <span className="text-xs font-semibold text-white/90">Pen Settings</span>
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span>Width: {drawWidth}px</span>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={drawWidth}
                      onChange={(e) => setDrawWidth(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Ink Color</span>
                    <div className="flex gap-1.5">
                      {["#ef4444", "#2563eb", "#10b981", "#000000", "#c7f36b"].map((c) => (
                        <button
                          key={c}
                          onClick={() => setDrawColor(c)}
                          className={`h-5 w-5 rounded-full border border-white/40 ${drawColor === c ? "ring-2 ring-[#c7f36b]" : ""}`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-white/50">Click and drag directly on the page to draw or sign.</p>
                </div>
              )}

              {activeTool === "stamp" && (
                <div className="space-y-2 rounded-lg border border-white/10 bg-black/20 p-3">
                  <span className="text-xs font-semibold text-white/90">Stamp Content</span>
                  <select
                    value={stampText}
                    onChange={(e) => setStampText(e.target.value)}
                    className="w-full rounded border border-white/10 bg-black/40 p-1.5 text-xs text-white"
                  >
                    <option value="CONFIDENTIAL">CONFIDENTIAL</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="DRAFT">DRAFT</option>
                    <option value="PAID">PAID</option>
                    <option value="VERIFIED">VERIFIED</option>
                    <option value="FINAL COPY">FINAL COPY</option>
                  </select>
                  <div className="flex items-center justify-between text-xs">
                    <span>Color</span>
                    <div className="flex gap-1.5">
                      {["#ef4444", "#16a34a", "#2563eb", "#d97706"].map((c) => (
                        <button
                          key={c}
                          onClick={() => setStampColor(c)}
                          className={`h-5 w-5 rounded-full border border-white/40 ${stampColor === c ? "ring-2 ring-[#c7f36b]" : ""}`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-white/50">Click on the document page to place this stamp.</p>
                </div>
              )}

              {/* Page Controls */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <p className="mono-label text-xs text-white/60">PAGE OPERATIONS</p>
                <div className="flex gap-2">
                  <button
                    onClick={rotateCurrentPage}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded border border-white/10 bg-white/5 py-1.5 text-xs text-white hover:bg-white/10"
                  >
                    <RotateCw size={14} /> Rotate Page
                  </button>
                  <button
                    onClick={deleteCurrentPage}
                    className="flex items-center justify-center gap-1.5 rounded border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs text-red-300 hover:bg-red-500/20"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>

              {/* Document Additions */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <p className="mono-label text-xs text-white/60">WATERMARK & NUMBERING</p>
                <div>
                  <label className="text-[11px] text-white/70">Diagonal Watermark</label>
                  <input
                    type="text"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    placeholder="e.g. DRAFT or CONFIDENTIAL"
                    className="mt-1 w-full rounded border border-white/10 bg-black/40 p-1.5 text-xs text-white placeholder-white/30"
                  />
                </div>
                <label className="flex items-center gap-2 text-xs text-white/80 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={includePageNumbers}
                    onChange={(e) => setIncludePageNumbers(e.target.checked)}
                  />
                  Add Page Numbers (Page X of Y)
                </label>
              </div>

              {/* Page Annotations List */}
              {currentAnnotations.length > 0 && (
                <div className="pt-2 border-t border-white/10 space-y-1.5">
                  <p className="mono-label text-xs text-white/60">PAGE {currentPage + 1} EDITS ({currentAnnotations.length})</p>
                  <div className="max-h-32 space-y-1 overflow-y-auto pr-1">
                    {currentAnnotations.map((ann) => (
                      <div
                        key={ann.id}
                        className="flex items-center justify-between rounded bg-white/5 px-2 py-1 text-xs text-white/80"
                      >
                        <span className="truncate max-w-[120px]">
                          {ann.type === "text" ? `Text: "${ann.text}"` : ann.type === "stamp" ? `Stamp: ${ann.text}` : ann.type === "whiteout" ? "Whiteout Box" : "Pen Drawing"}
                        </span>
                        <button
                          onClick={() => deleteAnnotation(ann.id)}
                          className="text-red-400 hover:text-red-300 ml-2"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Main Interactive PDF Page Canvas */}
            <div className="space-y-3 lg:col-span-3">
              {/* Pagination controls */}
              <div className="flex items-center justify-between rounded-lg bg-black/30 px-4 py-2 border border-white/10">
                <button
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                  className="flex items-center gap-1 text-xs text-white/80 disabled:opacity-30 hover:text-white"
                >
                  <ArrowLeft size={14} /> Previous
                </button>
                <div className="flex items-center gap-2 text-xs font-mono text-white/90">
                  <span>Page {currentPage + 1} of {numPages}</span>
                  {pageRotations[currentPage] ? (
                    <span className="text-[10px] text-[#c7f36b] font-sans">({pageRotations[currentPage]}° rotated)</span>
                  ) : null}
                </div>
                <button
                  disabled={currentPage >= numPages - 1}
                  onClick={() => setCurrentPage((p) => Math.min(numPages - 1, p + 1))}
                  className="flex items-center gap-1 text-xs text-white/80 disabled:opacity-30 hover:text-white"
                >
                  Next <ArrowRight size={14} />
                </button>
              </div>

              {/* Viewport & Interactive Layer */}
              <div className="relative mx-auto max-w-full overflow-auto rounded-xl border border-white/15 bg-[#1e2230] p-4 flex justify-center shadow-2xl">
                <div className="relative inline-block select-none shadow-xl">
                  {/* Rendered PDF Page Canvas */}
                  <canvas ref={canvasRef} className="block rounded bg-white" />

                  {/* Interactive Drawing & Annotation Layer */}
                  <div
                    ref={overlayRef}
                    onMouseDown={handleOverlayMouseDown}
                    onMouseMove={handleOverlayMouseMove}
                    onMouseUp={handleOverlayMouseUp}
                    className={`absolute inset-0 cursor-${
                      activeTool === "text"
                        ? "text"
                        : activeTool === "draw" || activeTool === "whiteout"
                        ? "crosshair"
                        : activeTool === "stamp"
                        ? "cell"
                        : "default"
                    }`}
                  >
                    {/* Render active page annotations */}
                    {currentAnnotations.map((ann) => {
                      if (ann.type === "text") {
                        return (
                          <div
                            key={ann.id}
                            style={{
                              position: "absolute",
                              left: `${ann.x}%`,
                              top: `${ann.y}%`,
                              color: ann.color,
                              fontSize: `${ann.fontSize * 1.5}px`,
                              fontWeight: ann.isBold ? "bold" : "normal",
                              transform: "translate(-0%, -0%)",
                              pointerEvents: "none",
                              textShadow: "0 0 2px rgba(255,255,255,0.8)",
                            }}
                          >
                            {ann.text}
                          </div>
                        );
                      }
                      if (ann.type === "whiteout") {
                        return (
                          <div
                            key={ann.id}
                            style={{
                              position: "absolute",
                              left: `${ann.x}%`,
                              top: `${ann.y}%`,
                              width: `${ann.width}%`,
                              height: `${ann.height}%`,
                              backgroundColor: ann.color,
                              border: "1px dashed rgba(0,0,0,0.2)",
                              pointerEvents: "none",
                            }}
                          />
                        );
                      }
                      if (ann.type === "stamp") {
                        return (
                          <div
                            key={ann.id}
                            style={{
                              position: "absolute",
                              left: `${ann.x}%`,
                              top: `${ann.y}%`,
                              color: ann.color,
                              border: `2px solid ${ann.color}`,
                              padding: "2px 8px",
                              fontSize: "18px",
                              fontWeight: "bold",
                              borderRadius: "4px",
                              transform: "rotate(-15deg)",
                              pointerEvents: "none",
                              backgroundColor: "rgba(255,255,255,0.7)",
                            }}
                          >
                            {ann.text}
                          </div>
                        );
                      }
                      if (ann.type === "draw") {
                        const pathD = ann.points.reduce(
                          (acc, pt, idx) => `${acc} ${idx === 0 ? "M" : "L"} ${pt.x} ${pt.y}`,
                          ""
                        );
                        return (
                          <svg
                            key={ann.id}
                            className="pointer-events-none absolute inset-0 h-full w-full"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                          >
                            <path
                              d={pathD}
                              stroke={ann.color}
                              strokeWidth={ann.strokeWidth * 0.4}
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        );
                      }
                      return null;
                    })}

                    {/* Temporary drawing stroke */}
                    {activeTool === "draw" && isDrawing && currentPath.length > 1 && (
                      <svg
                        className="pointer-events-none absolute inset-0 h-full w-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <path
                          d={currentPath.reduce(
                            (acc, pt, idx) => `${acc} ${idx === 0 ? "M" : "L"} ${pt.x} ${pt.y}`,
                            ""
                          )}
                          stroke={drawColor}
                          strokeWidth={drawWidth * 0.4}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}

                    {/* Temporary whiteout drag box */}
                    {activeTool === "whiteout" && tempWhiteout && (
                      <div
                        style={{
                          position: "absolute",
                          left: `${tempWhiteout.x}%`,
                          top: `${tempWhiteout.y}%`,
                          width: `${tempWhiteout.w}%`,
                          height: `${tempWhiteout.h}%`,
                          backgroundColor: whiteoutColor,
                          border: "1px dashed #ef4444",
                          pointerEvents: "none",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
