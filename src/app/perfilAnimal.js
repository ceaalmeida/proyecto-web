
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  CircularProgress,
  
} from "@mui/material";
import {
  Pets,
  CalendarToday,
  Scale,
  AttachMoney,
  Favorite,
  LocalHospital,
  Psychology,

} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
export function AnimalProfile({ animal, onButtonClick }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  if (!animal) {
    return (
      <Card
        sx={{ maxWidth: 600, margin: "auto", mt: 4, p: 4, textAlign: "center" }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Cargando perfil del animal...
        </Typography>
      </Card>
    );
  }

  return (
    <>
      {session && (
        <div className="contenedor" style={{ width: "50%" }}>
          <Card style={{ width: "100%", maxwidth: "600px" }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <Pets />
                </Avatar>
              }
              title={<Typography variant="h5">{animal.Nombre}</Typography>}
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                    Información Básica
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary={`Especie: ${animal.Especie}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Raza: ${animal.Raza}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CalendarToday fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={`Edad: ${animal.Edad} años`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Scale fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={`Peso: ${animal.Peso} kg`} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">Estadía en el Refugio</Typography>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarToday />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Días en el refugio: ${animal.Dias_Refugio}`}
                    />
                  </ListItem>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6">Costos</Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <AttachMoney />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Mantenimiento diario: $${animal.Precio_Mantenimiento}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Favorite />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Precio de adopción: $${animal.Precio_Adopción}`}
                      />
                    </ListItem>
                  </List>

                  <Divider sx={{ my: 2 }} />

                  {/* <Typography variant="h6">Estado de Salud</Typography> */}
                  {/* <List dense>
              <ListItem>
                <Chip
                  label={animal.Estado_Salud || "No especificado"}
                  color={
                    animal.Estado_Salud === "Saludable" ? "success" : "warning"
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocalHospital />
                </ListItemIcon>
                <ListItemText
                  primary={`Vacunado: ${animal.Vacunado ? "Sí" : "No"}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocalHospital />
                </ListItemIcon>
                <ListItemText
                  primary={`Esterilizado: ${animal.Esterilizado ? "Sí" : "No"}`}
                />
              </ListItem>
            </List> */}

                  {animal.Personalidad && (
                    <>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="h6">Personalidad</Typography>
                      <ListItem>
                        <ListItemIcon>
                          <Psychology />
                        </ListItemIcon>
                        <ListItemText primary={animal.Personalidad} />
                      </ListItem>
                    </>
                  )}
                </Grid>
              </Grid>
              <Button onClick={() => onButtonClick("Animales")}>Atras</Button>
              <Button onClick={() => onButtonClick("Adopcion", animal)}>
                Adoptar
              </Button>
              <Button onClick={() => onButtonClick("Donacion", animal)}>
                Donar
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      {!session && (
        <div className="container">
          
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Debe iniciar sesion para poder ver los perfiles de los animales"}
            </DialogTitle>
            <DialogActions>
            <Button onClick={()=>({handleClose},onButtonClick("Animales"))}>Atras</Button>
              <Button
                onClick={() => {
                  router.push("../login");
                }}
                autoFocus
              >
                Iniciar sesion
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
}
