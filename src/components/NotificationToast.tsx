import React from "react";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  text: string;
  type: "success" | "error" | "info";
}

interface NotificationToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export default function NotificationToast({ toasts, onRemove }: NotificationToastProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full font-sans">
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isError = toast.type === "error";

        return (
          <div
            key={toast.id}
            className={`flex items-start gap-3 p-4 rounded-xl border shadow-xl transition-all duration-300 transform translate-y-0 animate-fade-in-up ${
              isSuccess
                ? "bg-neutral-900 border-green-500/30 text-white"
                : isError
                ? "bg-neutral-900 border-red-500/30 text-white"
                : "bg-neutral-900 border-gold/30 text-white"
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {isSuccess ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : isError ? (
                <AlertTriangle className="w-5 h-5 text-red-500" />
              ) : (
                <Info className="w-5 h-5 text-gold" />
              )}
            </div>
            
            <div className="flex-grow">
              <p className="text-sm font-medium">{toast.text}</p>
            </div>

            <button
              onClick={() => onRemove(toast.id)}
              className="flex-shrink-0 p-0.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
