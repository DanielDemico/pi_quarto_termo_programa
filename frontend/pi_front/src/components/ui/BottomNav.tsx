"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type BottomNavProps = {
  onPublicar?: () => void; 
};

export default function BottomNav({ onPublicar }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 w-full msg-pj flex justify-around items-center py-2 z-50 md:hidden">
      <Link href="/feed">
        <img src="/icons/Homeb.png" className="w-6 h-6" alt="Feed" />
      </Link>
      <Link href="/mensagens">
        <img src="/icons/sendb.png" className="w-6 h-6" alt="Mensagens" />
      </Link>
      <Button variant="ghost" onClick={onPublicar}>
        <img src="/icons/+b.png" className="w-6 h-6" alt="Publicar" />
      </Button>
      <Link href="/perfil">
        <img src="/icons/Profile.png" className="w-8 h-8" alt="Perfil" />
      </Link>
    </nav>
  );
}
