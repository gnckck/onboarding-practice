import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  margin?: string;
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export function PaginationComponent({
  margin,
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - 2); // 4 부터 startPage 바뀌도록 적용
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const handlePrev = () => {
    if (currentPage === 1) {
      return handlePageChange(totalPages);
    }
    handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage === totalPages) {
      return;
    }
    handlePageChange(currentPage + 1);
  };

  return (
    <div className={`${margin}`}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrev} />
          </PaginationItem>

          {[...Array(maxVisiblePages)].map((_, index) => {
            const pageNumber = startPage + index;
            if (startPage + index <= totalPages) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    onClick={() => handlePageChange(pageNumber)}
                    isActive={currentPage === pageNumber}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            }
          })}

          <PaginationItem>
            <PaginationNext onClick={handleNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
