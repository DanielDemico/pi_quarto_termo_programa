'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";


type Post = {
    id: number;
    usuario: string;
    avatarUrl: string;
    tempo: string;
    localizacao: string;
    imagem: string;
    texto?: string;
};
type Comentario = {
    id: number;
    usuario: string;
    avatarUrl: string;
    texto: string;

};

export default function PostCard({
    usuario, avatarUrl, tempo, localizacao, imagem, texto
}: Post) {
    const [curtido, setCurtido] = useState(false);
    const [likes, setLikes] = useState(0);
  
    function toggleLike() {
      if (curtido) {
        setCurtido(false);
        setLikes(likes - 1);
      } else {
        setCurtido(true);
        setLikes(likes + 1);
      }
    }

    const [comentariosAbertos, setComentariosAbertos] = useState(false);
    const [comentarios, setComentarios] = useState<Comentario[]>([
        { id: 1, usuario: "Ana", avatarUrl: "data:image/jpeg;base64,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", texto: "Bela foto!" },
        { id: 2, usuario: "Carlos", avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&s", texto: "Ótima colheita." }
    ]);
    const [novoComentario, setNovoComentario] = useState("");
    const router = useRouter();


    function adicionarComentario() {
        if (!novoComentario.trim()) return;
        setComentarios([
            ...comentarios,
            {
                id: Date.now(),
                usuario: "Você",
                avatarUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhISFRUVFRcXFRcWFRcVFxUXFRYXFxUWFRUYHiggGBomGxUVITEhJSkrLi4uFx8zODMsOCgtLisBCgoKDg0OGxAQGy0lICUvLS0tLS01LS4tLTUtLS0tLS0tKy0tLystLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAwECBAUGBwj/xABAEAACAQIEAwQHBAgFBQAAAAABAgADEQQSITEFQVEGYXGBBxMiMpGhsRRS0fAjQkNicoKiwRVjkuHxJDODwtL/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIDBAX/xAAmEQEAAgIBAwMFAQEAAAAAAAAAAQIDESEEEjETQVEUIjJhoZFC/9oADAMBAAIRAxEAPwDrIiVAgUlZULLhTgXrKxEBERAREQEREBEqBJAkCKJKxA5gSi1VOxB84EcSbKJYyQLIiICIiAiIgWssiIk8EQMeJe62lkBERAREQLHWRyeRMIFsREDIUSYLKUxLoC0REBERAREQnRERCdEuVbygEmUQntAJgcY4rToIWdgNQNwNSQNybC17+RjjOOFJGYmwVWZiNbKo1Ol54hx3jbYioTsouFA2trqx5nXeRsiPl0nHO3ZIZaQDZlIDHMCl7jY6FtjmBtc2sbXPNN2lqrf1bMvtgo5N3AAtZj+toFHlpNUW8fEd+sqSRrcHn0+exN+UlWZdlwf0jVqeUVL1FG5O7Dv2sdtenKep8G4tSxNJatJgVPfqpsLqehF587Mm+9uflv4GbzsvxurhqgKl8htnQHe/MDr+EIe8skjluBxAdAwNwQCDte/OTMt4EUSspAREQEREARIXW0mlGECCJUykBERAS2oJdKNAhiVlIGeBERDbUEREGoIlZSFe2CIiE6IiIElMSS9gSeUoBMXjeIFOg7scoVTc6m19BoNTBp5h6TONl6nqEzAIbuQWGYso9m1/dsRy+k4N25D+3h8JlcSxb1ahqMSWY3Nx3AC45aDrtMJ2sPG/w8JEItK3Jcak/wBjboee0voUX/VDHwF9Oh68pLRoF2AGoFtp6t2Y4PRWmBkBJGpPMymTJFF8WGcjzBeG1SL+raxGhI+n0mOQyn9YHodp9G4XBUigU01sBppt5zh+1PYnMtSojbAkKRe3MgeMzjqI92tukmPDmeyHbN8PanUN6QuADuh7m+7vp3+U9dwOJWpTWopurC4+HdPm+oCpt+ek9B9HvaCoDk1KAKG1uFzMFS19ud+7adDl09UdZFJwb7SJhaFVsREBERAREQI3WRzIIkLCBbERAREQITEkKSsDJiIhrsiIhJERCCIiDRL6Y1lkkpCDwlWcL6UuKEU1oqbBj+kP0W2/O+3TpO6Teef+lPDWprVcn3mVALW1C2JPPRWFjbcHXKb1t4TDyuqNT37ctpBVIvy2G353kldbMQRY3se4yymvtGx66/nlJjwpbmW14LiclQG2a522vp37f7T0DhPaAIQrUgB1Wor2HW29pwnZrCrVrZHuM1ttLHXaeiHs1Qw6ZvYJOxKKDfYagXJ1I85y5Zrvl3YIt2xMN7iOONSpesTLa17tfKAOemp8Jj8H7QfadVqh/vAIAo65SNbi/MmZ3A8KHwgR1uNR4jcTJ4WmHVGWmw00tcmxG++0w3GtOjUzMS8I7TYcJi66jYVGty0JD/QyTs5jjScrc5HKZ0sLVArA5SDzte3f0k/bVP8Ar8QP3h/VTUj6zW8NtnAJIuDYjRgcptbzInfSfth5mSury927PAqppsSSm2hHsG+S19xYEX30m0qCavgVUslNm3Ksptp7rEAtyvbLpyubabbYy7KUEREIIiICIiAlrrLoMCCUlzraWwEREBERAyIiIbEREBERCskRELbJLSkUlp7QJaY1nnnpXIL0Fubm5NwCFCEkFSSNSSQRzsvg3odOcH28wBqValRqmVKdNBYEBmLB7ACxvbc9RccrytvA8jr737yfOKQ947W8x3DWX1E1A/IEo1iCBrb567yYlXXO2RwfEFHVhodx5GdpxjiTuadNs1mClCLZdbW9one887erly25Tr+DcSFRBTdstj7J6X3HhzmGWvO3Tgvx2u97K4LFrS/S/wDaOq56qoLC+5BJO21uckxWEc1BiGKJfMGFMtZgDZWYtbkL7C17STgNEAX9cLWscoC3HQlbTS+knHk4WoKVwgAUttmBYBrd1iZzcTOo93XP2138POeOY0YjE16y+6zEDvVFCKfMKDIMBUy1FN/dZSDy0P0mJhhvfofLQj8Jk4c+0NOmxHdz5c9Z361GoeZuZnb2vslhwj1kBGVKhyBSMoD+1tYWOgvbQE21tc9NNDw9jehWvf1qZKljp6xQCpYcjZal+8zeyYUnyhlJcwlslUiIgIiICIiBZUEik7CQwKREQEREDIiIhuREQgiIgkiVCy4U4NLQJMolFWXQLqU4X0gUagLsWVablCpzMCRRViykbFiWBAG+Q32E7ukJxnpEDVDSprfKG9u37++vKyK2/wB4dJW3geRVG1PXy2PID87zH9Xv+dv+JluoFzvdhv0FwLWNuY/O+Mqkg8tb9NBvKVnSdMNhcD4TccJwxc2EyODcCarZrHLqRpvOu4HwDKSTuNpnlyR4bYMU+WV2b4IbguTboSbHym67U4APQZANMu03P2ZAgZTY22l+IRSvXSce+du/XGnz2uHKsVI1BklI7Dofz4/8z0rjfY41iWo03DHmQAPnOOx3Z2tRa1Wmb31CgtfX6WE7a5otDgvhmvh6Z2Lx6YnCFXazhjYEm4Kqozqx1vc37r26ToeHYwVUuCCQSreKmx05dfOeQdjuGPWqutiAm+ZQcrMDpc7aHYT1vh9GpTpqpIfKNSdGPnJ9atZ1LP6e1o3DMqDSRSRKgYfUcxLCJtExPMOeYmJ1KkRElBERAREQEgMnkTiBZERAREQMiIiG5ERAqBJAkIsVKgUFmNgNzAuErObxnHXY2pDKOpALH46CYq16rftKn+oj5CYW6isN64LWddMTF49KehN2+6N/Pp5zQrSY+87nxY/jJaeGUchM7dTxxDSvTc8yzP8AEXf9dUHRdW8yf7WmBjeEJV94u5/eLEf1TNVlG1pZX4giD2mE55ta3lvFK19mnpdkaOUhqgU/w3mqqejdrZVroy3ciyFWIb3VPtHQTc1eL+sP6NbgH3iQPleSHjJQ3sx7gJpWZUvFZXYDgdWkAqroAABbp0mxTDEWzADrpYzn8Z21rKRkom99L/gLzNbGY1srVHpKpKBlF2YZ2C6GwF9e+UtHyvW3w3oVTp8rW+UzKKqOQmibhRqNdsXWt0ypl/pAb5zN9TUU+zWTT/Jvfp+vMfUp8tey3jTaesBOpPhMbjFNfVkkDQE3PdJqSkAAm55m1vlczA7SsVwlZuiGXVcb2EqEpXqH9riXYeACqPmDO6wtfScj2Rw4XA0D95Wc/wDkdm+hA8pl1eKCmw13lr/lKmPikOmq07nMuh/PylVbMO8biYHD+IBpn1B+su/17pfFlmk/pTNhjJH7WxLxYi4ls9CJ28qYmOJUiIhBERASOpJJHUgRxEQEREDIiIhuSqiUlQYErNYEnYC/wnF4zjDVzzCX9lf7nqZ2jLcEdRb4zzrEh6P6OotmHPkRyI7jMc29NsOt8swVLSehVmmGKmRhar1DamjOf3Rf4nlOWa7dUW03X2kATExPFgszsF2cdta75R91CC3m2w8rzb4TgdCnqKYJ6t7R+eg8ppXBLO3UR7OSpDF19aNJsv3jZQfNrAzV8a4Li6Qz1gcp0zKwYAnkbbec9VV5WtRWorI4urgqw6gzb0Y0wnLMy8Io41kYi9jy6Ga1u1FZKxdGuugKnVWtz7j3joPCZXbZTRxFXDD9m1i21wQGFvFWE5gLGPH7yzy5Z8RLv6faqhWWzsaZ6EWsf4tjNxwnjNR6lOixFRGZStQfuMH1to3u908nYWnV+jKm7Y0KltEdspYgEjKOQOusplwx2zpph6me6Is9lo7S013VgAUyk6gjUeHf8JNhsHWIGinwa/1AmLxmm6YetUZBanRqMSGU2Cox635cp5MdNmid9svVt1GGY/KE+O7R4ShrWxNJCBfLmDOfCmt2Pwnm3bnt/wDalNDDKyUT77No9XusPdT5nnbUHz6noLSUGezTBWs7eNk6m9+PDu+xXGyaDYY+8l3pd6E3dfEMb+Dd0ur8JxOJrGnS1K+1vZR0JY6C843h2MalUWovvIcw6G24PcQSPOfQPAMJkpBipV6gDuDupIuEP8INvG/WROL79+y1c8+nr3hwfAOLFT6uoCtRCVZTuCNCDO6wVcMtxNX2s7KJif0tIiniAPe/VqAbB7c+jeWuluW4ZxqrhnNHEqUYdefeDsR3iYZcM15h1Yc8W4l373BzL5jkfz1kqOGFxvzHSabB8YVja4meamuZd/r3SMWWacT4TmwReNx5ZESqsGGYbfTulJ3xO3lzGp0REQgkdWSSKoYFkREBERAyIiIbkRECRHlz0wdwDba4BkMuDGBZ9gpXv6qlfrkW/wAbTIA5CR+sj1kaEsSHOYzwjSaSUzIVaXodYS869NnCQUoYtQMwb1NQ9QwLUyfAq4/nE8kM+hvSBwo4nh9dFF3QCqneaRzEDvKhlH8U+eGYQxtHKlSdp6Iqd8a500oNv3ugnET0f0WcOqUqj1KlJwKtJfV+xmLDNmvb9UaDe2hkTMQmlZmeHrNNyFBAvoNBb5XM1HbLG/8AQYsZbH7PUBJOuq228+s2q1bD3KgsB+zf4DSanG45g4C4dijXzlqTsOo9i2t2A15byJtGmlcdtvn0OOomVhcBWqgmlRrVANylN3A7iVBtPaq2LNS4rcOpunJWoU3H9U2GD49SRRTSktFRsop+rUdQABaYzn/TWOl+ZeOdkMB6zG4ek1x+lGYEWP6O7spB2NkI859BuZzi4Gh9pGMCqKxXLnuSpBGW5W9s2XTNvbSZz49+tL4N/wDUmOoofSXiWfMTiXC6OIXJWQMOR2ZT1VhqJB9pqHmnkPxMscVG3qNbusvzGsieoomOlu4LifCquBxPq1z1KTjNSNrm17FWtzB59CPLf8PxtbS9Nrd5H0vN0mDQG58zK1K1NRpacl7RM7iHdSs1jUyvwdcg67Hf8ZnGaZMVmawmzw7bjp/edHT5P+ZcvVYon74SxETrcMwSFzLnMshGlIiIQREQMiIiZxZuRES8BERJCIiAiIgX095LIVMlgZSX5WuRpfa/K/dPljF6uxAABZiAt8ouTot9co5eU+oK9PNTZcxS6MMy+8l1PtDvG/lPls25HTl1tyv3wzutmVR4lXS2SvWW22Wo4t4WMxQJcFMKxOm+w3bXHptiXPc1j87X+czk9IuNtZmB62upPnrOU9XKinKTjrPsvGa8e7sH9IVXLlCEjnmf6WEx17bNfWiLdz3PzE5j1YlDTkelX4W9fJ8vVuyVOtjkZ6TBERspz31awayhb7AjpuJu37PYsbVKTebD/wBZB6HMPkwDNmv6ys7ZbWClQqb875AenLrO2JkejVrXPfXlxf2LHJ+zzfwsp+V7y1sbi196jUH8pt8bTtC0Zx1lZ6eq8dRdwVfjNU6FSPKR08Q7H3KjeCkz0H1vjKGrIjp4g+os46lSrEezRqDxGX6ze8Gw7ohz6Em9jqQO+bAmUmlcUVnat8trRqSUbaVljtNHPMI5SIhGiIiETBERBpMh0l15BeX5pjDVJEoplZeAiIlgiIkhERAuTeTCRU95Mg1gYPaji32TCVsQBcotk/jchEv3ZmBPcJ5Lhsfh659oIGO6uBf4nebf0vcfLOMGhGVAHq2O7nVUbuC2a3Vh0nmRP55fGUvTuRGXtl6D/gmHb9inlp9JkUeyGEbem48Hf8Zw+F4vVpAZXbwPtAd1jOi4b27ZNKlMMOqGx/0t+MwtjyR+MumuXDb8ob49hMF/mj+f8RJMN6P8GdzWP8/4CazEduFfWnSqZVHtM2gXxyBvjpGH9IaKP+w5PiBKazLd3T/r/G7PYLAj9nUPjVf+xEibsbgh7tH41Kh+rTUVPSM7XyYdRYX9p/8AYdJqMX20xT6ApTv91dfixMmMeaff+onL08eI/j13stTpphlp01ChGYEAWFyc3mbMus2jm00HYC/+H0CzFi3rWJO9zWffqe+byrOuI1GnNvfK2UiJIREQEREChaRsbyjSkCkREBERBoiVlIRolZSJglery8VBETSBXMIzSsS4REQERECqmVxeLWlTeq3u00Zz4IpY/SIgl844zGNUd6jatUZnJ53Ykn6zGA+cpEMEh62+Bi/f8dYiBnYDiDJSqUQEyufaut2HXKeUxNIiE7Wq1mPhJb6xEIeqeiPHM1KtRO1NlddtBVzZh13S+v3jO6YxENa+FsRELF4JiIFpeWmpEQLLykRAREQEtzysQLc8RED/2Q==", // Troque pelo correto; pode ser do usuário logado
                texto: novoComentario
            }
        ]);
        setNovoComentario("");
    }


    return (
        <div className="bg-white rounded max-w-full sm:max-w-md md:max-w-xl mx-auto mb-7 border border-green-900 shadow">
            {/* Topo: usuário */}
            <div className="flex items-center gap-2 p-2 sm:p-4 border-b border-green-900 shadow">
                <img src={avatarUrl} alt={usuario} className="w-8 h-8 rounded-full" />
                <div>
                    <div className="font-semibold leading-tight">{usuario}</div>
                    <div className="text-xs text-gray-400">{localizacao}</div>
                </div>
                <span className="ml-auto text-xs text-gray-400">{tempo}</span>
            </div>
            <div className="w-full flex justify-center p-2 sm:p-4">
                <img
                    src={imagem}
                    alt="Post"
                    className="rounded-lg w-full object-contain max-h-64 sm:max-h-80 md:max-h-96"
                />
            </div>
          
            {texto && (
                <div className="p-4 border-b border-b-green-900 shadow text-sm">{texto}</div>
            )}
        
            <div className="flex gap-3 px-4 py-2 text-xl text-gray-500 items-center">
                <button
                    aria-label="Curtir"
                    onClick={toggleLike}
                    className={curtido ? "text-red-500" : ""}
                >
                    <img 
                        src={curtido ? "/icons/CAtivo.png" : "/icons/coracao.png"}
                        alt="curtir"
                        className="w-5.5 h-5.5 cursor-pointer transition"
                    />
                </button>
                <span className="text-sm text-gray-700">{likes}</span>
                <button
                    aria-label="Comentar"
                    onClick={() => setComentariosAbertos(!comentariosAbertos)}
                >
                    <img 
                        src={comentariosAbertos ? "/icons/Comment.png" : "/icons/CommentN.png"}
                        alt="Comentarios"
                        className="w-5.5 h-5.5 cursor-pointer transition"
                    />
                </button>
                <button
                    aria-label="Compartilhar"
                    onClick={() => router.push(`/mensagens?contato=${usuario}`)}
                    >
                    <img
                        src="/icons/Direct.png"
                        alt="Compartilhar"
                        className="w-4.5 h-4.5 cursor-pointer"
                    />
                </button>

            </div>
            {/* Área de comentários (toggle) */}
            {comentariosAbertos && (
                <div className="w-full px-4 py-2 border-t border-t-green-900 shadow shadow-emerald-950">
                    <p className="text-sm text-gray-600 mb-2">Comentários:</p>
                    <ul  className="mb-2 space-y-2 overflow-y-auto" style={{ maxHeight: "10rem"}}>
                        {comentarios.map(com => (
                            <li key={com.id} className="flex items-center gap-2">
                                <img
                                    src={com.avatarUrl}
                                    alt={com.usuario}
                                    className="w-6 h-6 rounded-full"
                                />
                                <span className="font-bold text-xs">{com.usuario}: </span>
                                <span className="text-sm">{com.texto}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex gap-2  w-full border border-green-900 shadow rounded">
                        <input
                            type="text"
                            value={novoComentario}
                            onChange={e => setNovoComentario(e.target.value)}
                            placeholder="Adicionar comentário..."
                            className="flex-1  p-2 outline-0"
                            onKeyDown={e => {
                                if (e.key === "Enter"){
                                    e.preventDefault();
                                    adicionarComentario();
                                }
                            }}
                        />
                        <button
                            type="button"
                            onClick={adicionarComentario}
                            className="bg-green-950 text-white px-2 rounded-r"
                        > Enviar
                           
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
