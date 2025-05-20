const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8080;

// Array de libros con ID
const libros = [
    {
        id: 1,
        autor: "Gabriel García Márquez",
        titulo: "Cien años de soledad",
        descripcion: "Historia de la familia Buendía en Macondo.",
        tipo: "Ficción"
    },
    {
        id: 2,
        autor: "Yuval Noah Harari",
        titulo: "Sapiens",
        descripcion: "Resumen de la historia humana.",
        tipo: "Ensayo"
    },
    {
        id: 3,
        autor: "J.K. Rowling",
        titulo: "Harry Potter y la piedra filosofal",
        descripcion: "Un niño mago descubre su destino.",
        tipo: "Fantasía"
    }
];

// Ruta para obtener todos los libros
app.get('/libros', (req, res) => {
    res.json(libros);
});

// Ruta para buscar libro por ID
app.get('/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const libro = libros.find(l => l.id === id);

    if (libro) {
        res.json(libro);
    } else {
        res.status(404).json({ error: 'Libro no encontrado' });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
