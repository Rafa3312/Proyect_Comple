import { useState } from 'react';
import axios from 'axios';

export default function SearchInput({ label, apiUrl, id, selectedId, setSelectedId }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        setQuery(e.target.value);
        if (e.target.value.length > 0) {
            try {
                const response = await axios.get(`${apiUrl}?search=${e.target.value}`);
                setResults(response.data);
            } catch (error) {
                console.error(`Error al buscar en ${apiUrl}:`, error);
            }
        } else {
            setResults([]);
        }
    };

    const handleSelect = (item) => {
        setSelectedId(item.id);
        setQuery(item.nombre);
        setResults([]); // Limpiamos los resultados después de seleccionar
    };

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{label}</label>
            <input
                className="form-control"
                id={id}
                value={query}
                onChange={handleSearch}
                required
                type="text"
                placeholder="Buscar..."
            />
            {results.length > 0 && (
                <ul className="list-group">
                    {results.map((item) => (
                        <li
                            key={item.id}
                            className="list-group-item"
                            onClick={() => handleSelect(item)}
                            style={{ cursor: 'pointer' }}
                        >
                            {item.nombre}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
