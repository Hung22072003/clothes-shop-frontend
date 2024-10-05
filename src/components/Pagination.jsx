/* This example requires Tailwind CSS v2.0+ */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
const PaginatedNumbers = ({ totalPages, page, changePage, maxPageNumberLimit, minPageNumberLimit }) => {
    return Array.from({ length: totalPages }, (num, index) => {
        console.log(index);
        if (index < maxPageNumberLimit + 1 && index > minPageNumberLimit)
            return (
                <button
                    onClick={() => changePage(index)}
                    className={`${page === index ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'} relative inline-flex items-center border border-gray-300 px-4 py-2 text-sm font-medium`}
                >
                    {index}{' '}
                </button>
            );
        else {
            return null;
        }
    });
};

export default function Pagination({
    totalPages,
    pageSize,
    page,
    changePage,
    incrementPage,
    decrementPage,
    minPageNumberLimit,
    maxPageNumberLimit,
}) {
    return (
        <div className="my-[15px] flex items-center justify-center">
            <div className="flex flex-1 justify-between sm:hidden">
                <a
                    href="/"
                    onClick={decrementPage}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </a>
                <a
                    href="/"
                    onClick={incrementPage}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:items-center sm:justify-center">
                <div>
                    <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            disabled={page === 1}
                            onClick={decrementPage}
                            className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <span className="sr-only">Previous</span>
                            <FontAwesomeIcon className="h-5 w-5" icon={faChevronLeft} />
                        </button>
                        <PaginatedNumbers
                            totalPages={totalPages}
                            changePage={changePage}
                            page={page}
                            minPageNumberLimit={minPageNumberLimit}
                            maxPageNumberLimit={maxPageNumberLimit}
                        />
                        <button
                            disabled={page === totalPages - 1}
                            onClick={incrementPage}
                            className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <span className="sr-only">Next</span>
                            <FontAwesomeIcon className="h-5 w-5" icon={faChevronRight} />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}
