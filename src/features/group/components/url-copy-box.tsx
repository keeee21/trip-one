"use client";

import { useState } from "react";

interface UrlCopyBoxProps {
  url: string;
}

export const UrlCopyBox = ({ url }: UrlCopyBoxProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("コピーに失敗しました:", err);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
        <span className="flex-1 text-sm text-gray-700 truncate">{url}</span>
        <button
          type="button"
          onClick={handleCopyClick}
          className="px-4 py-2 bg-red-400 text-white text-sm rounded-lg hover:bg-red-500 transition-colors whitespace-nowrap"
        >
          {copied ? "コピー済み" : "コピー"}
        </button>
      </div>
    </div>
  );
};
