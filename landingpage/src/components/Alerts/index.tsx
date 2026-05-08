"use client";

import React, { useState } from "react";
type Props = {
  type?: "default" | "success" | "danger" | "warning" | "ghost";
  closeable?: boolean;
  children?: any;
  textClassName?: string;
  hideIcon?: boolean;
};
export default function Alert({
  type,
  closeable,
  children,
  hideIcon,
  textClassName,
}: Props) {
  const [show, setShow] = useState(true);
  if (!show) return null;

  switch (type) {
    case "success":
      return (
        <div
          className="flex items-center w-full p-4 text-green-800 rounded-b-lg bg-green-50 "
          role="alert"
        >
          {!hideIcon && (
            <svg
              className="flex-shrink-0 w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
          )}
          <span className="sr-only">Info</span>
          <div
            className={
              "ms-3 text-xs xl:text-sm font-medium w-full " + textClassName
            }
          >
            {children}
          </div>
          {closeable && (
            <button
              onClick={() => setShow(false)}
              type="button"
              className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-b-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8"
              data-dismiss-target="#alert-3"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          )}
        </div>
      );
    case "danger":
      return (
        <div
          className="flex items-center w-full p-4 text-red-800 rounded-b-lg bg-red-50 "
          role="alert"
        >
          {!hideIcon && (
            <svg
              className="flex-shrink-0 w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
          )}
          <span className="sr-only">Info</span>
          <div
            className={
              "ms-3 text-xs xl:text-sm font-medium w-full " + textClassName
            }
          >
            {children}
          </div>
          {closeable && (
            <button
              onClick={() => setShow(false)}
              type="button"
              className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-b-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8"
              data-dismiss-target="#alert-2"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          )}
        </div>
      );
    case "warning":
      return (
        <div
          className="flex items-center w-full p-4 text-yellow-800 rounded-b-lg bg-Moss/50 "
          role="alert"
        >
          {!hideIcon && (
            <svg
              className="flex-shrink-0 w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
          )}
          <span className="sr-only">Info</span>
          <div
            className={
              "ms-3 text-xs xl:text-sm font-medium w-full " + textClassName
            }
          >
            {children}
          </div>
          {closeable && (
            <button
              onClick={() => setShow(false)}
              type="button"
              className="ms-auto -mx-1.5 -my-1.5 bg-yellow-50 text-yellow-500 rounded-b-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex items-center justify-center h-8 w-8"
              data-dismiss-target="#alert-4"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          )}
        </div>
      );
    case "ghost":
      return (
        <div
          className="flex items-center w-full p-4 rounded-b-lg bg-gray-50"
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-4 h-4 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div className="ms-3 text-xs xl:text-sm font-medium text-gray-800 ">
            A simple dark alert with an{" "}
            <a href="#" className="font-semibold underline hover:no-underline">
              example link
            </a>
            . Give it a click if you like.
          </div>
          {closeable && (
            <button
              onClick={() => setShow(false)}
              type="button"
              className="ms-auto -mx-1.5 -my-1.5 bg-gray-50 text-gray-500 rounded-b-lg focus:ring-2 focus:ring-gray-400 p-1.5 hover:bg-gray-200 inline-flex items-center justify-center h-8 w-8"
              data-dismiss-target="#alert-5"
              aria-label="Close"
            >
              <span className="sr-only">Dismiss</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          )}
        </div>
      );

    default:
      return (
        <div
          className="flex items-center w-full p-4 text-blue-800 rounded-b-lg bg-blue-50 "
          role="alert"
        >
          {!hideIcon && (
            <svg
              className="flex-shrink-0 w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
          )}
          <span className="sr-only">Info</span>
          <div
            className={
              "ms-3 text-xs xl:text-sm font-medium w-full " + textClassName
            }
          >
            {children}
          </div>
          {closeable && (
            <button
              onClick={() => setShow(false)}
              type="button"
              className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-b-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8"
              data-dismiss-target="#alert-1"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          )}
        </div>
      );
  }
}
