import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function FormularioRestaurante() {
    const [nomeRestaurante, setNomeRestaurante] = useState('')

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const dataBody = { nome: nomeRestaurante}

        axios.post('http://localhost:8000/api/v2/restaurantes/', dataBody)
            .then(() => {
                alert(`restaurante cadastrado ${nomeRestaurante}`)
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
            id="asd"
            label="asd"
            variant="standard"
            value={nomeRestaurante}
            onChange={event => setNomeRestaurante(event.target.value)}
            />

            <Button type="submit" variant="outlined">Outlined</Button>
        </form>
    )
}