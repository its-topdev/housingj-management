import { useRef, useEffect } from 'react';

export const useDraggable = (isLoading) => {
  const tableRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (event) => {
    isDragging.current = true;
    startX.current = event.pageX - tableRef.current.offsetLeft;
    scrollLeft.current = tableRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = (event) => {
    isDragging.current = false;
  };

  const handleMouseMove = (event) => {
    if (!isDragging.current) {
      return;
    }

    const x = event.pageX - tableRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    tableRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleClick = (event) => {
    if (Math.abs(event.pageX - startX.current - tableRef.current.offsetLeft) > 5) {
      event.stopPropagation();
    }
  };

  useEffect(() => {
    if (!isLoading && tableRef.current) {
      tableRef.current.addEventListener('mousedown', handleMouseDown);
      tableRef.current.addEventListener('mouseleave', handleMouseLeave);
      tableRef.current.addEventListener('click', handleClick);
      tableRef.current.addEventListener('mouseup', handleMouseUp);
      tableRef.current.addEventListener('mousemove', handleMouseMove);

      return () => {
        if (tableRef.current) {
          tableRef.current.removeEventListener('mousedown', handleMouseDown);
          tableRef.current.removeEventListener('mouseleave', handleMouseLeave);
          tableRef.current.removeEventListener('click', handleClick);
          tableRef.current.removeEventListener('mouseup', handleMouseUp);
          tableRef.current.removeEventListener('mousemove', handleMouseMove);
        }
      };
    }
  }, [isLoading]);

  return { tableRef };
}
