/**
 * =============================================================
 * 📚 API REST de Libros con Node.js y Express
 * =============================================================
 * Esta API permite realizar operaciones CRUD sobre una colección
 * de libros en memoria.
 *
 * 🚀 Para ejecutar:
 *   1. Instala dependencias: npm install express
 *   2. Ejecuta el servidor: node app.js
 *   3. Abre en navegador o Postman: http://localhost:8080
 *
 * 📌 Endpoints disponibles:
 *   ✔ GET     /libros               → Obtener todos los libros
 *   ✔ GET     /libros?autor=nombre → Buscar libros por autor
 *   ✔ GET     /libros/:id          → Obtener libro por ID
 *   ✔ POST    /libros              → Crear nuevo libro
 *   ✔ PUT     /libros/:id          → Actualizar libro existente
 *   ✔ DELETE  /libros/:id          → Eliminar libro por ID
 * =============================================================
 */

const express = require('express');
const app = express();
const PORT = 8080;

// Middleware para procesar JSON
app.use(express.json());

// 📚 Base de datos en memoria
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


// =============================================================
// 🔍 GET /libros → Obtener todos los libros o buscar por autor
// =============================================================
app.get('/libros', (req, res) => {
  const autorBuscado = req.query.autor;

  if (autorBuscado) {
    const resultado = libros.filter(libro =>
      libro.autor.toLowerCase().includes(autorBuscado.toLowerCase())
    );

    if (resultado.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron libros del autor especificado." });
    }

    return res.json(resultado);
  }

  res.json(libros);
});


// =============================================================
// 🔍 GET /libros/:id → Buscar libro por ID
// =============================================================
app.get('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const libro = libros.find(l => l.id === id);

  if (libro) {
    res.json(libro);
  } else {
    res.status(404).json({ error: '📕 Libro no encontrado' });
  }
});


// =============================================================
// ➕ POST /libros → Crear un nuevo libro
// =============================================================
app.post('/libros', (req, res) => {
  const { autor, titulo, descripcion, tipo } = req.body;

  if (!autor || !titulo || !descripcion || !tipo) {
    return res.status(400).json({
      mensaje: "❌ Faltan campos obligatorios: autor, titulo, descripcion, tipo"
    });
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


// =============================================================
// 📝 PUT /libros/:id → Actualizar un libro existente
// =============================================================
app.put('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const libro = libros.find(l => l.id === id);

  if (!libro) {
    return res.status(404).json({ mensaje: "📕 Libro no encontrado" });
  }

  const { autor, titulo, descripcion, tipo } = req.body;

  libro.autor = autor || libro.autor;
  libro.titulo = titulo || libro.titulo;
  libro.descripcion = descripcion || libro.descripcion;
  libro.tipo = tipo || libro.tipo;

  res.json(libro);
});


// =============================================================
// 🗑 DELETE /libros/:id → Eliminar libro por ID
// =============================================================
app.delete('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indice = libros.findIndex(libro => libro.id === id);

  if (indice === -1) {
    return res.status(404).json({ mensaje: "📕 Libro no encontrado" });
  }

  libros.splice(indice, 1);
  res.json({ mensaje: "✅ Libro eliminado correctamente" });
});


// =============================================================
// 🏠 GET / → Ruta de bienvenida
// =============================================================
app.get('/', (req, res) => {
  res.send('📘 Bienvenido a la API REST de Libros. Visita /libros para comenzar.');
});


// =============================================================
// 🚀 Iniciar el servidor
// =============================================================
app.listen(PORT, () => {
  console.log(`✅ Servidor ejecutándose en: http://localhost:${PORT}`);
});
