import { useState, useRef, useCallback } from 'react';
import { UploadIcon, ImageIcon, XIcon, ScanIcon, CopyIcon, CheckIcon, AlertTriangleIcon } from 'lucide-react';
import { analyzeImageWithGroq } from '../lib/visionApi';

interface ImageAnalyzerProps {
  apiKey: string;
}

export function ImageAnalyzer({ apiKey }: ImageAnalyzerProps) {
  const [imageData, setImageData] = useState<{ base64: string; mimeType: string; previewUrl: string; name: string } | null>(null);
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (JPG, PNG, WebP, GIF).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be under 10MB.');
      return;
    }
    setError(null);
    setDescription('');

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      // result is "data:image/xxx;base64,XXXXX"
      const base64 = result.split(',')[1];
      setImageData({
        base64,
        mimeType: file.type,
        previewUrl: result,
        name: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);

  const handleAnalyze = async () => {
    if (!imageData) return;
    if (!apiKey.startsWith('gsk_')) {
      setError('No valid Groq API key found. Please add your VITE_GROQ_API_KEY to the .env file.');
      return;
    }
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeImageWithGroq(imageData.base64, imageData.mimeType, apiKey);
      setDescription(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setImageData(null);
    setDescription('');
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 max-w-4xl mx-auto w-full gap-8 custom-scrollbar overflow-y-auto h-full pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-white/5 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary/10 flex items-center justify-center border border-primary/20">
            <ScanIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-headline font-black text-xl uppercase tracking-tighter text-white">Image Analyzer</h2>
            <p className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Upload an image — AI gives a detailed description</p>
          </div>
        </div>
      </div>

      {/* Drop Zone */}
      {!imageData ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-4 p-12 border-2 border-dashed cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-outline-variant/30 hover:border-outline-variant hover:bg-surface-container-low'
          }`}
        >
          <div className={`w-14 h-14 flex items-center justify-center border transition-colors ${
            isDragging ? 'border-primary bg-primary/10 text-primary' : 'border-outline-variant/30 text-on-surface-variant/40'
          }`}>
            <UploadIcon className="w-6 h-6" />
          </div>
          <div className="text-center">
            <p className="font-headline font-bold text-sm text-on-surface mb-1">
              {isDragging ? 'Drop to upload' : 'Drop an image here'}
            </p>
            <p className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">
              or click to browse — JPG, PNG, WebP, GIF up to 10MB
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Preview */}
          <div className="relative bg-surface-container-lowest border border-outline-variant/30 overflow-hidden">
            <img
              src={imageData.previewUrl}
              alt="Uploaded preview"
              className="w-full max-h-80 object-contain bg-black"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={handleClear}
                className="p-1.5 bg-surface-container/80 backdrop-blur border border-outline-variant/30 text-on-surface-variant hover:text-error transition-colors"
                title="Remove image"
              >
                <XIcon className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-3.5 h-3.5 text-on-surface-variant" />
                <span className="text-[10px] font-label font-bold text-on-surface-variant truncate">{imageData.name}</span>
              </div>
            </div>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-on-primary font-headline font-black text-sm uppercase tracking-wider hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.99] shadow-[0_0_20px_rgba(163,166,255,0.2)]"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                Analyzing with Llama 4 Vision...
              </>
            ) : (
              <>
                <ScanIcon className="w-4 h-4" />
                Analyze Image
              </>
            )}
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-error/5 border border-error/20 text-error">
          <AlertTriangleIcon className="w-4 h-4 shrink-0 mt-0.5" />
          <p className="text-xs font-label">{error}</p>
        </div>
      )}

      {/* Description Output */}
      {description && (
        <div className="bg-surface-container-lowest border border-outline-variant/30 border-l-2 border-l-secondary p-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <h3 className="text-[10px] font-label font-black text-secondary uppercase tracking-widest">Vision Analysis Complete</h3>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-[10px] font-label font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
            >
              {copied ? <CheckIcon className="w-3.5 h-3.5 text-secondary" /> : <CopyIcon className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <p className="text-sm font-body text-on-surface-variant leading-relaxed whitespace-pre-wrap">{description}</p>
          <div className="pt-2 border-t border-white/5">
            <p className="text-[10px] font-label text-on-surface-variant/40 uppercase tracking-widest">
              💡 Tip: Copy this description and paste it into the workspace to generate a structured AI prompt from it.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
