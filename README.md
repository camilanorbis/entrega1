# Proyecto Backend — Productos y Carrito

Este proyecto implementa un backend con **Express**, vistas con **Handlebars**, y actualización en tiempo real usando **WebSockets**.

---

## Rutas Principales

### **`/`**
Muestra los productos actuales renderizados desde `home.handlebars`.

### **`/realTimeProducts`**
Vista donde los productos se actualizan **en tiempo real** cuando se agrega, modifica o elimina un producto, renderizados desde `realTimeProducts.handlebars`

---

## Rutas de Carrito — `/api/carts`

### **POST `/api/carts/`**
Crea un carrito nuevo.

### **GET `/api/carts/:cid`**
Obtiene los productos de un carrito según su ID.

### **POST `/api/carts/:cid/product/:pid`**
Agrega un producto al carrito indicado.

---

## Rutas de Productos — `/api/products`

### **GET `/api/products/`**
Devuelve todos los productos.

### **GET `/api/products/:pid`**
Devuelve un producto por su ID.

### **POST `/api/products/`**
Agrega un producto nuevo.

### **PUT `/api/products/:pid`**
Modifica un producto existente.

### **DELETE `/api/products/:pid`**
Elimina un producto.

---

## Vistas

### **`/` (Home)**
- Renderiza la lista actual de productos.
- Los productos provienen del endpoint `/api/products`.

### **`/realTimeProducts`**
- Muestra los productos.
- Se actualizan automáticamente en tiempo real cuando se ejecutan las rutas:
  - **POST** → agregar producto
  - **PUT** → modificar producto
  - **DELETE** → eliminar producto
