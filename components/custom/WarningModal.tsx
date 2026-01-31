export function WarningModal({
  message,
  onClose,
}: {
  message: string;
  onClose?: () => void;
}) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-lg w-[90%] bg-red-100 border border-red-600 text-red-800 rounded p-4 shadow-lg flex justify-between items-center">
      <span>⚠️ {message}</span>
      {onClose && (
        <button
        type='button'
          onClick={onClose}
          className="ml-4 font-bold text-red-700 hover:text-red-900"
        >
          ✖
        </button>
      )}
    </div>
  );
}
