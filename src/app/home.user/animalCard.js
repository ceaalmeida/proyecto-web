"use client";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import "./style.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
const buttons = ["Adoptar", "Donar", "MAS"];
export function AnimalCard({ elements,onButtonClick }) {
  console.log(elements);

  return (
    <>
      {elements.map((element) => (
        <Card sx={{ maxWidth: 345 }} className="card">
          <CardMedia
            component="img"
            alt={element.Especie}
            height="140"
            image="./animal.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {element.Nombre}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Raza: {element.Raza}
              <br />
              Precio adopcion: {element.Precio_Adopción}
            </Typography>
          </CardContent>
          <CardActions>
            {buttons.map((butt) => (
              <Button
                size="small"
                key={butt}
                onClick={() => onButtonClick(butt,element)}
              >
                {butt}
              </Button>
            ))}
            {/* <Button size="small">Donar</Button>
                <Button size="small">Mas..</Button> */}
          </CardActions>
        </Card>
      ))}
    </>
  );
}