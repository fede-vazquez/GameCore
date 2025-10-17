# GameCore

**GameCore** es una plataforma de distribución digital de videojuegos. Su **backend** desarrollado en ASP.NET Core Web API y su **frontend** con React.js + TypeScript.
Permite a los usuarios ver, comprar y gestionar videojuegos, con métricas para administradores.


## Estructura del repositorio

```
GameCore/
    backend/     -> API REST en ASP.NET Core
    frontend/    -> Web React
```

## Backend

**Tecnologías:** ASP.NET Core Web API - Entity Framework Core - JWT - Swagger

### Descripción

Backend del proyecto GameCore, desarrollado con **ASP.NET Core Web API**, **Entity Framework Core** y una **arquitectura en capas (Onion)**.
Expone una **API REST** para ser consumida por el frontend.

### Tecnologías principales

* ASP.NET Core Web API
* Entity Framework Core
* Arquitectura en capas (Onion)
* JWT (JSON Web Tokens)
* DTOs para transferencia de datos
* Swagger para documentación

### Características

* Autenticación y autorización por roles (Admin/User)
* CRUD completo para el catálogo de juegos (Admin)
* Panel de administración con métricas
* Gestión de biblioteca personal del usuario
* Devolución de errores con información relevante

### Instalación y ejecución

```bash
# Ir al backend
cd backend

# Restaurar paquetes NuGet
dotnet restore

# Compilar proyecto
dotnet build

# Crear la base de datos con migraciones
dotnet ef database update

# Ejecutar la API
dotnet run
```

## Frontend

**Tecnologías:** React.js + TypeScript - wouter - Axios - Zustand - Zod - React Hook Form

### Descripción

Frontend del proyecto GameCore, desarrollado con **React.js** + **TypeScript**, que consume la API REST del backend para ofrecer funcionalidades de catálogo, administración y biblioteca personal.

### Tecnologías principales

* React.js + TypeScript
* wouter para enrutamiento
* Axios para peticiones HTTP
* Zustand para estado global
* Zod para validación de formularios
* React Hook Form para manejo de formularios
* React.lazy & Suspense para carga perezosa

### Características

* Login de usuarios con roles (Admin/User)
* Listado, búsqueda y detalle de juegos
* CRUD de juegos para administradores
* Panel de administración con métricas
* Visualización de biblioteca personal

### Instalación y ejecución

```bash
# Ir al frontend
cd frontend

# Instalar dependencias
npm install

# Ejecutar la app en modo desarrollo
npm run dev
```

## Equipo de desarrollo

- [Aragón Joaquín](https://github.com/Aragon-Joaquin)
- [Gómez Nicolás](https://github.com/nmgomez00)
- [Marraccini Daniel](https://github.com/daniel-marraccini)
- [Vazquez Federico](https://github.com/fede-vazquez)
