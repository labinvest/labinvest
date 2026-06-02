"use client"
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AddIcon from '@mui/icons-material/Add';
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
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EditIcon from "@mui/icons-material/Edit";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { fetchAPI } from "@/services/api";

export default function NavBar() {
    const pathname = usePathname();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [perfil, setPerfil] = useState<string | null>(null);
    const [volId, setVolId] = useState<number | null>(null);
    const [hasSession, setHasSession] = useState(false);
    const iconColor = 'success.main';
    const isCliente = perfil === 'cliente';
    const isVoluntario = perfil === 'voluntario';
    const isAdmin = perfil === 'admin';
    const profileLabel = isAdmin ? 'Admin' : isCliente ? 'Cliente' : isVoluntario ? 'Voluntário' : 'Convidado';
    const profileIcon = isVoluntario ? <VolunteerActivismIcon fontSize="small" sx={{ color: '#fff' }} /> : <PersonIcon fontSize="small" sx={{ color: '#fff' }} />;
    
    
    useEffect(() => {
        setMenuOpen(false);
        setAnchorEl(null);

        const syncPerfilFromApi = async () => {
            const token = localStorage.getItem('token');
            setHasSession(Boolean(token));

            if (!token) {
                setPerfil(localStorage.getItem("perfil"));
                setVolId(null);
                return;
            }

            try {
                const res = await fetchAPI('/auth/perfil');
                const role = String(res?.dados?.role || '').toLowerCase();

                if (role) {
                    localStorage.setItem('perfil', role);
                    setPerfil(role);

                    // Se for voluntário, buscar o ID do registro de voluntário
                    if (role === 'voluntario') {
                        try {
                            const volRes = await fetchAPI('/voluntarios/me');
                            const vol = volRes?.dados ?? volRes;
                            if (vol?.id) setVolId(vol.id);
                        } catch {
                            setVolId(null);
                        }
                    }
                    return;
                }
            } catch {
                // fallback to cached value when API is unavailable
            }

            setPerfil(localStorage.getItem("perfil"));
        };

        syncPerfilFromApi();
    }, [pathname]);



    if (['/', '/cliente/cadastro', '/voluntario/cadastro'].includes(pathname)) return null;

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
                        <div className="text-sm text-gray-600">{profileLabel}</div>
                        <IconButton
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                            size="small"
                            aria-controls={Boolean(anchorEl) ? 'profile-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={Boolean(anchorEl)}
                            sx={{ p: 0, bgcolor: 'transparent' }}
                        >
                            <Avatar sx={{ width: 36, height: 36, bgcolor: 'success.main' }}>
                                {profileIcon}
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
                                {profileIcon}
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle1">{profileLabel}</Typography>
                            </Box>
                        </Box>

                        <Divider />

                        <List dense disablePadding>
                                {/* Cliente menu */}
                                {(isCliente || isAdmin) && (
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
                                            <ListItemText primary="Meus Agendamentos" secondary="Ver e gerenciar agendamentos" />
                                        </ListItemButton>

                                        {!isAdmin && (
                                            <ListItemButton onClick={() => { router.push('/voluntario/solicitar'); setAnchorEl(null); }}>
                                                <ListItemAvatar>
                                                    <Avatar sx={{ bgcolor: 'transparent' }}>
                                                        <VerifiedUserIcon sx={{ color: iconColor }} />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="Quero ser voluntário" secondary="Enviar solicitação para aprovação" />
                                            </ListItemButton>
                                        )}

                                        {isAdmin && (
                                            <ListItemButton onClick={() => { router.push('/admin'); setAnchorEl(null); }}>
                                                <ListItemAvatar>
                                                    <Avatar sx={{ bgcolor: 'transparent' }}>
                                                        <ManageAccountsIcon sx={{ color: iconColor }} />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="Painel Admin" secondary="Gerenciar o sistema" />
                                            </ListItemButton>
                                        )}

        
                                    </>
                                )}

                               
                                {(isVoluntario || isAdmin) && (
                                    <>
                                        <ListItemButton onClick={() => { router.push('/voluntario/painel'); setAnchorEl(null); }}>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: 'transparent' }}>
                                                    <VolunteerActivismIcon sx={{ color: iconColor }} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Painel Voluntário" secondary="Acessar área do voluntário" />
                                        </ListItemButton>

                                        <ListItemButton onClick={() => { router.push(volId ? `/voluntario/${volId}` : '/voluntario'); setAnchorEl(null); }}>
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

                                        <ListItemButton onClick={() => { router.push('/postagens/criar'); setAnchorEl(null); }}>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: 'transparent' }}>
                                                    <AddIcon sx={{ color: iconColor }} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Criar Postagem" secondary="Crie uma nova postagem" />
                                        </ListItemButton>
                                    </>
                                )}
                        </List>

                        <Divider />

                        <Box sx={{ p: 1, display: 'flex', gap: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                            {hasSession ? (
                                <>
                                    <Button
                                        variant="outlined"
                                        startIcon={<SwitchAccountIcon sx={{ color: 'success.main' }} />}
                                        onClick={() => {
                                            setAnchorEl(null);
                                            setPerfil(null);
                                            localStorage.removeItem('perfil');
                                            router.push('/');
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
                                        onClick={() => {
                                            setAnchorEl(null);
                                            setPerfil(null);
                                            localStorage.removeItem('perfil');
                                            localStorage.removeItem('token');
                                            router.push('/');
                                        }}
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
                        {(isCliente || isAdmin) && (
                            <>
                                <button onClick={() => router.push('/perfil')} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Meu Perfil</button>
                                <button onClick={() => router.push(`/cliente/1/alterar`)} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Editar Dados</button>
                                {!isAdmin && <button onClick={() => router.push('/voluntario/solicitar')} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Quero ser voluntário</button>}
                                <button onClick={() => router.push('/agendamento')} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Meus Agendamentos</button>
                                <button onClick={() => router.push('/agendamento/solicitar')} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Solicitar Atendimento</button>
                                <button onClick={() => router.push('/postagens')} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Notícias</button>
                                {isAdmin && (
                                    <button onClick={() => router.push('/admin')} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Painel Admin</button>
                                )}
                            </>
                        )}

                        {(isVoluntario || isAdmin) && (
                            <>
                                <button onClick={() => router.push('/voluntario')} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Painel Voluntário</button>
                                <button onClick={() => router.push(`/voluntario/editar/1`)} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Editar Perfil</button>
                                <button onClick={() => router.push('/agendamento')} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Atendimentos</button>
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





