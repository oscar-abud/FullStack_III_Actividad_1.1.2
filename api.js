const express = require("express");
const app = express();

const port = 8181;

const lista = [
  {nombre: 'Lechuga', tipo: 'Verdura'},
  {nombre: 'Manzana', tipo: 'Fruta'},
  {nombre: 'Tomate', tipo: 'Fruta'},
  {nombre: 'Pimentón', tipo: 'Verdura'},
  {nombre: 'Zanahoria', tipo: 'Verdura'}
]

app.use(express.json());

app.get("/api/productos", async (req, res) => {
  try {
    if (lista.length === 0) return res.status(400).json(lista)

    res.status(200).json(lista);
  } catch (error) {
    res.status(200).json(error);
  }
})

app.post("/api/productos", async (req, res) => {
  try {
    const { body } = req;

    const productoExiste = lista.find(p => p.nombre.trim().toUpperCase() === body.nombre.trim().toUpperCase())

    if (productoExiste) return res.json({ message: `La ${body.tipo} ${body.nombre} ya existe` })

    lista.push({
      nombre: body.nombre,
      tipo: body.tipo
    })

    res.status(201).json({message: `¡${body.tipo} '${body.nombre}' creado con éxito!`});
  } catch (error) {
    res.json(error);
  }
})

app.listen(port, () => {
  console.log(`App listen on port ${port}`);
})