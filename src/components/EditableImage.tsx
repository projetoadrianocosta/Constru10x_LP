import React, { useState, useEffect } from 'react';
import { Camera, ImagePlus, RefreshCw, X, Check } from 'lucide-react';

interface EditableImageProps {
  id: string;
  defaultLabel?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide';
  className?: string;
  alt?: string;
  initialSrc?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  id,
  defaultLabel = "Foto de Adriano Costa",
  aspectRatio = 'portrait',
  className = "",
  alt = "Adriano Costa",
  initialSrc = "",
}) => {
  const storageKey = `constru10x_custom_image_${id}`;
  const [imageSrc, setImageSrc] = useState<string>(initialSrc);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempUrl, setTempUrl] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setImageSrc(saved);
      }
    } catch {
      // localStorage may fail in strict private mode
    }
  }, [storageKey]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setImageSrc(result);
          try {
            localStorage.setItem(storageKey, result);
          } catch {
            // Storage quota warning
          }
          setIsModalOpen(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveUrl = () => {
    if (tempUrl.trim()) {
      setImageSrc(tempUrl.trim());
      try {
        localStorage.setItem(storageKey, tempUrl.trim());
      } catch {
        // Storage quota warning
      }
      setIsModalOpen(false);
      setTempUrl('');
    }
  };

  const handleReset = () => {
    setImageSrc(initialSrc);
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // Ignore
    }
    setIsModalOpen(false);
  };

  const aspectClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    landscape: 'aspect-[16/10]',
    wide: 'aspect-[16/9]',
  }[aspectRatio];

  return (
    <>
      <div 
        className={`relative group overflow-hidden rounded-2xl glass-card glass-card-warm ${aspectClasses} ${className}`}
        id={`editable-image-container-${id}`}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-grid-pattern relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[#090b0e] via-transparent to-transparent opacity-80" />
            
            {/* Visual Placeholder for Adriano */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500/20 to-blue-600/30 border-2 border-amber-400/40 flex items-center justify-center mb-4 shadow-xl backdrop-blur-sm group-hover:border-amber-400 transition-colors">
                <Camera className="w-10 h-10 text-amber-400/80 group-hover:text-amber-300 transition-colors" />
              </div>
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 mb-2">
                Espaço Editável
              </span>
              <p className="text-sm font-semibold text-slate-200 mb-1">{defaultLabel}</p>
              <p className="text-xs text-slate-400 max-w-[220px]">
                Clique no botão para incluir uma foto real ou alterar a qualquer momento.
              </p>
            </div>
          </div>
        )}

        {/* Hover / Click Overlay to Edit */}
        <button
          onClick={() => setIsModalOpen(true)}
          type="button"
          id={`btn-edit-image-${id}`}
          className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105"
          title="Substituir foto"
        >
          <ImagePlus className="w-4 h-4" />
          <span>{imageSrc ? 'Alterar Foto' : 'Inserir Foto'}</span>
        </button>

        {imageSrc && (
          <div className="absolute top-3 left-3 z-20">
            <span className="text-[10px] uppercase font-bold tracking-wider bg-black/70 text-amber-300 px-2.5 py-1 rounded border border-amber-400/30 backdrop-blur-md">
              Foto Ativa
            </span>
          </div>
        )}
      </div>

      {/* Edit Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md glass-card glass-card-warm rounded-2xl p-6 text-slate-100">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
                <ImagePlus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Inserir Foto de Adriano Costa</h3>
                <p className="text-xs text-slate-400">Personalize este espaço com fotos oficiais</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Option 1: File Upload */}
              <div className="border-2 border-dashed border-slate-700 hover:border-amber-400/50 rounded-xl p-5 text-center transition-colors bg-[#0b0e14]/50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  id={`file-input-${id}`}
                  className="hidden"
                />
                <label
                  htmlFor={`file-input-${id}`}
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <Camera className="w-8 h-8 text-amber-400 mb-2" />
                  <span className="text-sm font-semibold text-white">Carregar foto do computador/celular</span>
                  <span className="text-xs text-slate-400 mt-1">Formatos: JPG, PNG, WEBP</span>
                </label>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-800"></div>
                <span className="flex-shrink mx-3 text-xs text-slate-500 uppercase tracking-wider">Ou cole uma URL</span>
                <div className="flex-grow border-t border-slate-800"></div>
              </div>

              {/* Option 2: Image URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Link direto da imagem
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://exemplo.com/foto-adriano.jpg"
                    value={tempUrl}
                    onChange={(e) => setTempUrl(e.target.value)}
                    className="flex-1 bg-[#090b0e] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 placeholder:text-slate-600"
                  />
                  <button
                    type="button"
                    onClick={handleSaveUrl}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-sm flex items-center gap-1 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    Aplicar
                  </button>
                </div>
              </div>

              {/* Reset if customized */}
              {imageSrc && (
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-xs text-slate-400">Deseja remover a foto atual?</span>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Restaurar Padrão
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
