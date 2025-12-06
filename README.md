# Proyecto Backend — Productos y Carrito

Este proyecto implementa un backend con **Express**, vistas con **Handlebars**, y actualización en tiempo real usando **WebSockets**.

---

## Rutas Principales

### **`/`**
Muestra los productos actuales renderizados desde `home.handlebars`.

### **`/realtimeproducts`**
Vista donde los productos se actualizan **en tiempo real** cuando se agrega, modifica o elimina un producto, renderizados desde `realTimeProducts.handlebars`

---

## Rutas de Carrito — `/api/carts`

### **POST `/api/carts/`**
Crea un carrito nuevo.

### **GET `/api/carts/:cid`**
Obtiene los productos de un carrito según su ID.

### **POST `/api/carts/:cid/product/:pid`**
Agrega un producto al carrito indicado.

### **DELETE `/api/carts/:cid/product/:pid`**
Elimina el producto del carrito por completo (aunque haya mas de uno)

### **DELETE `/api/carts/:cid`**
Elimina todos los productos del carrito

### **PUT `/api/carts/:cid`**
Recibe un arreglo de productos desde el body de la request y sobreescribe el arreglo actual del carrito
Se deben recibir en el siguiente formato [{"productId": "productId", "quantity": quantity},{"productId": "productId", "quantity": quantity},...]

### **PUT `/api/carts/:cid/product/:pid`**
Recibe desde el body { "quantity": x } y actualiza la cantidad de dicho producto en el carrito

---

## Rutas de Productos — `/api/products`

### **GET `/api/products/`**
Devuelve todos los productos.
Se agrega la posibilidad de pasar como query params: limit, page, sort y query - todos parámetros opcionales -
Se simula la paginación con dichos parámetros, en caso de no estar presentes limit y page se setean a 10 y 1 respectivamente
Sort toma el valor de 1 o -1 para ordenar los resultados de manera ascendente o descendente en relación a su precio
El parámetro query lo usamos como filtro, se debe enviar como valor del mismo el siguiente formato atributo:valor para filtrar los productos
según cualquiera de los atributos presentes en ellos
La respuesta de este endpoint ahora devuelve todos los datos de paginación solicitados

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

### **`/realtimeproducts`**
- Muestra los productos.
- Se actualizan automáticamente en tiempo real cuando se ejecutan las rutas:
  - **POST** → agregar producto
  - **PUT** → modificar producto
  - **DELETE** → eliminar producto
