import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function FormularioRestaurante() {
    const parametros = useParams()
    const [nomeRestaurante, setNomeRestaurante] = useState('')
    const boxStyle = {display: 'flex', flexDirection: 'column', alignItems: 'center'}

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const dataBody = { nome: nomeRestaurante}

        if(parametros.id) {
            axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, dataBody)
            .then(() => {
                alert(`restaurante ${nomeRestaurante} atualizado`)
            })
        } else {
            axios.post('http://localhost:8000/api/v2/restaurantes/', dataBody)
            .then(() => {
                alert(`restaurante cadastrado ${nomeRestaurante}`)
            })
        }

        
    }

    useEffect(() => {
        if(parametros.id) {
            axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
                .then(response => setNomeRestaurante(response.data.nome))
        }
    }, [parametros])
    
    return (
            <Box sx={boxStyle}>
                <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
                
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                    id="NomeRestaurante"
                    label="Nome do Restaurante"
                    variant="standard"
                    value={nomeRestaurante}
                    onChange={event => setNomeRestaurante(event.target.value)}
                    fullWidth
                    required
                    />

                    <Button sx={{marginTop: 2}} type="submit" variant="outlined" fullWidth>Outlined</Button>
                </Box>
            </Box>
    )
}