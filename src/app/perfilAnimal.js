import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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
  Psychology,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import DonacionService from "../../../api/donacion/donacion.service";

export function AnimalProfile({ animal, onButtonClick }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [open, setOpen] = React.useState(true);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [newDonacion, setNewDonacion] = React.useState({
    Nombre_Donante: "",
    Monto: "",
    Fecha: "",
    Email_Donante: "",
    Telefono_Donante: "",
    ID_Animal: animal ? animal.ID_Animal : "",
  });
  const [errors, setErrors] = React.useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const validateFields = () => {
    const newErrors = {};
    if (!newDonacion.Nombre_Donante) newErrors.Nombre_Donante = "El nombre es requerido.";
    if (!newDonacion.Monto) newErrors.Monto = "El monto es requerido.";
    if (!newDonacion.Fecha) newErrors.Fecha = "La fecha es requerida.";
    if (!newDonacion.Email_Donante) newErrors.Email_Donante = "El email es requerido.";
    if (!newDonacion.Telefono_Donante) newErrors.Telefono_Donante = "El teléfono es requerido.";
    return newErrors;
  };

  const handleAdd = async () => {
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const id = Math.floor(100000 + Math.random() * 900000);
    newDonacion.ID_Donacion = id;

    try {
      await DonacionService.create(newDonacion);
      setOpenAddDialog(false);
      window.alert("Donación creada exitosamente");
      setNewDonacion({
        Nombre_Donante: "",
        Monto: "",
        Fecha: "",
        Email_Donante: "",
        Telefono_Donante: "",
        ID_Animal: animal ? animal.ID_Animal : "",
      });
      setErrors({});
    } catch (error) {
      window.alert("Error al crear la donación");
    }
  };

  if (!animal) {
    return (
      <Card sx={{ maxWidth: 600, margin: "auto", mt: 4, p: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Cargando perfil del animal...
        </Typography>
      </Card>
    );
  }

  return (
    <>
      {session ? (
        <div className="contenedor" style={{ width: "50%" }}>
          <Card style={{ width: "100%", maxwidth: "600px" }}>
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: "primary.main" }}><Pets /></Avatar>}
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
                    <ListItemText primary={`Días en el refugio: ${animal.Dias_Refugio}`} />
                  </ListItem>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6">Costos</Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <AttachMoney />
                      </ListItemIcon>
                      <ListItemText primary={`Mantenimiento diario: $${animal.Precio_Mantenimiento}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Favorite />
                      </ListItemIcon>
                      <ListItemText primary={`Precio de adopción: $${animal.Precio_Adopción}`} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
              <Button onClick={() => onButtonClick("Animales")}>Atras</Button>
              <Button onClick={() => onButtonClick("Adopcion", animal)}>Adoptar</Button>
              <Button onClick={() => setOpenAddDialog(true)}>Donar</Button>
            </CardContent>
          </Card>
        </div>
      ) : (
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
              <Button onClick={() => {handleClose(); onButtonClick("Animales")}}>Atras</Button>
              <Button onClick={() => router.push("../login")} autoFocus>
                Iniciar sesion
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}

      {/* Diálogo para agregar la donación */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Agregar Nueva Donación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, ingrese los detalles de la nueva donación.
          </DialogContentText>
          <TextField
            margin="dense"
            label="Nombre Donante"
            type="text"
            fullWidth
            variant="standard"
            value={newDonacion.Nombre_Donante}
            onChange={(e) => setNewDonacion({ ...newDonacion, Nombre_Donante: e.target.value })}
            error={!!errors.Nombre_Donante}
            helperText={errors.Nombre_Donante}
          />
          <TextField
            margin="dense"
            label="Monto"
            type="number"
            fullWidth
            variant="standard"
            value={newDonacion.Monto}
            onChange={(e) => setNewDonacion({ ...newDonacion, Monto: parseFloat(e.target.value) })}
            error={!!errors.Monto}
            helperText={errors.Monto}
          />
          <TextField
            margin="dense"
            label="Fecha"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={newDonacion.Fecha}
            onChange={(e) => setNewDonacion({ ...newDonacion, Fecha: e.target.value })}
            error={!!errors.Fecha}
            helperText={errors.Fecha}
          />
          <TextField
            margin="dense"
            label="Email Donante"
            type="email"
            fullWidth
            variant="standard"
            value={newDonacion.Email_Donante}
            onChange={(e) => setNewDonacion({ ...newDonacion, Email_Donante: e.target.value })}
            error={!!errors.Email_Donante}
            helperText={errors.Email_Donante}
          />
          <TextField
            margin="dense"
            label="Teléfono Donante"
            type="text"
            fullWidth
            variant="standard"
            value={newDonacion.Telefono_Donante}
            onChange={(e) => setNewDonacion({ ...newDonacion, Telefono_Donante: e.target.value })}
            error={!!errors.Telefono_Donante}
            helperText={errors.Telefono_Donante}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancelar</Button>
          <Button onClick={handleAdd} color="primary">Agregar Donación</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

