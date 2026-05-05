import React from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ImageUploaderProps {
  onUpload: (image: string) => void;
  isLoading: boolean;
}

export function ImageUploader({ onUpload, isLoading }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = React.useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        onUpload(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      className={cn(
        "relative group cursor-pointer transition-all duration-500",
        "aspect-video md:aspect-square flex flex-col items-center justify-center",
        "rounded-[2.5rem] border-2 border-dashed",
        isDragging 
          ? "border-emerald-500 bg-emerald-50" 
          : "border-emerald-200 bg-white hover:border-emerald-400 hover:bg-emerald-50 shadow-sm"
      )}
    >
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
        disabled={isLoading}
      />
      
      <div className="p-4 rounded-2xl bg-emerald-100 mb-4 group-hover:scale-110 transition-transform">
        <Upload className="w-8 h-8 text-emerald-600" />
      </div>
      
      <h3 className="text-emerald-950 font-bold text-lg text-center px-4">
        Sube una foto
      </h3>
      <p className="text-emerald-700/50 text-sm mt-1 text-center px-4 font-medium">
        Arrastra o haz clic para seleccionar
      </p>
    </div>
  );
}
