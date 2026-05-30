import type { NextConfig } from "next";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:3001";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Rotas do backend que não possuem arquivo route.ts equivalente no Next.js
      // são proxiadas diretamente para o servidor Express
      {
        source: "/api/auth/:path*",
        destination: `${BACKEND_URL}/api/auth/:path*`,
      },
      {
        source: "/api/perfil/:path*",
        destination: `${BACKEND_URL}/api/perfil/:path*`,
      },
      {
        source: "/api/perfis/:path*",
        destination: `${BACKEND_URL}/api/perfis/:path*`,
      },
      {
        source: "/api/perfis",
        destination: `${BACKEND_URL}/api/perfis`,
      },
      {
        source: "/api/voluntarios/:path*",
        destination: `${BACKEND_URL}/api/voluntarios/:path*`,
      },
      {
        source: "/api/voluntarios",
        destination: `${BACKEND_URL}/api/voluntarios`,
      },
      {
        source: "/api/agendamentos/:path*",
        destination: `${BACKEND_URL}/api/agendamentos/:path*`,
      },
      {
        source: "/api/agendamentos",
        destination: `${BACKEND_URL}/api/agendamentos`,
      },
      {
        source: "/api/posts/:path*",
        destination: `${BACKEND_URL}/api/posts/:path*`,
      },
      {
        source: "/api/posts",
        destination: `${BACKEND_URL}/api/posts`,
      },
      {
        source: "/api/categorias/:path*",
        destination: `${BACKEND_URL}/api/categorias/:path*`,
      },
      {
        source: "/api/categorias",
        destination: `${BACKEND_URL}/api/categorias`,
      },
      {
        source: "/api/servicos/:path*",
        destination: `${BACKEND_URL}/api/servicos/:path*`,
      },
      {
        source: "/api/servicos",
        destination: `${BACKEND_URL}/api/servicos`,
      },
      {
        source: "/api/disponibilidades/:path*",
        destination: `${BACKEND_URL}/api/disponibilidades/:path*`,
      },
      {
        source: "/api/disponibilidades",
        destination: `${BACKEND_URL}/api/disponibilidades`,
      },
      {
        source: "/api/avaliacoes/:path*",
        destination: `${BACKEND_URL}/api/avaliacoes/:path*`,
      },
      {
        source: "/api/avaliacoes",
        destination: `${BACKEND_URL}/api/avaliacoes`,
      },
      {
        source: "/api/notificacoes/:path*",
        destination: `${BACKEND_URL}/api/notificacoes/:path*`,
      },
      {
        source: "/api/notificacoes",
        destination: `${BACKEND_URL}/api/notificacoes`,
      },
      {
        source: "/api/solicitacoes-voluntario/:path*",
        destination: `${BACKEND_URL}/api/solicitacoes-voluntario/:path*`,
      },
      {
        source: "/api/solicitacoes-voluntario",
        destination: `${BACKEND_URL}/api/solicitacoes-voluntario`,
      },
      {
        source: "/api/voluntario-servico/:path*",
        destination: `${BACKEND_URL}/api/voluntario-servico/:path*`,
      },
      {
        source: "/api/agendamento-servico/:path*",
        destination: `${BACKEND_URL}/api/agendamento-servico/:path*`,
      },
      {
        source: "/api/admin/:path*",
        destination: `${BACKEND_URL}/api/admin/:path*`,
      },
      {
        source: "/api/health",
        destination: `${BACKEND_URL}/api/health`,
      },
      {
        source: "/api/upload",
        destination: `${BACKEND_URL}/api/upload`,
      },
      {
        source: "/uploads/:path*",
        destination: `${BACKEND_URL}/uploads/:path*`,
      },
      {
        source: "/api/faqs/:path*",
        destination: `${BACKEND_URL}/api/faqs/:path*`,
      },
      {
        source: "/api/faqs",
        destination: `${BACKEND_URL}/api/faqs`,
      },
      {
        source: "/api/contato/:path*",
        destination: `${BACKEND_URL}/api/contato/:path*`,
      },
      {
        source: "/api/contato",
        destination: `${BACKEND_URL}/api/contato`,
      },
    ];
  },
};

export default nextConfig;
