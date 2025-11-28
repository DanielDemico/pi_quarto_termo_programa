"use client";

import { useEffect, useState, useRef } from "react";
import api from "@/app/services/api";
import styles from './editarPage.module.css';
import { useRouter } from "next/navigation";

export default function EditarPerfil() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    setName(parsedUser.name);
    setEmail(parsedUser.email);
    setImage(parsedUser.image_url || "");
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const payload: any = { name, email };
      if (password) payload.password = password;
      if (image) payload.image_url = image;

      const response = await api.put(`/users/${user.user_id}`, payload);

      // Atualiza localStorage
      localStorage.setItem("user", JSON.stringify(response.data));

      alert("Perfil atualizado com sucesso!");
      router.push("/perfil");
    } catch (err: any) {
      console.error(err);
      alert("Erro ao atualizar perfil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Editar Perfil</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fotoContainer}>
          {image ? (
            <img src={image} alt="Preview" className={styles.foto} />
          ) : (
            <div className={styles.fotoPlaceholder}>Sem foto</div>
          )}
          <button
            type="button"
            className={styles.botaoFoto}
            onClick={() => fileInputRef.current?.click()}
          >
            Alterar Foto
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Nome</label>
          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Senha (opcional)</label>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className={styles.botaoSalvar}
          disabled={loading}
        >
          {loading ? "Salvando..." : "Salvar Alterações"}
        </button>
      </form>
    </div>
  );
}
