
# 📚 API REST de Libros con Node.js y Express

Este proyecto es una API RESTful hecha con Node.js y Express que permite gestionar una colección de libros en memoria: crear, leer, actualizar y eliminar libros (CRUD).

---

## 🚀 Tecnologías usadas

- **Node.js**  
- **Express.js**

---

## 📦 Instalación y uso

1. Clona el repositorio o copia el archivo:

   ```bash
   git clone https://github.com/tu-usuario/api-libros-node.git
   cd api-libros-node
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Ejecuta el servidor:

   ```bash
   node app.js
   ```

4. Accede a la API en tu navegador o Postman:  
   `http://localhost:8080`

---

## 📂 Endpoints disponibles

| Método | Endpoint           | Descripción                            |
|--------|--------------------|----------------------------------------|
| GET    | `/libros`          | Obtener todos los libros               |
| GET    | `/libros?autor=x`  | Buscar libros por autor                |
| GET    | `/libros/:id`      | Obtener un libro por ID                |
| POST   | `/libros`          | Agregar un nuevo libro                 |
| PUT    | `/libros/:id`      | Actualizar un libro existente          |
| DELETE | `/libros/:id`      | Eliminar un libro por ID               |

---

## 📥 Ejemplo JSON para POST /libros

```json
{
  "autor": "Isabel Allende",
  "titulo": "La casa de los espíritus",
  "descripcion": "Una saga familiar con elementos mágicos.",
  "tipo": "Ficción"
}
```

---

## 📁 Código completo (`app.js`)

```javascript
const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

let libros = [
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

// Obtener todos los libros o buscar por autor
app.get('/libros', (req, res) => {
  const autor = req.query.autor;
  if (autor) {
    const resultado = libros.filter(libro =>
      libro.autor.toLowerCase().includes(autor.toLowerCase())
    );
    if (resultado.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron libros del autor especificado." });
    }
    return res.json(resultado);
  }
  res.json(libros);
});

// Obtener libro por ID
app.get('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const libro = libros.find(l => l.id === id);
  if (libro) {
    res.json(libro);
  } else {
    res.status(404).json({ error: 'Libro no encontrado' });
  }
});

// Crear nuevo libro
app.post('/libros', (req, res) => {
  const { autor, titulo, descripcion, tipo } = req.body;
  if (!autor || !titulo || !descripcion || !tipo) {
    return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
  }
  const nuevoLibro = {
    id: libros.length > 0 ? libros[libros.length - 1].id + 1 : 1,
    autor,
    titulo,
    descripcion,
    tipo
  };
  libros.push(nuevoLibro);
  res.status(201).json(nuevoLibro);
});

// Actualizar libro por ID
app.put('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const libro = libros.find(l => l.id === id);
  if (!libro) {
    return res.status(404).json({ mensaje: "Libro no encontrado" });
  }
  const { autor, titulo, descripcion, tipo } = req.body;
  libro.autor = autor || libro.autor;
  libro.titulo = titulo || libro.titulo;
  libro.descripcion = descripcion || libro.descripcion;
  libro.tipo = tipo || libro.tipo;
  res.json(libro);
});

// Eliminar libro por ID
app.delete('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = libros.findIndex(l => l.id === id);
  if (index === -1) {
    return res.status(404).json({ mensaje: "Libro no encontrado" });
  }
  libros.splice(index, 1);
  res.json({ mensaje: "Libro eliminado correctamente" });
});

// Ruta base
app.get('/', (req, res) => {
  res.send('📘 Bienvenido a la API de Libros con Express');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```

---
