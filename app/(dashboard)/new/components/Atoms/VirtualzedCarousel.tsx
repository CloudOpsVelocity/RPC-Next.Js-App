import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ImgCarouselIcon, PrevCarouselIcon } from "@/app/images/commonSvgs";
import { CarouseSelArrowIcon } from "@/app/images/HomePageIcons";

interface ColumnVirtualizerFixedProps {
  items: any[];
  itemCount?: number;
  itemSize?: number;
  gapSize?: number;
  overscan?: number;
  height?: number;
  renderItem?: (item: any, index: number) => React.ReactNode;
}

const HomePageVirtualCarousel: React.FC<ColumnVirtualizerFixedProps> = ({
  items,
  itemCount = items.length,
  itemSize = 100,
  gapSize = 16,
  overscan = 5,
  height = 100,
  renderItem,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const effectiveItemSize = useMemo(
    () => itemSize + gapSize,
    [itemSize, gapSize]
  );

  const columnVirtualizer = useVirtualizer({
    count: itemCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => effectiveItemSize,
    horizontal: true,
    overscan,
  });

  const totalWidth = useMemo(
    () => columnVirtualizer.getTotalSize() - gapSize,
    [columnVirtualizer, gapSize]
  );

  const scrollTo = useCallback((scrollOffset: number) => {
    if (parentRef.current) {
      parentRef.current.scrollTo({
        left: parentRef.current.scrollLeft + scrollOffset,
        behavior: "smooth",
      });
    }
  }, []);

  const isAtStart = useCallback(
    () => (parentRef.current ? parentRef.current.scrollLeft <= 1 : false),
    []
  );

  const isAtEnd = useCallback(
    () =>
      parentRef.current
        ? parentRef.current.scrollLeft + parentRef.current.clientWidth >=
          totalWidth - 1
        : false,
    [totalWidth]
  );

  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      setIsDragging(true);
      const pageX = "touches" in e ? e.touches[0].pageX : e.pageX;
      setStartX(pageX);
      setScrollLeft(parentRef.current?.scrollLeft || 0);
    },
    []
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrag = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const pageX = "touches" in e ? e.touches[0].pageX : e.pageX;
      const walk = (startX - pageX) * 1.5; // Adjust sensitivity if needed
      if (parentRef.current) {
        parentRef.current.scrollLeft = scrollLeft + walk;
      }
    },
    [isDragging, startX, scrollLeft]
  );

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mouseup", handleGlobalMouseUp);
    document.addEventListener("touchend", handleGlobalMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, []);

  return (
    <div className="relative">
      {itemCount > 3 && (
        <button
          onClick={() => scrollTo(-effectiveItemSize)}
          disabled={isAtStart()}
          className={`absolute -left-10 top-1/2 transform -translate-y-1/2 rounded z-10 ${
            isAtStart() ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <CarouseSelArrowIcon className="rotate-180" />

        </button>
      )}

      <div
        ref={parentRef}
        className="mx-auto floorplan flex justify-start items-center scrollbar-hide"
        style={{
          width: "100%",
          height: `${height}px`,
          overflow: "auto",
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDrag}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDrag}
        onTouchEnd={handleDragEnd}
      >
        <div
          style={{
            width: `${totalWidth}px`,
            height: "100%",
            position: "relative",
          }}
          className="scrollbar-hide"
        >
          {columnVirtualizer.getVirtualItems().map((virtualColumn) => (
            <div
              key={virtualColumn.key}
              className={
                virtualColumn.index % 2 ? "ListItemOdd" : "ListItemEven"
              }
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: `${itemSize}px`,
                transform: `translateX(${virtualColumn.start}px)`,
              }}
            >
              {renderItem
                ? renderItem(items[virtualColumn.index], virtualColumn.index)
                : `Column ${virtualColumn.index}`}
            </div>
          ))}
        </div>
      </div>

      {itemCount > 3 && (
        <button
          onClick={() => scrollTo(effectiveItemSize)}
          disabled={isAtEnd()}
          className={`absolute -right-10 top-1/2 transform -translate-y-1/2 rounded z-10 ${
            isAtEnd() ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
            <CarouseSelArrowIcon />
        </button>
      )}
    </div>
  );
};

export default HomePageVirtualCarousel;
