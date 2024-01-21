export default function AdminContainer({ className = "", children }) {
  return (
    <div
      className={`h-full w-[80%] flex flex-col items-center justify-center gap-10 mx-auto ${className}`}
    >
      {children}
    </div>
  );
}
