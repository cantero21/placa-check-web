# 🚗 PlacaCheck Web

Frontend mobile-first para búsqueda de vehículos por placa o propietario. Diseñado para ser compartido como link en grupos de WhatsApp, permitiendo consultas rápidas desde el celular sin necesidad de instalar una app.

---

## 🛠️ Tecnologías

- **Angular 19** (standalone components, signals)
- **Tailwind CSS** (estilos utilitarios)
- **Lucide Icons** (iconografía moderna)
- **TypeScript**

---

## 📱 Capturas



---<img width="432" height="855" alt="Captura de pantalla 2026-03-04 024632" src="https://github.com/user-attachments/assets/d442f7e6-7b11-4569-8165-b474dd7f4e8a" />
<img width="437" height="872" alt="Captura de pantalla 2026-03-04 024508" src="https://github.com/user-attachments/assets/3b1167b4-a807-4bd2-b01c-105e450291aa" />

<img width="1832" height="861" alt="Captura de pantalla 2026-03-04 024429" src="https://github.com/user-attachments/assets/6c9583c0-9483-4be8-a55b-91e6754e2eeb" />

## 🎯 Funcionalidades

### Vista pública (sin login)

- Búsqueda por placa (parcial, case-insensitive)
- Búsqueda por propietario (parcial, case-insensitive)
- Diseño mobile-first optimizado para uso bajo luz solar
- Acceso directo por link (ideal para grupos de WhatsApp)

### Panel de administración (con login)

- Registro de vehículos
- Edición y eliminación
- Lista completa de vehículos registrados
- Formulario modal con validación

---

## 📐 Estructura del proyecto

```
📦 src/app
├── components/
│   ├── search/      → Pantalla principal de búsqueda (pública)
│   ├── login/       → Inicio de sesión para admin
│   └── admin/       → Panel CRUD de vehículos (protegido)
├── services/
│   ├── vehicle.service.ts  → Consumo de API de vehículos
│   └── auth.service.ts     → Autenticación y manejo de JWT
├── interceptors/
│   └── auth.interceptor.ts → Inyección automática del token JWT
├── models/
│   └── vehicle.model.ts    → Interfaces TypeScript
└── environments/
    └── environment.ts      → URL de la API
```

---

## 🔐 Autenticación

- Login con JWT (almacenado en localStorage)
- Interceptor HTTP inyecta el token automáticamente en cada petición
- Signal reactivo `isLoggedIn` para controlar la UI
- Redirección automática a login si no hay sesión activa

---

## 🎨 Diseño

- **Modo claro con alto contraste** — optimizado para uso al aire libre con luz solar
- **Mobile-first** — diseñado primero para celular, responsivo en desktop
- **Barra de búsqueda centrada** tipo Google para acceso rápido
- **Toggle de tipo de búsqueda** — placa o propietario
- **Cards con información clara** — placa destacada, nombre e ícono de área

---

## ⚙️ Configuración

```typescript
// src/environments/environment.ts
export const environment = {
  apiUrl: 'http://localhost:8080/api'
};
```

---

## 🚀 Cómo ejecutar

1. Clona el repositorio

```bash
git clone https://github.com/TU_USUARIO/placa-check-web.git
cd placa-check-web
```

2. Instala dependencias

```bash
npm install
```

3. Ejecuta el proyecto

```bash
ng serve
```

La app estará disponible en `http://localhost:4200`

> **Nota:** Requiere el backend corriendo en `http://localhost:8080`. Ver [placa-check-api](https://github.com/TU_USUARIO/placa-check-api)

---

## 🔗 Backend

La API REST de esta aplicación está en un repositorio separado: [placa-check-api](https://github.com/TU_USUARIO/placa-check-api)

---

## 📝 Decisiones técnicas

- **Standalone components** — sin NgModules, siguiendo el estándar moderno de Angular
- **Signals** — para manejo reactivo del estado (en vez de BehaviorSubject)
- **Functional interceptor** — usando `HttpInterceptorFn` en vez de clases
- **Tailwind CSS** — estilos utilitarios sin archivos CSS adicionales
- **Búsqueda por Enter** — sin debounce innecesario para mantener la simplicidad
- **Sin registro de usuarios** — solo admin necesita login, los demás buscan libremente

---

## 👤 Autor

**Jesús Cantero** — Desarrollador en formación  
Tecnólogo en Análisis y Desarrollo de Software — SENA

---

## 📄 Licencia

Este proyecto es de uso educativo y personal.
