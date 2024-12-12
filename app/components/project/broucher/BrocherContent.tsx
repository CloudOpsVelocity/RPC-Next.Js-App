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
import { useSession } from "next-auth/react";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";

// PDF worker setup
pdfjs.GlobalWorkerOptions.workerSrc =
  process.env.NODE_ENV === "development"
    ? new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString()
    : `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

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
  singleBrocher?: string;
};

function BrocherContent({ phaseOverviewData, projName, singleBrocher }: Props) {
  const { data: session } = useSession();
  const [, { open: LoginOpen }] = usePopShortList();
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 660px)");

  const [state, setState] = useState<{
    activePhase: ProjectPhase;
    numPages: number | null;
    pageNumber: number;
    pageScale: number;
    blobCache: Record<number, string | null>;
    loading: boolean;
    errorMessage: string;
  }>(
    singleBrocher
      ? {
          activePhase: {
            id: 0,
            name: "Single Brochure",
            brochure: singleBrocher,
          },
          numPages: null,
          pageNumber: 1,
          pageScale: 1,
          blobCache: {},
          loading: false,
          errorMessage: "",
        }
      : {
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
        }
  );

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

  const ram =
    typeof navigator !== "undefined"
      ? ((navigator as any).deviceMemory as number)
      : 0;

  // If RAM is less than 4GB, render iframe instead
  if (ram && ram < 4) {
    return (
      <div className="w-[95%] sm:w-[90%] mx-auto my-4 sm:my-8 bg-gray-50">
        <h2 className="text-h2 sm:text-[22px] xl:text-[32px] font-semibold mb-[12px] capitalize break-words pl-3 pt-2">
          <span>Explore the Comprehensive Brochure of </span>
          <span className="text-[#148B16] font-bold">{projName}</span>
        </h2>

        <iframe
          src={singleBrocher || phaseOverviewData[0]?.phaseBrochureUrl || ""}
          className="w-full h-[400px] border-0"
          title={`${projName} Brochure`}
        />
      </div>
    );
  }

  const changePage = (offset: number) => {
    setState((prev) => ({ ...prev, pageNumber: prev.pageNumber + offset }));
  };

  const handleDownload = (url: string) => {
    if (!session) {
      LoginOpen(
        () => {
          url &&
            window.open(
              `/pdf/${encodeURIComponent(url.split(".net")[1])}`,
              "_blank"
            );
        },
        {
          type: "brochure",
          link: url,
        }
      );
      return;
    }
    window.open(url, "_blank");
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
    `px-1 py-1 text-xs sm:px-4 sm:py-2 sm:text-lg font-semibold rounded-lg transition-all duration-300 ${
      isActive
        ? "bg-[#0073C6] !text-white shadow-lg"
        : "bg-white text-[#0073C6] hover:bg-gray-50 border border-gray-300"
    } focus:z-10 focus:ring-2 focus:ring-[#0073C6] focus:text-[#0073C6] hover:scale-105`;

  if (singleBrocher) {
    return (
      <div
        className="w-[95%] sm:w-[90%] mx-auto my-4 sm:my-8 bg-gray-50 scroll-mt-[125px]"
        id="brochure"
      >
        <h2 className="text-h2 sm:text-[22px] xl:text-[32px] font-semibold mb-[12px] capitalize break-words pl-3 pt-2">
          <span>Explore the Comprehensive Brochure of </span>
          <span className="text-[#148B16] font-bold">{projName}</span>
        </h2>

        <div
          className="bg-white relative rounded-lg shadow-lg p-4 max-w-full mx-auto h-[350px] sm:h-[600px] flex flex-col justify-between items-center overflow-y-auto"
          ref={pdfContainerRef}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              if (singleBrocher) handleDownload(singleBrocher);
            }}
            className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 z-[1]"
          >
            <PopupOpenSvg className="w-[24px] h-[24px] lg:w-[36px] lg:h-[36px]" />
          </button>
          <div className="flex-grow w-full overflow-hidden flex justify-center items-center relative">
            {state.loading ? (
              <FaSpinner className="animate-spin text-[#0073C6] h-8 w-8" />
            ) : state.errorMessage ? (
              <p className="text-red-500">{state.errorMessage}</p>
            ) : (
              <Document
                className={"overscroll-y-scroll"}
                file={state.blobCache[0] || singleBrocher}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <FaSpinner className="animate-spin text-[#0073C6] h-8 w-8" />
                }
              >
                <Page
                  pageNumber={state.pageNumber}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="shadow-md rounded overflow-y-auto"
                  height={isMobile ? 300 : 520}
                  loading={
                    <FaSpinner className="animate-spin text-[#0073C6] h-8 w-8" />
                  }
                />
              </Document>
            )}
          </div>

          <div className="w-full flex items-center justify-center space-x-4 mt-4">
            <button
              onClick={() => changePage(-1)}
              disabled={
                state.pageNumber <= 1 || state.loading || state.pageNumber === 0
              }
              className={`bg-[#0073C6] text-white p-1 flex justify-center items-center rounded-full disabled:opacity-50 disabled:cursor-not-allowed ${
                state.loading ? "cursor-not-allowed" : "h-8 w-8"
              }`}
            >
              <FaChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center space-x-4 relative group">
              <span className="text-gray-600 font-bold">
                Page {state.pageNumber} of {state.numPages || "--"}
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (singleBrocher) handleDownload(singleBrocher);
                }}
                className={`bg-[#0073C6] text-white px-3 py-1 rounded-full flex items-center space-x-2 transition-all duration-300 ease-in-out transform group-hover:scale-105 hover:shadow-lg ${
                  state.loading ? "cursor-not-allowed" : ""
                }`}
                aria-label={`Download ${projName} brochure`}
              >
                <FaDownload className="h-4 w-4" />
                <span className="hidden sm:inline">Download Brochure</span>
              </button>
            </div>
            <button
              onClick={() => changePage(1)}
              disabled={state.pageNumber >= state.numPages! || state.loading}
              className={`bg-[#0073C6] text-white p-1 flex justify-center items-center rounded-full disabled:opacity-50 disabled:cursor-not-allowed ${
                state.loading ? "cursor-not-allowed" : "h-8 w-8"
              }`}
            >
              <FaChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-[95%] sm:w-[90%] mx-auto my-4 sm:my-8 bg-gray-50 scroll-mt-[125px] relative"
      id="brochure"
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          if (state.activePhase.brochure)
            handleDownload(state.activePhase.brochure);
        }}
        className="absolute  bottom-1 right-1 sm:bottom-2  sm:right-2 z-[1]"
      >
        <PopupOpenSvg className="w-[24px] h-[24px] lg:w-[36px] lg:h-[36px] " />
      </button>
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
                  className={` ${buttonClasses(
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
                className="shadow-md rounded "
                loading={
                  <FaSpinner className="animate-spin text-[#0073C6] h-8 w-8" />
                }
                height={isMobile ? 270 : 520}
              />
            </Document>
          )}
        </div>

        <div className="w-full flex items-center justify-center mt-4">
          <div className="flex items-center space-x-4 relative group">
            <button
              onClick={() => changePage(-1)}
              disabled={state.pageNumber <= 1 || state.loading}
              className={`bg-[#0073C6] text-white p-1 flex justify-center items-center rounded-full h-8 w-8 ${
                (state.pageNumber <= 1 || state.loading) &&
                "opacity-50 cursor-not-allowed"
              }`}
            >
              <FaChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-gray-600 font-bold">
              Page {state.pageNumber} of {state.numPages || "--"}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                if (state.activePhase.brochure)
                  handleDownload(state.activePhase.brochure);
              }}
              className={`bg-[#0073C6] text-white px-3 py-1 rounded-full flex items-center space-x-2 transition-all duration-300 ease-in-out transform group-hover:scale-105 hover:shadow-lg ${
                state.loading ? "cursor-not-allowed" : ""
              }`}
              aria-label={`Download ${state.activePhase.name} brochure`}
            >
              <FaDownload className="h-4 w-4" />
              <span className="hidden sm:inline">Download Brochure</span>
            </button>
            <button
              onClick={() => changePage(1)}
              disabled={state.pageNumber >= state.numPages! || state.loading}
              className={`bg-[#0073C6] text-white p-1 flex justify-center items-center rounded-full h-8 w-8 ${
                (state.pageNumber >= state.numPages! || state.loading) &&
                "opacity-50 cursor-not-allowed"
              }`}
            >
              <FaChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(BrocherContent);
