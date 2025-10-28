interface SubmitButtonProps {
  isSubmitDisabled: boolean;
  status: "idle" | "success" | "error";
  handleSubmit: () => void;
}

export default function SubmitButton({
  isSubmitDisabled,
  status,
  handleSubmit,
}: SubmitButtonProps) {
  return (
    <button
      className={`w-full py-3 rounded-lg text-white font-bold transition-colors duration-300
          ${
            isSubmitDisabled && status === "idle"
              ? "bg-gray-400 cursor-not-allowed"
              : status === "success"
              ? "bg-green-600 hover:bg-green-700"
              : status === "error"
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
      disabled={isSubmitDisabled}
      onClick={handleSubmit}
    >
      {status === "success"
        ? "CORRECT! 🎉"
        : status === "error"
        ? "WRONG! ❌"
        : "Submit"}
    </button>
  );
}
