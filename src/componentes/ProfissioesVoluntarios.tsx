import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const profissoesFinanceiras = [
  'Consultor financeiro pessoal',
  'Planejador financeiro (CFP)',
  'Educador financeiro',
  'Agente autônomo de investimentos (AAI)',
  'Especialista em crédito e renegociação',
  'Analista financeiro',
  'Controller',
  'Consultor de finanças corporativas',
  'Gestor de riscos',
  'Contador',
  'Auditor financeiro',
  'Analista de investimentos (CNPI)',
  'Especialista em compliance financeiro',
  'Gestor de fundos (CGA)',
  'Corretor de seguros e previdência',
];

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SelectProfissaoFinanceira({ value, onChange }: Props) {
  return (
    <FormControl fullWidth size="small">
      <InputLabel>Profissão</InputLabel>
      <Select
        value={value}
        label="Profissão"
        onChange={(e) => onChange(e.target.value)}
        color="success"
      >
        {profissoesFinanceiras.map((profissao) => (
          <MenuItem key={profissao} value={profissao}>
            {profissao}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
