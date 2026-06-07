# ⚙️ EcoMarket Backend

API REST desarrollada para la gestión de productos, usuarios y operaciones del sistema EcoMarket. Este backend permite la comunicación con el frontend, gestionando la lógica de negocio y el acceso a la base de datos.

---

## 🚀 Tecnologías utilizadas

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Tokens (JWT)
* dotenv

---

## 📦 Funcionalidades principales

* 🔐 Autenticación de usuarios (login / registro)
* 👤 Gestión de perfil de usuario
* 🛍️ CRUD de productos
* 📦 Conexión con base de datos MongoDB
* 🔑 Protección de rutas con JWT
* ⚠️ Manejo de errores

---

## 📁 Estructura del proyecto

```id="k2u9cz"
backend/
│── controllers/
│   ├── productController.js
│   ├── userController.js
│
│── models/
│   ├── Product.js
│   ├── User.js
│
│── routes/
│   ├── productRoutes.js
│   ├── userRoutes.js
│
│── middleware/
│   └── authMiddleware.js
│
│── config/
│   └── db.js
│
│── server.js
│── .env
```

---

## ⚙️ Instalación y ejecución

1. Clonar el repositorio:

```bash id="g9a3dp"
git clone https://github.com/DevJhonRivera/Back-End-ProyectoSoftware.git
```

2. Entrar a la carpeta backend:

```bash id="a8nz9o"
cd backend
```

3. Instalar dependencias:

```bash id="b7c6q1"
npm install
```

4. Configurar variables de entorno:

Crear archivo `.env`:

```env id="q2h4vc"
PORT=3001
MONGO_URI=""
JWT_SECRET=secreto
```

5. Ejecutar servidor:

```bash id="q3y7nf"
npm run dev
```

---

## 🔗 Endpoints principales

### 📌 Productos

* `GET /api/products` → Obtener productos
* `GET /api/products/:id` → Obtener producto por ID
* `POST /api/products` → Crear producto
* `PUT /api/products/:id` → Actualizar producto
* `DELETE /api/products/:id` → Eliminar producto

---

### 📌 Usuarios

* `POST /api/users/login` → Iniciar sesión
* `POST /api/users/register` → Registrar usuario
* `GET /api/users/profile` → Obtener perfil (requiere token)

---

## 🔐 Autenticación

El sistema utiliza JWT para proteger rutas privadas.

Ejemplo de header:

```id="f5t8kd"
Authorization: Bearer TOKEN
```
---

## 📌 Estado del proyecto

✔ API funcional
✔ Integración con frontend
✔ Autenticación implementada
✔ Base de datos conectada
