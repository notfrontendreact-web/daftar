import React from 'react';

export const StationeryBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-45">
      {/* Notebook Paper Grid & Ruled lines */}
      <div className="absolute inset-0 bg-notebook-paper"></div>

      {/* Notebook Binder Red Margin Line on the Right in RTL */}
      <div className="absolute top-0 bottom-0 right-12 w-0.5 bg-pink-400/20 hidden md:block"></div>

      {/* Binder Ring Holes on the Right in RTL */}
      <div className="absolute top-0 bottom-0 right-4 hidden md:flex flex-col justify-around py-12 pointer-events-none opacity-40">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="w-5 h-5 rounded-full bg-slate-300 border-2 border-purple-300 shadow-inner my-3"
          ></div>
        ))}
      </div>

      {/* Floating Decorative Pencil SVG Elements */}
      <div className="absolute top-20 left-10 animate-bounce duration-1000 opacity-20 hidden lg:block">
        <svg className="w-16 h-16 text-pink-500 transform -rotate-45" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        </svg>
      </div>

      <div className="absolute bottom-32 left-16 animate-pulse opacity-20 hidden lg:block">
        <svg className="w-20 h-20 text-purple-600 transform rotate-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
        </svg>
      </div>

      <div className="absolute top-1/3 right-20 animate-pulse opacity-15 hidden lg:block">
        <svg className="w-14 h-14 text-pink-600 transform rotate-45" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
        </svg>
      </div>
    </div>
  );
};
