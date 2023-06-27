import React, { useEffect, useState } from "react";
import {
  IconButton,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import axios from "axios";

// Estiliza a célula da tabela no cabeçalho com estilos personalizados
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// Estiliza a linha da tabela com cores alternadas
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Aprovados = () => {
  const [alunos, setAlunos] = useState([]); // Estado para armazenar os alunos
  const [media, setMedia] = useState(0); // Estado para armazenar a média

  useEffect(() => {
    fetchMedia(); // Chama a função para buscar a média
    fetchAprovados(); // Chama a função para buscar os alunos aprovados
  }, []);

  // Função para buscar a média dos alunos
  const fetchMedia = async () => {
    try {
      const response = await axios.get("http://localhost:3001/aluno/media");
      setMedia(response.data); // Atualiza o estado com a média retornada pela API
    } catch (error) {
      console.log(error);
    }
  };

  // Função para buscar os alunos aprovados
  const fetchAprovados = async () => {
    try {
      const response = await axios.get("http://localhost:3001/aluno/aprovados");
      setAlunos(response.data); // Atualiza o estado com os alunos retornados pela API
    } catch (error) {
      console.log(error);
    }
  };

  // Função para excluir um aluno
  const deleteAluno = async (id) => {
    if (window.confirm("Deseja Excluir? " + id)) {
      try {
        await axios.delete(`http://localhost:3001/Aluno/delete/${id}`);
        deleteAlunoFromList(id); // Chama a função para remover o aluno da lista
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Função para remover o aluno da lista
  const deleteAlunoFromList = (id) => {
    setAlunos((prevAlunos) => prevAlunos.filter((aluno) => aluno._id !== id));
  };

  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        Listar Alunos
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2, mb: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>NOME</StyledTableCell>
              <StyledTableCell>CURSO</StyledTableCell>
              <StyledTableCell>IRA</StyledTableCell>
              <StyledTableCell align="center">AÇÕES</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {alunos.map((aluno) => (
              <StyledTableRow key={aluno._id}>
                <StyledTableCell>{aluno._id}</StyledTableCell>
                <StyledTableCell>{aluno.nome}</StyledTableCell>
                <StyledTableCell>{aluno.curso}</StyledTableCell>
                <StyledTableCell>{aluno.ira}</StyledTableCell>
                <StyledTableCell>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton
                      aria-label="delete"
                      color="primary"
                      onClick={() => deleteAluno(aluno._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      sx={{ ml: 2 }}
                      component={Link}
                      to={`/editarAluno/${aluno._id}`}
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            <StyledTableRow>
              <StyledTableCell>--</StyledTableCell>
              <StyledTableCell>--</StyledTableCell>
              <StyledTableCell>--</StyledTableCell>
              <StyledTableCell>{media}</StyledTableCell>
              <StyledTableCell>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <IconButton
                    disabled
                    aria-label="delete"
                    color="primary"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    disabled
                    aria-label="edit"
                    color="primary"
                    sx={{ ml: 2 }}
                    component={Link}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Aprovados;
