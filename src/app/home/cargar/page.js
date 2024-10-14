"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const initialAnimals = [
  { id: 1, nombre: "Max", especie: "Perro", raza: "Labrador", edad: 3 },
  { id: 2, nombre: "Luna", especie: "Gato", raza: "Siamés", edad: 2 },
  { id: 3, nombre: "Rocky", especie: "Perro", raza: "Pastor Alemán", edad: 5 },
  { id: 4, nombre: "Milo", especie: "Gato", raza: "Persa", edad: 4 },
];

export default function AnimalTable() {
  const [animals, setAnimals] = useState(initialAnimals);
  const [sortOrder, setSortOrder] = useState("asc");
  const [visibleColumns, setVisibleColumns] = useState([
    "nombre",
    "especie",
    "raza",
    "edad",
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingAnimal, setEditingAnimal] = useState(null);
  const [newAnimal, setNewAnimal] = useState({
    nombre: "",
    especie: "",
    raza: "",
    edad: "",
  });

  const sortedAnimals = [...animals].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.nombre.localeCompare(b.nombre);
    } else {
      return b.nombre.localeCompare(a.nombre);
    }
  });

  const filteredAnimals = sortedAnimals.filter((animal) =>
    Object.values(animal).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const toggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const toggleColumn = (column) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const handleDelete = (id) => {
    setAnimals(animals.filter((animal) => animal.id !== id));
  };

  const handleEdit = (animal) => {
    setEditingAnimal(animal);
  };

  const handleSaveEdit = () => {
    setAnimals(
      animals.map((animal) =>
        animal.id === editingAnimal.id ? editingAnimal : animal
      )
    );
    setEditingAnimal(null);
  };

  const handleAdd = () => {
    const id = Math.max(...animals.map((a) => a.id)) + 1;
    setAnimals([...animals, { ...newAnimal, id }]);
    setNewAnimal({ nombre: "", especie: "", raza: "", edad: "" });
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <Input
          placeholder="Buscar animales..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Columnas</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["nombre", "especie", "raza", "edad"].map((column) => (
              <DropdownMenuCheckboxItem
                key={column}
                checked={visibleColumns.includes(column)}
                onCheckedChange={() => toggleColumn(column)}
              >
                {column.charAt(0).toUpperCase() + column.slice(1)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {visibleColumns.includes("nombre") && (
              <TableHead className="cursor-pointer" onClick={toggleSort}>
                Nombre {sortOrder === "asc" ? "↑" : "↓"}
              </TableHead>
            )}
            {visibleColumns.includes("especie") && (
              <TableHead>Especie</TableHead>
            )}
            {visibleColumns.includes("raza") && <TableHead>Raza</TableHead>}
            {visibleColumns.includes("edad") && <TableHead>Edad</TableHead>}
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAnimals.map((animal) => (
            <TableRow key={animal.id}>
              {visibleColumns.includes("nombre") && (
                <TableCell>{animal.nombre}</TableCell>
              )}
              {visibleColumns.includes("especie") && (
                <TableCell>{animal.especie}</TableCell>
              )}
              {visibleColumns.includes("raza") && (
                <TableCell>{animal.raza}</TableCell>
              )}
              {visibleColumns.includes("edad") && (
                <TableCell>{animal.edad}</TableCell>
              )}
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2"
                  onClick={() => handleEdit(animal)}
                >
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(animal.id)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-4">Agregar Animal</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Animal</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {["nombre", "especie", "raza", "edad"].map((field) => (
              <div key={field} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={field} className="text-right">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                <Input
                  id={field}
                  value={newAnimal[field]}
                  onChange={(e) =>
                    setNewAnimal({ ...newAnimal, [field]: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            ))}
          </div>
          <Button onClick={handleAdd}>Agregar</Button>
        </DialogContent>
      </Dialog>

      {editingAnimal && (
        <Dialog
          open={!!editingAnimal}
          onOpenChange={() => setEditingAnimal(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Animal</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {["nombre", "especie", "raza", "edad"].map((field) => (
                <div
                  key={field}
                  className="grid grid-cols-4 items-center gap-4"
                >
                  <Label htmlFor={`edit-${field}`} className="text-right">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </Label>
                  <Input
                    id={`edit-${field}`}
                    value={editingAnimal[field]}
                    onChange={(e) =>
                      setEditingAnimal({
                        ...editingAnimal,
                        [field]: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
              ))}
            </div>
            <Button onClick={handleSaveEdit}>Guardar Cambios</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
