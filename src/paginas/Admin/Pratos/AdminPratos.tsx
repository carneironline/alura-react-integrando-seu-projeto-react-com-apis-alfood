import { useEffect, useState } from "react"
import IPrato from "../../../interfaces/IPrato"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Link } from "react-router-dom"
import http from "../../../http"

export default function AdminPratos() {
    const [pratos, setPratos] = useState<IPrato[]>([])

    function handleExcluir(prato: IPrato) {
        http.delete(`pratos/${prato.id}/`)
        .then(() => {
            const listaPrato = pratos.filter(item => item.id !== prato.id)
            setPratos([...listaPrato])
        })
    }

    useEffect(() => {
        http.get<IPrato[]>('pratos/')
            .then(response => setPratos(response.data))
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Tag</TableCell>
                        <TableCell>Imagem</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Excluir</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pratos.map(prato => (
                        <TableRow key={prato.id}>
                            <TableCell>{prato.nome}</TableCell>
                            <TableCell>{prato.tag}</TableCell>
                            <TableCell><a href={prato.imagem} target="_blank"><img src={prato.imagem} width={100} title={prato.nome} /></a></TableCell>
                            <TableCell>[ <Link to={`/admin/pratos/${prato.id}`}>editar</Link> ]</TableCell>
                            <TableCell><Button variant="outlined" color="error" onClick={() => handleExcluir(prato)}>Excluir</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}