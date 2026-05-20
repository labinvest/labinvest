import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

interface Props {
  selected: string[];
  onChange: (certificados: string[]) => void;
}

const certificacoesDisponiveis = [
  'CPA-10',
  'CPA-20',
  'CEA',
  'CFP',
  'CGA',
];

export default function CertificadosCheckbox({ selected, onChange }: Props) {
  const handleToggle = (cert: string, checked: boolean) => {
    const updated = checked
      ? [...selected, cert]
      : selected.filter((c) => c !== cert);
    onChange(updated);
  };

  return (
    <FormGroup className="flex flex-col gap-2">
      {certificacoesDisponiveis.map((cert) => (
        <FormControlLabel
          key={cert}
          control={
            <Checkbox
              checked={selected.includes(cert)}
              onChange={(e) => handleToggle(cert, e.target.checked)}
              color="success"
            />
          }
          label={cert}
        />
      ))}
    </FormGroup>
  );
}
