import React from 'react';
import { Container, Box, Typography, TextField, Button, Link } from '@mui/material';

// Componente Signin para exibir o formulário de login
const Signin = () => {
    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 10,
                }}
            >
                {/* Título "Sign in" */}
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                {/* Campo de input para email */}
                <TextField
                    required
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Endereço de e-mail"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />

                {/* Campo de input para senha */}
                <TextField
                    required
                    margin="normal"
                    fullWidth
                    name="senha"
                    label="Senha"
                    type="password"
                    id="senha"
                />

                {/* Botão de login */}
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Sign In
                </Button>

                {/* Links para redefinir senha e criar conta */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                    width="100%"
                >
                    <Link href="#" underline="none" className="link">
                        Esqueceu a senha?
                    </Link>

                    <Link href="#" underline="none" className="link">
                        Não tem conta? Cadastre-se.
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default Signin;

// O componente acima renderiza um formulário de login.
// Ele inclui campos para email e senha, além de um botão de login.
// Também contém links para redefinição de senha e criação de conta.