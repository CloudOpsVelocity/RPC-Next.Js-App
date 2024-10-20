import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FaChevronLeft, FaChevronRight, FaDownload } from 'react-icons/fa';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface ProjectPhase {
  id: number;
  name: string;
  brochure: string;
}

const projectPhases: ProjectPhase[] = [
  {
    id: 1,
    name: 'Phase 1',
    brochure: 'https://d2l0lb5gc1bw3t.cloudfront.net/residential/projects/bengaluru/147/project-for-image-testing-data-panathur-brochure.pdf?v=1728914977385',
  },
  {
    id: 2,
    name: 'Phase 2',
    brochure: 'https://www.coca-colacompany.com/content/dam/company/us/en/reports/coca-cola-business-environmental-social-governance-report-2021.pdf',
  },
  {
    id: 3,
    name: 'Phase 3',
    brochure: 'https://d2l0lb5gc1bw3t.cloudfront.net/images/varify/soc/7/brochure/brochure.pdf?v=1726818643832',
  },
];

export default function ColorfulProjectBrochures(): JSX.Element {
  const [activePhase, setActivePhase] = useState<ProjectPhase>(projectPhases[0]);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageScale, setPageScale] = useState<number>(1);
  const [blobCache, setBlobCache] = useState<Record<number, string | null>>({});
  const pdfContainerRef = useRef<HTMLDivElement>(null);
   
  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1); // Reset page number to 1 when a new document loads
    adjustPageScale();
  }, []);

  const adjustPageScale = useCallback((): void => {
    if (pdfContainerRef.current) {
      const containerHeight = pdfContainerRef.current.clientHeight;
      const containerWidth = pdfContainerRef.current.clientWidth;
      const scale = Math.min(containerWidth / 800, containerHeight / 1200);
      setPageScale(scale);
    }
  }, []);

  useEffect(() => {
    const handleResize = (): void => adjustPageScale();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [adjustPageScale]);

  const changePage = useCallback((offset: number): void => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }, []);

  const loadPDF = useCallback(async (phase: ProjectPhase) => {
    setActivePhase(phase);
    setPageNumber(1); // Reset page number to 1 when phase changes
    // Check if PDF is already cached as Blob
    if (!blobCache[phase.id]) {
      const response = await fetch(phase.brochure);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setBlobCache((prevCache) => ({
        ...prevCache,
        [phase.id]: blobUrl,
      }));
    }
  }, [blobCache]);

  const buttonClasses = useMemo(() => {
    return (isActive: boolean) => 
      `px-4 py-2 text-sm font-medium ${isActive ? 
        'bg-gradient-to-r from-blue-500 to-teal-400 text-white' : 
        'bg-white text-gray-700 hover:bg-gray-50'} border border-gray-200 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:text-blue-700`;
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Project Brochures</h2>
      
      <div className="mb-6 flex justify-center">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          {projectPhases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => loadPDF(phase)} // Use loadPDF function
              className={`${buttonClasses(activePhase.id === phase.id)} ${
                phase.id === 1 ? 'rounded-l-lg' : ''
              } ${phase.id === projectPhases.length ? 'rounded-r-lg' : ''}`}
            >
              {phase.name}
            </button>
          ))}
        </div>
      </div>

      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto h-[600px] flex flex-col justify-between items-center"
        ref={pdfContainerRef}
      >
        <div className="flex-grow w-full overflow-hidden flex justify-center items-center">
          <Document
            file={blobCache[activePhase.id] ||  activePhase.brochure} // Use cached PDF if available
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              scale={pageScale}
              className="shadow-md rounded"
            />
          </Document>
        </div>

        <div className="w-full flex items-center justify-between mt-4">
          <button
            onClick={() => changePage(-1)}
            disabled={pageNumber <= 1}
            className="bg-blue-500 text-white p-2 rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            <FaChevronLeft className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-4 relative group">
            <span className="text-gray-600">
              Page {pageNumber} of {numPages || '--'}
            </span>
            <a
              href={activePhase.brochure}
              download
              className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-5 py-2 rounded-full flex items-center space-x-2 transition-all duration-300 ease-in-out transform group-hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              <FaDownload className="h-5 w-5 group-hover:animate-bounce" />
              <span>Download</span>
            </a>
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Download PDF
            </span>
          </div>
          <button
            onClick={() => changePage(1)}
            disabled={pageNumber >= (numPages || 0)}
            className="bg-blue-500 text-white p-2 rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            <FaChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
