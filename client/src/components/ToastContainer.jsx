import React from "react";
import { useToast } from "@/components/hooks/use-toast";

const ToastContainer = () => {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {toasts
        .filter((toast) => toast.open) // Only render open toasts
        .map((toast) => (
          <div
            key={toast.id}
            className={`relative flex w-full max-w-sm items-center gap-4 rounded-lg border p-4 shadow-lg ${
              toast.variant === "success"
                ? "bg-green-100 text-green-800 border-green-300"
                : toast.variant === "error"
                ? "bg-red-100 text-red-800 border-red-300"
                : "bg-gray-100 text-gray-800 border-gray-300"
            }`}
          >
            {/* Icon */}
            <div>
              {toast.variant === "success" ? (
                <svg
                  className="h-5 w-5 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : toast.variant === "error" ? (
                <svg
                  className="h-5 w-5 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M3 14h18"
                  />
                </svg>
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              {toast.title && <h4 className="font-semibold">{toast.title}</h4>}
              {toast.description && (
                <p className="text-sm">{toast.description}</p>
              )}
            </div>

            {/* Dismiss Button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
              onClick={() => dismiss(toast.id)}
              aria-label="Close"
            >
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
    </div>
  );
};

export default ToastContainer;
