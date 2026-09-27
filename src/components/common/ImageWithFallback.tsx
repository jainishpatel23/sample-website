import React, { useState } from 'react';
import { Activity } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  fallbackIcon?: React.ReactNode;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Physiotherapy care image',
  fallbackText,
  fallbackIcon,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!src || hasError) {
    return (
      <div
        className={`bg-gradient-to-br from-teal-50 via-slate-100 to-slate-200 flex flex-col items-center justify-center p-4 text-center border border-slate-200/80 ${containerClassName || className}`}
      >
        <div className="w-10 h-10 rounded-full bg-teal-600/10 flex items-center justify-center text-teal-700 mb-2">
          {fallbackIcon || <Activity className="w-5 h-5" />}
        </div>
        <span className="text-xs font-medium text-slate-600 max-w-[80%] line-clamp-2">
          {fallbackText || alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center">
          <Activity className="w-6 h-6 text-slate-300 animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
        {...props}
      />
    </div>
  );
};
