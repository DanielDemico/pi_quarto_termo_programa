"use client";

import Redirecionamento from '@/app/login/page';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Redirecionamento/>
    </div>
  );
}
