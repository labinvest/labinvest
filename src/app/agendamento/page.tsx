"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faTag, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useRouter } from "next/navigation";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


interface Agendamento {
    id: number;
    titulo: string;
    data: string;
    tipo: string;
    status: string;
}


export default function TelaAgendamentos() {
    const [agendamentosFixos,setAgendamentosFixos] = useState<Agendamento[]>([]);

    useEffect(() => {
    fetch("/api/agendamento", {
      method: "GET"
    }).then((async (response) => {
      const data = await response.json();
      setAgendamentosFixos(data);
        }));
    }, []);

    const [perfil, setPerfil] = useState<string | null>(null);
    const [filtro, setFiltro] = useState("");
    const router = useRouter();
    useEffect(() => {
        const perfil = localStorage.getItem("perfil");
        setPerfil(perfil);
    }, []);

    const agendamentosFiltrados = agendamentosFixos?.filter((item) =>
        item.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
        item.tipo.toLowerCase().includes(filtro.toLowerCase()) ||
        item.status.toLowerCase().includes(filtro.toLowerCase())
    );
    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
  
        <>
          <div className="max-w-5xl mx-auto py-8 px-4">
            <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Solicitações" value="1" />
                <Tab label="Confirmadas" value="2" />
                <Tab label="Canceladas" value="3" />
                </TabList>
            </Box>
            <TabPanel value="1">
                
                <div className="max-w-5xl mx-auto py-8 px-4">
                    <h1 className="text-2xl font-bold mb-4">
                        {perfil === "usuario" ? "Meus Agendamentos" : "Solicitações de Agendamento"}
                    </h1>
                    
                    {/* Filtros */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 2, mb: 3 }}>
                        <TextField
                            label="Buscar por título"
                            variant="outlined"
                            size="small"
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                        />
                        <FormControl size="small" fullWidth>
                            <InputLabel>Tipo</InputLabel>
                            <Select label="Tipo" defaultValue="">
                                <MenuItem value="">Todos os tipos</MenuItem>
                                <MenuItem value="financas">Finanças Pessoais</MenuItem>
                                <MenuItem value="investimentos">Investimentos</MenuItem>
                                <MenuItem value="dividas">Gestão de Dívidas</MenuItem>
                                <MenuItem value="previdencia">Previdência</MenuItem>
                                <MenuItem value="empresarial">Finanças Empresariais</MenuItem>
                                <MenuItem value="educacao">Educação</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl size="small" fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select label="Status" defaultValue="">
                                <MenuItem value="">Todos os status</MenuItem>
                                <MenuItem value="confirmado">Confirmado</MenuItem>
                                <MenuItem value="pendente">Pendente</MenuItem>
                                <MenuItem value="cancelado">Cancelado</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            type="date"
                            variant="outlined"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            label="Data"
                        />
                    </Box>

                    <ul className="space-y-4">
                        {agendamentosFiltrados?.map((item) => (
                            <li key={item.id} onClick={() => router.push(`/agendamento/${item.id}`)} className="cursor-pointer bg-white shadow p-4 rounded-lg">
                                <h2 className="text-lg font-semibold">{item.titulo}</h2>
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
                                    {item.data}
                                </p>
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faTag} className="text-gray-500" />
                                    {item.tipo}
                                </p>
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-gray-500" />
                                    {item.status}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
          
            </TabPanel>
            <TabPanel value="2">
                <div className="max-w-5xl mx-auto py-8 px-4">
                    <h1 className="text-2xl font-bold mb-4">Agendamentos Confirmados</h1>
                    
                    {/* Filtros */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 2, mb: 3 }}>
                        <TextField
                            label="Buscar por título"
                            variant="outlined"
                            size="small"
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                        />
                        <FormControl size="small" fullWidth>
                            <InputLabel>Tipo</InputLabel>
                            <Select label="Tipo" defaultValue="">
                                <MenuItem value="">Todos os tipos</MenuItem>
                                <MenuItem value="financas">Finanças Pessoais</MenuItem>
                                <MenuItem value="investimentos">Investimentos</MenuItem>
                                <MenuItem value="dividas">Gestão de Dívidas</MenuItem>
                                <MenuItem value="previdencia">Previdência</MenuItem>
                                <MenuItem value="empresarial">Finanças Empresariais</MenuItem>
                                <MenuItem value="educacao">Educação</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl size="small" fullWidth>
                            <InputLabel>Ordenar por</InputLabel>
                            <Select label="Ordenar por" defaultValue="">
                                <MenuItem value="">Ordenar por</MenuItem>
                                <MenuItem value="data-asc">Data (mais antiga)</MenuItem>
                                <MenuItem value="data-desc">Data (mais recente)</MenuItem>
                                <MenuItem value="titulo">Título</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            type="date"
                            variant="outlined"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            label="Data"
                        />
                    </Box>

                    <ul className="space-y-4">
                        {agendamentosFiltrados?.filter((item) => item.status === "Confirmado")
                            .map((item) => (
                            <li key={item.id} onClick={() => router.push(`/agendamento/${item.id}`)} className=" cursor-pointer bg-white shadow p-4 rounded-lg border-l-4 border-green-600">
                                <h2 className="text-lg font-semibold">{item.titulo}</h2>
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
                                    {item.data}
                                </p>
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faTag} className="text-gray-500" />
                                    {item.tipo}
                                </p>
                                <p className="text-sm text-green-600 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
                                    {item.status}
                                </p>
                            </li>
                        ))}
                    </ul>
                    {agendamentosFiltrados?.filter((item) => item.status === "Confirmado").length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            Nenhum agendamento confirmado encontrado.
                        </div>
                    )}
                </div>
            </TabPanel>
            <TabPanel value="3">
                <div className="max-w-5xl mx-auto py-8 px-4">
                    <h1 className="text-2xl font-bold mb-4">Agendamentos Cancelados</h1>
                    
                    {/* Filtros */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 2, mb: 3 }}>
                        <TextField
                            label="Buscar por título"
                            variant="outlined"
                            size="small"
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                        />
                        <FormControl size="small" fullWidth>
                            <InputLabel>Tipo</InputLabel>
                            <Select label="Tipo" defaultValue="">
                                <MenuItem value="">Todos os tipos</MenuItem>
                                <MenuItem value="financas">Finanças Pessoais</MenuItem>
                                <MenuItem value="investimentos">Investimentos</MenuItem>
                                <MenuItem value="dividas">Gestão de Dívidas</MenuItem>
                                <MenuItem value="previdencia">Previdência</MenuItem>
                                <MenuItem value="empresarial">Finanças Empresariais</MenuItem>
                                <MenuItem value="educacao">Educação</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl size="small" fullWidth>
                            <InputLabel>Motivo</InputLabel>
                            <Select label="Motivo" defaultValue="">
                                <MenuItem value="">Motivo do cancelamento</MenuItem>
                                <MenuItem value="cliente">Cancelado pelo cliente</MenuItem>
                                <MenuItem value="voluntario">Cancelado pelo voluntário</MenuItem>
                                <MenuItem value="conflito">Conflito de agenda</MenuItem>
                                <MenuItem value="outro">Outro</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            type="date"
                            variant="outlined"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            label="Data"
                        />
                    </Box>

                    <ul className="space-y-4">
                        {agendamentosFiltrados?.filter((item) => item.status === "Cancelado")
                            .map((item) => (
                            <li key={item.id}  onClick={() => router.push(`/agendamento/${item.id}`)} className="bg-white shadow p-4 rounded-lg border-l-4 border-red-600 cursor-pointer">
                                <h2 className="text-lg font-semibold">{item.titulo}</h2>
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
                                    {item.data}
                                </p>
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faTag} className="text-gray-500" />
                                    {item.tipo}
                                </p>
                                <p className="text-sm text-red-600 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-red-600" />
                                    {item.status}
                                </p>
                            </li>
                        ))}
                    </ul>
                    {agendamentosFiltrados?.filter((item) => item.status === "Cancelado").length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            Nenhum agendamento cancelado encontrado.
                        </div>
                    )}
                </div>
            </TabPanel>
            </TabContext>
            </div>
        </>
    );
}
