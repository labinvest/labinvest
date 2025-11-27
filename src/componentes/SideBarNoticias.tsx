"use client";
import Link from "next/link";

interface Postagem {
    id: number;
    autor: string;
    data: string;
    conteudo: string;
    imagem: string;
}

interface SidebarMiniaturasProps {
    posts: Postagem[];
}

export default function SidebarMiniaturas({ posts }: SidebarMiniaturasProps) {
    return (
        <aside className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800">Postagens antigas</h3>
            {posts.map((post) => (
                <Link
                    key={post.id}
                    href={`/postagens/${post.id}`}
                    className="flex items-start gap-4 hover:bg-gray-50 p-2 rounded-lg transition"
                >
                    <img
                        src={post.imagem}
                        alt={`Miniatura de ${post.autor}`}
                        className="w-20 h-20 object-cover rounded-lg shadow-sm"
                    />
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">{post.autor}</p>
                        <p className="text-xs text-gray-500">{post.data}</p>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {post.conteudo.length > 80
                                ? post.conteudo.slice(0, 80) + "..."
                                : post.conteudo}
                        </p>
                    </div>
                </Link>
            ))}
        </aside>

    );
}
