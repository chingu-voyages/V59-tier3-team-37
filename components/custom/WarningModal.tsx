export function WarningModal({
  show,
  message,
  onClose,
  onConfirm,
  confirmText = "Back to roles",
}: {
  show?: boolean;
  message: string;
  onClose?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
}) {
  if (!show) return null;
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-lg w-[90%] bg-red-100 border border-red-600 text-red-800 rounded p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <span>⚠️ {message}</span>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-4 font-bold text-red-700 hover:text-red-900"
          >
            ✖
          </button>
        )}
      </div>
      {onConfirm && (
        <div className="mt-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded border border-red-600 text-red-700 hover:bg-red-200"
          >
            Continue session
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      )}
    </div>
  );
}
