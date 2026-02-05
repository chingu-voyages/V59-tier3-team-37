"use client";

import { useCopyToClipboard } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

interface SwatchProps {
  colorVar: string; // CSS variable name, e.g., '--brand-50' or '--gray-200'
  value: string; // Hex value for display/copy
}

const Swatch = ({ colorVar, value }: SwatchProps) => {
  const [_copiedText, copyToClipboard] = useCopyToClipboard();

  const [showCopied, setShowCopied] = useState(false);
  const [showValueCopied, setShowValueCopied] = useState(false);

  const colorString = colorVar.replace(/^--/, ""); // nice display text

  const handleColorClick = (value: string) => {
    copyToClipboard(value);
    setShowCopied(true);
  };

  const handleClickValue = (value: string) => {
    copyToClipboard(value);
    setShowValueCopied(true);
  };

  useEffect(() => {
    if (!showCopied) return;
    const t = setTimeout(() => setShowCopied(false), 2000);
    return () => clearTimeout(t);
  }, [showCopied]);

  useEffect(() => {
    if (!showValueCopied) return;
    const t = setTimeout(() => setShowValueCopied(false), 2000);
    return () => clearTimeout(t);
  }, [showValueCopied]);

  return (
    <div className="flex items-start mb-3 min-w-[215px]">
      <div
        className="w-12 h-12 rounded mr-3 border border-neutral-400"
        style={{ backgroundColor: `var(${colorVar})` }}
      ></div>
      <div>
        {showCopied ? (
          <p className="text-md font-medium text-green-400">Copied!</p>
        ) : (
          <button
  type="button"
  className="text-md font-medium cursor-pointer text-left"
  onClick={() => handleColorClick(colorVar)}
>
  {colorString}
</button>

        )}
        <button
  type="button"
  className="text-sm text-gray-300 cursor-pointer text-left"
  onClick={() => handleClickValue(value)}
>
  {showValueCopied ? "Copied!" : value}
</button>

      </div>
    </div>
  );
};

export default Swatch;
