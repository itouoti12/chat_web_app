export default function LoadingMessage() {
  return (
    <div className="flex gap-1">
      <span className="text-2xl animate-[bounce_1.4s_infinite_ease-in-out] [animation-delay:-0.32s]">.</span>
      <span className="text-2xl animate-[bounce_1.4s_infinite_ease-in-out] [animation-delay:-0.16s]">.</span>
      <span className="text-2xl animate-[bounce_1.4s_infinite_ease-in-out]">.</span>
    </div>
  );
}
