'use client';

export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 mx-auto mb-4 animate-pulse">
          <span className="text-4xl font-bold text-white">J</span>
        </div>
        <div className="flex gap-2 justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
