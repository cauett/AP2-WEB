import { TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem, Button, FormLabel, FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// Componente de cadastro de aluno
const Cadastrar = () => {
    const [nome, setNome] = useState(""); // Estado para armazenar o nome do aluno
    const [curso, setCurso] = useState(""); // Estado para armazenar o curso do aluno
    const [ira, setIra] = useState(""); // Estado para armazenar o IRA do aluno

    const navigate = useNavigate(); // Hook para realizar a navegação entre rotas

    // Função de envio do formulário
    function handleSubmit(event) {
        event.preventDefault();

        const novoAluno = { nome, curso, ira }; // Cria um objeto com os dados do aluno
        axios
            .post("http://localhost:3001/aluno/register", novoAluno) // Envia uma requisição POST para cadastrar o aluno
            .then((response) => {
                alert(`Aluno ID ${response.data._id} adicionado!`); // Exibe um alerta com o ID do aluno adicionado
                navigate("/listarAluno"); // Navega para a página de listagem de alunos
            })
            .catch((error) => console.log(error));
    }

    return (
        <>
            {/* Título "Cadastrar Aluno" */}
            <Typography variant="h5" fontWeight="bold">
                Cadastrar Aluno
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                {/* Campo de input para o nome */}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nome"
                    name="nome"
                    label="Nome Completo"
                    autoFocus
                    onChange={(event) => setNome(event.target.value)}
                />

                {/* Implementação do select para escolher o curso */}
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="select-tit-label">Curso</InputLabel>
                    <Select
                        labelId="select-tit-label"
                        label="Curso"
                        value={curso}
                        onChange={(event) => setCurso(event.target.value)}
                    >
                        <MenuItem value="DD">DD</MenuItem>
                        <MenuItem value="SI">SI</MenuItem>
                        <MenuItem value="CC">CC</MenuItem>
                        <MenuItem value="ES">ES</MenuItem>
                        <MenuItem value="EC">EC</MenuItem>
                        <MenuItem value="RC">RC</MenuItem>
                    </Select>
                </FormControl>

                {/* Campo de input para o IRA */}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="ira"
                    name="ira"
                    label="Ira"
                    onChange={(event) => setIra(event.target.value)}
                />

                {/* Botão de cadastrar */}
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button type="submit" variant="contained" sx={{ my: 3 }}>
                        Cadastrar
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default Cadastrar;

// O componente acima é responsável por exibir um formulário para cadastrar um aluno.
// Ele contém campos de input para o nome, curso e IRA do aluno.
// Quando o formulário é enviado, é feita uma requisição POST para cadastrar o aluno no backend.
// Após o cadastro, é exibido