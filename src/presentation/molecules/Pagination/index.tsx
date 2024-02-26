import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { PaginatorTypes } from "~/domain/models/paginator";
import { classNames } from "~/presentation/helpers";

import { DOTS, usePagination } from "./use-pagination";

type Props = {
  value: PaginatorTypes.Pagination;
};

export const Pagination: React.FC<Props> = (props) => {
  const router = useRouter();

  const paginationRange = usePagination({
    currentPage: props.value.currentPage,
    totalCount: props.value.total,
    siblingCount: 1,
    pageSize: props.value.perPage,
  });

  if (!paginationRange) return [];

  // If there are less than 2 times in pagination range we shall not render the component
  if (props.value.currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];
  const previousIsDisabled = props.value.currentPage === 1;
  const nextIsDisabled = props.value.currentPage === lastPage;
  const currentStyle = "z-10 bg-indigo-50 border-indigo-500 text-indigo-600";
  const defaultStyle =
    "bg-white border-gray-300 text-gray-500 hover:bg-gray-50";

  return (
    <div className="bg-white px-0 py-3 flex items-center justify-between mt-2 sm:mt-0 sm:border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <Link
          passHref
          href={{
            query: !previousIsDisabled
              ? { ...router.query, page: props.value.currentPage - 1 }
              : null,
          }}
        >
          <a
            className={classNames(
              "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white hover:bg-gray-50",
              previousIsDisabled
                ? "text-gray-200 pointer-events-none"
                : "text-gray-500",
            )}
          >
            Anterior
          </a>
        </Link>
        <Link
          passHref
          href={{
            query: !nextIsDisabled
              ? { ...router.query, page: props.value.currentPage + 1 }
              : null,
          }}
        >
          <a
            className={classNames(
              "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white hover:bg-gray-50",
              nextIsDisabled
                ? "text-gray-200 pointer-events-none"
                : "text-gray-500",
            )}
          >
            Próximo
          </a>
        </Link>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            <span className="font-medium">{props.value.total}&nbsp;</span>
            resultados encontrados
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <Link
              passHref
              href={{
                query: !previousIsDisabled
                  ? { ...router.query, page: props.value.currentPage - 1 }
                  : null,
              }}
            >
              <a
                className={classNames(
                  "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50",
                  previousIsDisabled
                    ? "text-gray-200 pointer-events-none"
                    : "text-gray-500",
                )}
                aria-disabled
              >
                <span className="sr-only">Anterior</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </Link>

            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {paginationRange.map((pageNumber) => {
              if (pageNumber === DOTS) {
                return (
                  <span
                    key={pageNumber}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                  >
                    &#8230;
                  </span>
                );
              }

              return (
                <Link
                  passHref
                  key={pageNumber}
                  href={{ query: { ...router.query, page: pageNumber } }}
                >
                  <a
                    className={classNames(
                      "relative inline-flex items-center px-4 py-2 border text-sm font-medium",
                      pageNumber === props.value.currentPage
                        ? currentStyle
                        : defaultStyle,
                    )}
                  >
                    {pageNumber}
                  </a>
                </Link>
              );
            })}

            {/* <a
              href="#"
              aria-current="page"
              className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              1
            </a>

            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              ...
            </span>
             */}
            <Link
              passHref
              href={{
                query: !nextIsDisabled
                  ? { ...router.query, page: props.value.currentPage + 1 }
                  : null,
              }}
            >
              <a
                className={classNames(
                  "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50",
                  nextIsDisabled
                    ? "text-gray-200 pointer-events-none"
                    : "text-gray-500",
                )}
                aria-disabled
              >
                <span className="sr-only">Próximo</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};
