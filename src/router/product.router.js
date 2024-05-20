const router = require("express").Router();
const { Product } = require("../model/product.model");
const { faker } = require("@faker-js/faker");

// Ruta GET para obtener todos los productos
router.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta POST para crear un nuevo producto con datos generados aleatoriamente
router.post("/products", async (req, res) => {
  try {
    const product_name = faker.commerce.productName();
    const price = parseFloat(faker.commerce.price());
    const newProduct = await Product.create({
      product_name,
      price,
      is_stock: true,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta GET para obtener un producto por ID
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Producto no enconmtrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta PUT para actualizar un producto por ID
router.put("/products/:id", async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedProduct = await Product.findByPk(req.params.id);
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta DELETE para eliminar un producto por ID
router.delete("/products/:id", async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: "Producto Borrado" });
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;