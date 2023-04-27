import { useEffect, useState } from "react"
import IRestaurante from "../../../interfaces/IRestaurante"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Link } from "react-router-dom"
import http from "../../../http"

export default function AdminRestaurantes() {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    function handleExcluir(restaurante: IRestaurante) {
        http.delete(`restaurantes/${restaurante.id}/`)
        .then(() => {
            const listaRestaurante = restaurantes.filter(item => item.id !== restaurante.id)
            setRestaurantes([...listaRestaurante])
        })
    }

    useEffect(() => {
        http.get<IRestaurante[]>('restaurantes/')
            .then(response => setRestaurantes(response.data))
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Excluir</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => (
                        <TableRow key={restaurante.id}>
                            <TableCell>{restaurante.nome}</TableCell>
                            <TableCell>[ <Link to={`/admin/restaurantes/${restaurante.id}`}>editar</Link> ]</TableCell>
                            <TableCell><Button variant="outlined" color="error" onClick={() => handleExcluir(restaurante)}>Excluir</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}