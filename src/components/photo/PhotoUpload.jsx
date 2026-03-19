import React, { useState, useRef, useEffect } from 'react';
export default function PhotoUpload({ label = 'Photo', name, onChange, initialPreview = null, className = '' }) {
  const [preview, setPreview] = useState(initialPreview);
  const inputRef = useRef(null);
  useEffect(() => { setPreview(initialPreview); }, [initialPreview]);
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('Fichier trop grand. Maximum 5MB'); return; }
    const reader = new FileReader();
    reader.onloadend = () => { setPreview(reader.result); if (onChange) onChange(file); };
    reader.readAsDataURL(file);
  };
  const handleRemove = (e) => {
    e.stopPropagation();
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
    if (onChange) onChange(null);
  };
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      {label && <label className="label self-start">{label}</label>}
      <div className="relative group cursor-pointer" onClick={() => inputRef.current?.click()}>
        {preview ? (
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-primary-200 shadow-md">
            <img src={preview} alt="preview" className="w-full h-full object-cover" onError={() => setPreview(null)} />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs font-medium">Changer</span>
            </div>
          </div>
        ) : (
          <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-300 hover:border-primary-400 bg-gray-50 hover:bg-primary-50 transition-all flex flex-col items-center justify-center gap-1">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4"/></svg>
            <span className="text-xs text-gray-400">Ajouter</span>
          </div>
        )}
        {preview && (
          <button type="button" onClick={handleRemove} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center shadow-md hover:bg-red-600 transition-colors">×</button>
        )}
      </div>
      <input ref={inputRef} type="file" name={name} accept="image/jpeg,image/jpg,image/png,image/webp" onChange={handleChange} className="hidden" autoComplete="off" />
      <p className="text-xs text-gray-400">JPG, PNG, WEBP — Max 5MB</p>
    </div>
  );
}
