export default function AdminContainer({ className = "", children }) {
  return (
    <div
      className={`h-[85%] md:w-[80%] w-full flex flex-col items-center justify-center gap-10 mx-auto ${className}`}
    >
      {children}
    </div>
  );
}
