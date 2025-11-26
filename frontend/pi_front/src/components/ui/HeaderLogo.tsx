"use client";
type HeaderLogoProps = {
  showBack?: boolean;
  onBack?: () => void;
};

export default function HeaderLogo({ showBack, onBack }: HeaderLogoProps) {
  return (
    <header className="w-full bg-gray-50 py-2 mb-5 flex items-center justify-center fixed top-0 left-0 z-40 md:hidden">
     
      {showBack && (
        <button
          onClick={onBack}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-green-900 text-white rounded px-3 py-1  border-b border-emerald-950"
          aria-label="Voltar para contatos"
        >
          ←
        </button>
      )}
      <img
        src="/images/Logo.png"
        alt="Logo do site"
        className="h-15 sm:h-19 object-contain"
      />
    </header>
  );
}
