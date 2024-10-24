"use client";
import React, { useEffect, useState, useRef, useCallback, memo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaSpinner,
} from "react-icons/fa";
import { PopupOpenSvg } from "@/app/images/commonSvgs";
import { useMediaQuery } from "@mantine/hooks";

// PDF worker setup
pdfjs.GlobalWorkerOptions.workerSrc =
  process.env.NODE_ENV === "development"
    ? new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString()
    : `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// ProjectPhase interface
interface ProjectPhase {
  id: number;
  name: string;
  brochure: string | null;
}
interface PhaseOverview {
  phaseId: number;
  phaseName: string | null;
  phaseBrochureUrl: string | null;
}

type Props = {
  projName: string;
  phaseOverviewData: PhaseOverview[];
}

 function BrocherContent({phaseOverviewData,projName}: Props) {
  const [state, setState] = useState<{
    activePhase: ProjectPhase;
    numPages: number | null;
    pageNumber: number;
    pageScale: number;
    blobCache: Record<number, string | null>;
    loading: boolean;
    errorMessage: string;
  }>({
    activePhase: {
      id: phaseOverviewData[0].phaseId,
      name: phaseOverviewData[0].phaseName || "Phase 1",
      brochure: phaseOverviewData[0].phaseBrochureUrl,
    },
    numPages: null,
    pageNumber: 1,
    pageScale: 1,
    blobCache: {},
    loading: false,
    errorMessage: "",
  });

  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const adjustPageScale = useCallback(() => {
    if (pdfContainerRef.current) {
      const containerHeight = pdfContainerRef.current.clientHeight;
      const containerWidth = pdfContainerRef.current.clientWidth;
      const scale = Math.min(containerWidth / 800, containerHeight / 1200);
      setState((prev) => ({ ...prev, pageScale: scale }));
    }
  }, []);
  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setState((prev) => ({ ...prev, numPages, pageNumber: 1 }));
      adjustPageScale();
    },
    [adjustPageScale]
  );

  useEffect(() => {
    const handleResize = () => adjustPageScale();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [adjustPageScale]);

  const changePage = (offset: number) => {
    setState((prev) => ({ ...prev, pageNumber: prev.pageNumber + offset }));
  };

  const loadPDF = async (phase: ProjectPhase) => {
    if (state.activePhase.id === phase.id) return;

    setState((prev) => ({
      ...prev,
      activePhase: phase,
      pageNumber: 1,
      loading: true,
    }));

    try {
      if (!state.blobCache[phase.id]) {
        if (!phase.brochure) throw new Error("Brochure URL not available");
        const response = await fetch(phase.brochure);
        if (!response.ok) throw new Error("Failed to fetch PDF");
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        setState((prev) => ({
          ...prev,
          blobCache: { ...prev.blobCache, [phase.id]: blobUrl },
          errorMessage: "",
        }));
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        errorMessage: "Error loading PDF. Please try again.",
      }));
      console.error("Error loading PDF:", error);
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const buttonClasses = (isActive: boolean) =>
    `px-4 py-2 text-lg font-semibold rounded-lg transition-all duration-300 ${
      isActive
        ? "bg-[#0073C6] !text-white shadow-lg"
        : "bg-white text-[#0073C6] hover:bg-gray-50 border border-gray-300"
    } focus:z-10 focus:ring-2 focus:ring-[#0073C6] focus:text-[#0073C6] hover:scale-105`;

  const isMobile = useMediaQuery("(max-width: 660px)");
  return (
    <div className="w-[95%] sm:w-[90%] mx-auto my-4 sm:my-8 bg-gray-50">
    <h2 className="text-h2 sm:text-[22px] xl:text-[32px] font-semibold mb-[12px] capitalize break-words pl-3 pt-2">
      <span>Explore the Comprehensive Brochures of </span>
      <span className="text-[#148B16] font-bold">{projName}</span>
    </h2>

    <div className="mb-1 flex-wrap pl-3">
      <div
        className="inline-flex rounded-md shadow-sm space-x-2"
        role="group"
      >
        {phaseOverviewData.map(
          (phase) =>
            phase.phaseBrochureUrl && (
              <button
                key={phase.phaseId}
                onClick={() =>
                  loadPDF({
                    id: phase.phaseId,
                    name: phase.phaseName || `Phase ${phase.phaseId}`,
                    brochure: phase.phaseBrochureUrl,
                  })
                }
                className={`${buttonClasses(
                  state.activePhase.id === phase.phaseId
                )} ${
                  phase.phaseId === phaseOverviewData.length
                    ? "rounded-r-lg"
                    : ""
                }`}
                aria-pressed={state.activePhase.id === phase.phaseId}
              >
                <span className="hidden sm:inline-flex"> {projName} : </span>{" "}
                {phase.phaseName || `Phase ${phase.phaseId}`}
              </button>
            )
        )}
      </div>
    </div>

    <div
      className="bg-white rounded-lg shadow-lg p-4 max-w-full mx-auto h-[350px] sm:h-[600px] flex flex-col justify-between items-center overflow-y-auto"
      ref={pdfContainerRef}
    >
      <div className="flex-grow w-full overflow-hidden flex justify-center items-center relative">
        <a
          href={state.activePhase.brochure || "#"}
          target="_blank"
          download
          className="absolute top-0 right-0"
        >
          <PopupOpenSvg className="w-[24px] h-[24px] lg:w-[36px] lg:h-[36px]" />
        </a>

        {state.loading ? (
          <FaSpinner className="animate-spin text-[#0073C6] h-8 w-8" />
        ) : state.errorMessage ? (
          <p className="text-red-500">{state.errorMessage}</p>
        ) : (
          <Document
            className={"overscroll-y-scroll"}
            key={state.activePhase.id}
            file={
              state.blobCache[state.activePhase.id] ||
              state.activePhase.brochure
            }
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <FaSpinner className="animate-spin text-[#0073C6] h-8 w-8" />
            }
          >
            <Page
              pageNumber={state.pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              scale={isMobile ? 0.4 : 0.7}
              className="shadow-md rounded overflow-y-auto"
            />
          </Document>
        )}
      </div>

      <div className="w-full flex items-center justify-between mt-4">
        <button
          onClick={() => changePage(-1)}
          disabled={state.pageNumber <= 1 || state.loading}
          className={`bg-[#0073C6] text-white p-1 flex justify-center items-center rounded-full ${
            state.loading ? "cursor-not-allowed" : "h-8 w-8"
          }`}
        >
          <FaChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center space-x-4 relative group">
          <span className="text-gray-600 font-bold">
            Page {state.pageNumber} of {state.numPages || "--"}
          </span>
          <a
            href={state.activePhase.brochure || "#"}
            target="_blank"
            download
            className={`bg-[#0073C6] text-white px-3 py-1 rounded-full flex items-center space-x-2 transition-all duration-300 ease-in-out transform group-hover:scale-105 hover:shadow-lg ${
              state.loading ? "cursor-not-allowed" : ""
            }`}
            aria-label={`Download ${state.activePhase.name} brochure`}
          >
            <FaDownload className="h-4 w-4" />
            <span className="hidden sm:inline">Download Brochure</span>
          </a>
        </div>
        <button
          onClick={() => changePage(1)}
          disabled={state.pageNumber >= state.numPages! || state.loading}
          className={`bg-[#0073C6] text-white p-1 flex justify-center items-center rounded-full ${
            state.loading ? "cursor-not-allowed" : "h-8 w-8"
          }`}
        >
          <FaChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
  )
}

export default memo(BrocherContent)