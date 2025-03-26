export default function Modal({ children, isOpen, onClose }) {
  return (
    <div className="fixed inset-0 z-50">
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-opacity-30 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative flex items-center justify-center min-h-screen p-4">{children}</div>
    </div>
  );
}
