# Feature de Autenticación

Esta feature proporciona funcionalidad completa de autenticación para la aplicación Real Estate.

## Componentes

### LoginComponent
- Formulario de inicio de sesión con validaciones
- Manejo de errores de autenticación
- Redirección automática después del login exitoso

### NavbarComponent
- Barra de navegación que muestra el estado de autenticación
- Botón de logout cuando el usuario está autenticado
- Enlace de login cuando no hay sesión activa

## Servicios

### AuthService
- `login(credentials)`: Inicia sesión del usuario
- `logout()`: Cierra la sesión del usuario
- `isAuthenticated()`: Signal que indica si hay una sesión activa
- `currentUser()`: Signal que contiene la información del usuario actual
- `token()`: Signal que contiene el token de acceso
- `getCurrentUser()`: Método que retorna el usuario actual (para compatibilidad)
- `getToken()`: Método que retorna el token actual (para compatibilidad)
- `checkAuthStatus()`: Método que retorna el estado de autenticación (para compatibilidad)
- `refreshAuthState()`: Refresca el estado desde localStorage

## Guards

### AuthGuard
- Protege las rutas que requieren autenticación
- Redirige a `/auth/login` si no hay sesión activa

## Rutas

- `/auth/login`: Página de inicio de sesión
- Las rutas de propiedades están protegidas por el AuthGuard

## Uso

### Proteger una ruta
```typescript
{
  path: 'protected-route',
  component: ProtectedComponent,
  canActivate: [authGuard]
}
```

### Verificar autenticación en un componente
```typescript
constructor(public authService: AuthService) {}

// En el template usando signals
<div *ngIf="authService.isAuthenticated()">
  Contenido solo para usuarios autenticados
</div>

// O usando el método de compatibilidad
<div *ngIf="authService.checkAuthStatus()">
  Contenido solo para usuarios autenticados
</div>
```

### Hacer logout
```typescript
constructor(private authService: AuthService, private router: Router) {}

logout() {
  this.authService.logout();
  this.router.navigate(['/auth/login']);
}
```

## Configuración del Backend

La aplicación espera que el backend tenga un endpoint de autenticación en:
`http://localhost:8080/api/auth/login`

El endpoint debe aceptar POST con:
```json
{
  "username": "usuario",
  "password": "contraseña"
}
```

Y retornar:
```json
{
  "access_token": "jwt-token",
  "token_type": "Bearer",
  "expires_in": 3600,
  "user": {
    "id": 1,
    "username": "usuario",
    "email": "usuario@email.com",
    "role": "user"
  }
}
```

## Almacenamiento

- El token se almacena en `localStorage` como `access_token`
- La información del usuario se almacena en `localStorage` como `user`
- El interceptor HTTP automáticamente incluye el token en todas las peticiones

## Signals

El servicio utiliza Angular Signals para el estado reactivo:

- `currentUser`: Signal que contiene el usuario actual
- `isAuthenticated`: Signal que indica el estado de autenticación
- `token`: Signal que contiene el token de acceso

Los signals se actualizan automáticamente cuando cambia el estado de autenticación y proporcionan reactividad nativa de Angular.
