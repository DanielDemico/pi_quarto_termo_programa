"use client";
import { useRef, useState } from "react";

type NovoPost = {
  imagem: string;
  texto: string;
};

type Props = {
  onPostCriado: (post: NovoPost) => void;
};

export default function CreatePost({ onPostCriado }: Props) {
  const [imagem, setImagem] = useState<string>("");
  const [texto, setTexto] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagem(reader.result as string); 
      };
      reader.readAsDataURL(file);
    }
  }

  function publicar() {
    if (!imagem.trim()) {
        alert("Você precisa adicionar uma foto para publicar!")
        return;
    }
    
    onPostCriado({ imagem, texto });
    setImagem("");
    setTexto("");
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg border border-green-900 shadow-lg mb-6 w-full max-w-md mx-3 sm:mx-auto relative">
      {/* Imagem Preview no topo */}
      {imagem && (
        <div className="flex justify-center items-center mb-4 relative">
        <img src={imagem} alt="preview" className="rounded-lg max-h-48 w-auto bg-center shadow" />
        <button
          type="button"
          onClick={() => setImagem("")}
          className="absolute top-2 right-2 text-red-600 text-2xl rounded-full p-1 cursor-pointer"
          title="Remover imagem"
        >
          ×
        </button>
        </div>
      )}
      <div className="relative w-full">
        <textarea
          value={texto}
          onChange={e => setTexto(e.target.value)}
          placeholder="No que você está pensando..."
          className="w-full h-24 p-2 rounded-lg mb-3 resize-none pr-12 border border-green-900 shadow shadow-emerald-950 outline-0"
        />
        <button
          type="button"
          className="absolute right-4 bottom-7 opacity-70 hover:opacity-100 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          tabIndex={-1}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-emerald-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 16l4.4-4.4a1 1 0 011.4 0l5.2 5.2M14 10a2 2 0 100-4 2 2 0 000 4zm5 10H5a2 2 0 01-2-2V7a2 2 0 012-2h2M18 3h2a2 2 0 012 2v14a2 2 0 01-2 2h-2"
            />
          </svg>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
      {!imagem.trim() && (
            <div className="text-center text-sm text-red-600 font-semibold mb-2">
                Para publicar, adicione uma foto!
            </div>
        )}
      <button
        onClick={publicar}
        disabled={!imagem.trim()}
        className={`bg-green-950 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-full cursor-pointer ${!imagem.trim() ? 'opacity-40 cursor-not-allowed' : ''}`}>
        Publicar
      </button>
    </div>
  );
}
