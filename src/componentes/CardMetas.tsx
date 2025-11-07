import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from "@mui/material/TextField";

interface CardMetasProps {
    titulo: string;
    lista: string[];
    cor : string;
    icon: any;
    onListChange?: (index: number, value: string) => void;
    
}

export default function CardMetas({ titulo, lista, cor, icon, onListChange }: CardMetasProps) {


    return (
        <>
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className={`bg-${cor}-100 p-3 rounded-full`}>
                    <FontAwesomeIcon icon={icon} className={`text-${cor}-700 text-2xl`} />
                </div>
                <h3 className={`text-xl font-bold text-${cor}-700`}>{titulo}</h3>
            </div>
            <div className="space-y-4">
                {lista.map((item, index) => (
                    <div key={index}>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            {`${titulo.slice(0, -1)} ${index + 1}`}
                        </label>
                        <TextField
                               
                            fullWidth
                            variant="outlined"
                            size="small"
                            multiline
                            value={item}
                            onChange={(e) => onListChange?.(index, e.target.value)}
                        />
                        
                    </div>
                ))}
            </div>
        </div>
        
        </>
    );
}