import { FC } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import classNames from 'classnames';

interface Props {
  currentPage: number;
  totalPages: number;
  pageNeighbours: number;
  onNextPage: any;
  onPreviousPage: any;
  onGoToPage: any;
  totalResults: number;
  limit: number;
}

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const Pagination: FC<Props> = ({
  currentPage,
  totalPages,
  pageNeighbours,
  onNextPage,
  onPreviousPage,
  onGoToPage,
  totalResults,
  limit,
}: Props) => {
  /**
   * Let's say we have 10 pages and we set pageNeighbours to 2
   * Given that the current page is 6
   * The pagination control will look like the following:
   *
   * (1) < {4 5} [6] {7 8} > (10)
   *
   * (x) => terminal pages: first and last page(always visible)
   * [x] => represents current page
   * {...x} => represents page neighbours
   */
  const getPageNumbers = () => {
    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  let initShowNumber = 0;
  if (totalResults > 0) {
    initShowNumber = (currentPage - 1) * limit + 1;
  }
  const endShowNumber =
    (currentPage - 1) * limit + limit > totalResults ? totalResults : (currentPage - 1) * limit + limit;

  const pages = getPageNumbers();

  return (
    <div className="px-4 py-3 flex items-center justify-between dark:border-gray-700 sm:px-8">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:text-primary-100"
          onClick={() => onPreviousPage()}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:text-primary-100"
          onClick={() => onNextPage()}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between w-full">
        {/* <div>
          <p className="text-sm text-gray-700 dark:text-gray-200">
            Showing <span className="font-medium">{initShowNumber}</span> to{' '}
            <span className="font-medium">{endShowNumber}</span> of <span className="font-medium">{totalResults}</span>{' '}
            results
          </p>
        </div>*/}
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            {pages.map((page, index) => {
              if (page === LEFT_PAGE)
                return (
                  <button
                    key={index}
                    className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
                    onClick={() => onPreviousPage()}
                    disabled={currentPage === 1}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                );

              if (page === RIGHT_PAGE)
                return (
                  <button
                    key={index}
                    className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
                    onClick={() => onNextPage()}
                    disabled={currentPage === totalPages}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                );

              return (
                <button
                  key={index}
                  aria-current="page"
                  className={classNames(
                    currentPage === page
                      ? 'z-10 bg-primary-50 border-primary-500 text-primary-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium dark:bg-gray-900 dark:border-gray-700'
                      : '',
                    currentPage !== page
                      ? 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium dark:bg-gray-900 dark:border-gray-700'
                      : '',
                    '',
                  )}
                  onClick={() => onGoToPage(page)}
                >
                  {page}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
