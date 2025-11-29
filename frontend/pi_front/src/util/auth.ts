export type UserStorage = {
    user_id: number;
    name: string;
    email: string;
    image_url?: string;
  };
  
  export function getLoggedUser(): UserStorage | null {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("user");
    if (!stored) return null;
    try {
      return JSON.parse(stored) as UserStorage;
    } catch {
      return null;
    }
  }
  