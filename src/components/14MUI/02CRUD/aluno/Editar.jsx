import { TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

const Editar = () => {
    const { id } = useParams() // Obtém o parâmetro 'id' da URL
    const navigate = useNavigate() // Retorna uma função de navegação para redirecionar para outras rotas

    const [nome, setNome] = useState("") // Define o estado para o nome do aluno
    const [curso, setCurso] = useState("") // Define o estado para o curso do aluno
    const [ira, setIra] = useState("") // Define o estado para o IRA do aluno

    useEffect(() => {
        // Executa quando o componente é montado ou quando o valor de 'id' muda
        axios
            .get(`http://localhost:3001/aluno/retrieve/${id}`)
            .then((response) => {
                const { nome, curso, ira } = response.data // Extrai os dados do aluno da resposta da API
                setNome(nome) // Atualiza o estado do nome com o valor obtido da API
                setCurso(curso) // Atualiza o estado do curso com o valor obtido da API
                setIra(ira) // Atualiza o estado do IRA com o valor obtido da API
            })
            .catch((error) => console.log(error))
    }, [id]) // O array de dependências indica que o efeito deve ser reexecutado quando 'id' muda

    function handleSubmit(event) {
        event.preventDefault() // Evita o comportamento padrão de envio do formulário

        const alunoAtualizado = { nome, curso, ira } // Cria um objeto com os dados atualizados do aluno
        axios
            .put(`http://localhost:3001/aluno/update/${id}`, alunoAtualizado)
            .then((response) => {
                alert(`Aluno ID ${response.data._id} atualizado!`) // Exibe um alerta com a mensagem de sucesso
                navigate("/listarAluno") // Navega para a rota "/listarAluno"
            })
            .catch((error) => console.log(error))
    }

    return (
        <>
            <Typography variant="h5" fontWeight="bold">
                Editar Aluno
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nome"
                    name="nome"
                    value={nome}
                    label="Nome Completo"
                    autoFocus
                    onChange={(event) => setNome(event.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="curso"
                    name="curso"
                    value={curso}
                    label="Curso"
                    onChange={(event) => setCurso(event.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="ira"
                    name="ira"
                    value={ira}
                    label="Ira"
                    onChange={(event) => setIra(event.target.value)}
                />

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button type="submit" variant="contained" sx={{ my: 3 }}>
                        Atualizar
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default Editar
