export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-white/20 border-t-primary-orange rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-primary-pink rounded-full animate-spin animate-reverse" style={{ animationDelay: '0.5s' }}></div>
      </div>
    </div>
  );
}