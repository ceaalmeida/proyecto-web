"use client";
import {useRouter} from "next/navigation";
import {Box, Container, CssBaseline, Paper, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React from "react";
import {PawPrint} from "lucide-react";


export default function App({onLogin}) {
    const router = useRouter()
    return (
        <Container component={"main"} maxWidth={'sx'}>
            <CssBaseline/>
            <Paper
                elevation={3}
                sx={{
                    mt: 8,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <div>
                    <Typography component="h1" variant="h5">
                        Amigos de Patas
                        {<PawPrint>

                        </PawPrint>}
                    </Typography>

                 </div>
                <Box component={'form'} noValidate sx={{mt: 1}}>
                    <TextField>
                        Candela
                    </TextField>
                </Box>

            </Paper>

        </Container>
    )

}
