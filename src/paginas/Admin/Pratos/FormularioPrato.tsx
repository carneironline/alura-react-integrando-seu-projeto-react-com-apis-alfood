import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IPrato from "../../../interfaces/IPrato";
import http from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function FormularioPrato() {
    const parametros = useParams()
    const [nomePrato, setNomePrato] = useState('')
    const [descricao, setDescricao] = useState('')
    const [tags, setTags] = useState<ITag[]>([])
    const [tag, setTag] = useState('')
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    const [restaurante, setRestaurante] = useState('')
    const [imagem, setImagem] = useState<File | null>(null)
    const boxStyle = {display: 'flex', flexDirection: 'column', alignItems: 'center'}
    const buttonLabel = parametros?.id ? 'Atualizar' : 'Salvar'

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const dataBody = { nome: nomePrato}

        if(parametros.id) {
            http.put(`pratos/${parametros.id}/`, dataBody)
            .then(() => {
                alert(`prato ${nomePrato} atualizado`)
            })
        } else {
            http.post('pratos/', dataBody)
            .then(() => {
                alert(`prato cadastrado ${nomePrato}`)
            })
        }
    }

    function selecionarArquivo(event: React.ChangeEvent<HTMLInputElement>) {
        if(event.target.files?.length) {
            setImagem(event.target.files[0])
        } else {
            setImagem(null)
        }
    }

    useEffect(() => {
        if(parametros.id) {
            http.get<IPrato>(`pratos/${parametros.id}/`)
                .then(response => setNomePrato(response.data.nome))
        }
    }, [parametros])

    useEffect(() => {
        http.get<{ tags: ITag[] }>(`tags/`)
            .then(response => {
                setTags(response.data.tags)
            })

        http.get<IRestaurante[]>(`restaurantes/`)
            .then(response => {
                setRestaurantes(response.data)
            })
    }, [])
    
    return (
        <Box sx={boxStyle}>
            <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
            
            <Box component="form" onSubmit={handleSubmit} sx={{width: '100%'}}>
                <TextField
                label="Nome do Prato"
                variant="standard"
                value={nomePrato}
                onChange={event => setNomePrato(event.target.value)}
                fullWidth
                required
                margin="dense"
                />

                <TextField
                label="Descrição do Prato"
                variant="standard"
                value={descricao}
                onChange={event => setDescricao(event.target.value)}
                fullWidth
                required
                margin="dense"
                />

                <FormControl margin="dense" fullWidth>
                    <InputLabel id="selectTag">Tag</InputLabel>
                    <Select labelId="selectTag" value={tag} onChange={event => setTag(event.target.value)}>
                        {tags.map(tag => <MenuItem value={tag.id} key={tag.id}>{tag.value}</MenuItem>)}
                    </Select>
                </FormControl>

                <FormControl margin="dense" fullWidth>
                    <InputLabel id="selectRestaurante">Restaurante</InputLabel>
                    <Select labelId="selectRestaurante" value={restaurante} onChange={event => setRestaurante(event.target.value)}>
                        {restaurantes.map(restaurante => <MenuItem value={restaurante.id} key={restaurante.id}>{restaurante.nome}</MenuItem>)}
                    </Select>
                </FormControl>

                <input type="file" onChange={selecionarArquivo} />

                <Button sx={{marginTop: 2}} type="submit" variant="outlined" fullWidth>{buttonLabel}</Button>
            </Box>
        </Box>
    )
}