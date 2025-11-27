"use client"
import React, { useEffect, useState } from "react";
import { usePerfil } from "../context/PerfilContext";
import { useRouter, usePathname } from "next/navigation";
import {
    IconButton,
    Menu,
    Avatar,
    Divider,
    Typography,
    Box,
    List,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import LogoutIcon from "@mui/icons-material/Logout";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import ChatIcon from "@mui/icons-material/Chat";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EditIcon from "@mui/icons-material/Edit";

export default function NavBar() {
    const pathname = usePathname();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { perfil, setPerfil } = usePerfil();
    const iconColor = 'success.main';
    const getUserId = () => {
        try {
            if (typeof window === 'undefined') return '1';
            const perfilAtivo = localStorage.getItem('perfilAtivo');
            if (perfilAtivo) return perfilAtivo;
            const stored = localStorage.getItem('user') || localStorage.getItem('usuario') || localStorage.getItem('perfilId');
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    if (parsed && (parsed.id || parsed._id)) return parsed.id || parsed._id;
                } catch (e) {
                    return stored;
                }
            }
            return '1';
        } catch (e) {
            return '1';
        }
    };
    useEffect(() => {
        setMenuOpen(false);
        setAnchorEl(null);
    }, [pathname]);

    if (['/'].includes(pathname)) return null;

    return (
        <header className="relative flex items-center justify-between py-4 md:py-6 px-4 md:px-8 lg:px-16 max-w-full">
            <div className="flex items-center justify-start cursor-pointer">
                <button
                    type="button"
                    onClick={() => router.push("/home")}
                    aria-label="Ir para página inicial do LabInvest"
                    className="flex space-x-2 text-2xl md:text-4xl lg:text-6xl font-extrabold select-none transition duration-300 hover:scale-105"
                >
                    <span className="text-gray-500" style={{ cursor: 'pointer' }}>Lab</span>
                    <span className="text-green-700" style={{ cursor: 'pointer' }}>Invest</span>
                </button>
            </div>

            <div className="md:hidden">
                <button
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((s) => !s)}
                    className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {menuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            <nav className="hidden md:flex space-x-10 text-base font-semibold text-gray-600" aria-label="Menu principal">
                <button className="transition duration-300 hover:text-green-700 cursor-pointer" onClick={() => router.push("/home")} aria-label="Ir para Home">Home</button>
                <button className="transition duration-300 hover:text-green-700 cursor-pointer" onClick={() => router.push("/servicos")} aria-label="Ir para Serviços">Serviços</button>
                <button className="transition duration-300 hover:text-green-700 cursor-pointer" onClick={() => router.push("/sobrenos")} aria-label="Ir para Sobre nós">Sobre nós</button>
                <button className="transition duration-300 hover:text-green-700 cursor-pointer" onClick={() => router.push("/voluntario")} aria-label="Ir para Voluntários">Voluntários</button>
                <button className="transition duration-300 hover:text-green-700 cursor-pointer" onClick={() => router.push("/postagens")} aria-label="Ir para Notícias">Notícias</button>
            </nav>

            <div className="relative items-center ml-4 hidden md:flex">
                <div>
                    <div className="flex items-center space-x-3">
                        <div className="text-sm text-gray-600">{perfil ? (perfil === "cliente" ? "Cliente" : "Voluntário") : "Convidado"}</div>
                        <IconButton
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                            size="small"
                            aria-controls={Boolean(anchorEl) ? 'profile-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={Boolean(anchorEl)}
                            sx={{ p: 0, bgcolor: 'transparent' }}
                        >
                            <Avatar sx={{ width: 36, height: 36, bgcolor: 'success.main' }}>
                                {perfil === "voluntario" ? <VolunteerActivismIcon fontSize="small" sx={{ color: '#fff' }} /> : <PersonIcon fontSize="small" sx={{ color: '#fff' }} />}
                            </Avatar>
                        </IconButton>
                    </div>

                    <Menu
                        id="profile-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        PaperProps={{ sx: { minWidth: 260, borderRadius: 2, overflow: 'visible', boxShadow: '0 10px 30px rgba(0,0,0,0.12)' } }}
                    >
                        <Box sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Avatar sx={{ width: 56, height: 56, bgcolor: 'success.main' }}>
                                {perfil === 'voluntario' ? <VolunteerActivismIcon sx={{ color: '#fff' }} /> : <PersonIcon sx={{ color: '#fff' }} />}
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle1">{perfil ? (perfil === 'cliente' ? 'Cliente' : 'Voluntário') : 'Convidado'}</Typography>
                            </Box>
                        </Box>

                        <Divider />

                        <List dense disablePadding>
                                {/* Cliente menu */}
                                {perfil === 'cliente' && (
                                    <>
                                        <ListItemButton onClick={() => { router.push('/perfil'); setAnchorEl(null); }}>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: 'transparent' }}>
                                                    <AccountCircleIcon sx={{ color: iconColor }} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Meu Perfil" secondary="Atualize seus dados" />
                                        </ListItemButton>

                                        <ListItemButton onClick={() => { router.push(`/cliente/cadastro`); setAnchorEl(null); }}>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: 'transparent' }}>
                                                    <EditIcon sx={{ color: iconColor }} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Alterar Perfil" secondary="Alterar Dados no Sistema" />
                                        </ListItemButton>

                                        <ListItemButton onClick={() => { router.push('/agendamento'); setAnchorEl(null); }}>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: 'transparent' }}>
                                                    <EventAvailableIcon sx={{ color: iconColor }} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Agendamentos" secondary="Ver compromissos" />
                                        </ListItemButton>

                                        <ListItemButton onClick={() => { router.push('/chat'); setAnchorEl(null); }}>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: 'transparent' }}>
                                                    <ChatIcon sx={{ color: iconColor }} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Mensagens" secondary="Converse com usuários" />
                                        </ListItemButton>

        
                                    </>
                                )}

                                {/* Voluntário menu */}
                                {perfil === 'voluntario' && (
                                    <>
                                        <ListItemButton onClick={() => { router.push('/voluntario'); setAnchorEl(null); }}>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: 'transparent' }}>
                                                    <VolunteerActivismIcon sx={{ color: iconColor }} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Painel Voluntário" secondary="Acessar área do voluntário" />
                                        </ListItemButton>

                                        <ListItemButton onClick={() => { router.push(`/voluntario/[id]`); setAnchorEl(null); }}>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: 'transparent' }}>
                                                    <ManageAccountsIcon sx={{ color: iconColor }} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Meu Perfil" secondary="Acessar meu perfil" />
                                        </ListItemButton>
                                        
                                        <ListItemButton onClick={() => { router.push(`/voluntario/editar`); setAnchorEl(null); }}>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: 'transparent' }}>
                                                    <EditIcon sx={{ color: iconColor }} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Editar Perfil" secondary="Atualize suas informações" />
                                        </ListItemButton>

                                        <ListItemButton onClick={() => { router.push('/agendamento'); setAnchorEl(null); }}>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: 'transparent' }}>
                                                    <EventAvailableIcon sx={{ color: iconColor }} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Atendimentos" secondary="Ver agendamentos recebidos" />
                                        </ListItemButton>

                                        <ListItemButton onClick={() => { router.push('/chat'); setAnchorEl(null); }}>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: 'transparent' }}>
                                                    <ChatIcon sx={{ color: iconColor }} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Mensagens" secondary="Converse com usuários" />
                                        </ListItemButton>
                                    </>
                                )}
                        </List>

                        <Divider />

                        <Box sx={{ p: 1, display: 'flex', gap: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                            {perfil ? (
                                <>
                                    <Button
                                        variant="outlined"
                                        startIcon={<SwitchAccountIcon sx={{ color: 'success.main' }} />}
                                        onClick={() => {
                                            const next = perfil === 'cliente' ? 'voluntario' : 'cliente';
                                            setPerfil(next);
                                            
                                            if (next === 'voluntario') router.push('/voluntario');
                                            else router.push('/perfil');
                                            setAnchorEl(null);
                                        }}
                                        size="small"
                                        sx={{ minWidth: 140, textTransform: 'none' }}
                                    >
                                        Trocar Perfil
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="error"
                                        startIcon={<LogoutIcon sx={{ color: '#fff' }} />}
                                        onClick={() => { setPerfil(null); router.push('/'); setAnchorEl(null); }}
                                        size="small"
                                        sx={{ minWidth: 90, textTransform: 'none' }}
                                    >
                                        Sair
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => { router.push('/'); setAnchorEl(null); }}
                                    size="small"
                                    sx={{ minWidth: 140, textTransform: 'none' }}
                                >
                                    Criar Conta
                                </Button>
                            )}
                        </Box>
                    </Menu>
                </div>
            </div>

            {menuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-md rounded-b-md md:hidden z-40 mx-4">
                    <nav className="flex flex-col p-4 space-y-2 text-gray-700" aria-label="Menu de navegação mobile">
                        <button onClick={() => router.push("/home")} aria-label="Ir para Home" className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Home</button>
                        <button onClick={() => router.push("/servicos")} aria-label="Ir para Serviços" className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Serviços</button>
                        <button onClick={() => router.push("/sobrenos")} aria-label="Ir para Sobre nós" className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Sobre nós</button>
                        <button onClick={() => router.push("/voluntario")} aria-label="Ir para Voluntários" className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Voluntários</button>
                        <button onClick={() => router.push("/postagens")} aria-label="Ir para Notícias" className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Notícias</button>
                        <hr className="my-2" />
                        {perfil === 'cliente' && (
                            <>
                                <button onClick={() => router.push('/perfil')} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Meu Perfil</button>
                                <button onClick={() => router.push(`/cliente/${getUserId()}/alterar`)} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Editar Dados</button>
                                <button onClick={() => router.push('/agendamento')} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Meus Agendamentos</button>
                                <button onClick={() => router.push('/agendamento/solicitar')} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Solicitar Atendimento</button>
                                <button onClick={() => router.push('/chat')} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Mensagens</button>
                                <button onClick={() => router.push('/postagens')} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Notícias</button>
                            </>
                        )}

                        {perfil === 'voluntario' && (
                            <>
                                <button onClick={() => router.push('/voluntario')} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Painel Voluntário</button>
                                <button onClick={() => router.push(`/voluntario/editar/${getUserId()}`)} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Editar Perfil</button>
                                <button onClick={() => router.push('/agendamento')} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Atendimentos</button>
                                <button onClick={() => router.push('/chat')} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Mensagens</button>
                                <button onClick={() => router.push('/postagens')} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Notícias</button>
                            </>
                        )}

                        <button onClick={() => router.push("/")} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer text-red-600">Sair</button>
                    </nav>
                </div>
            )}
        </header>
    );
}





