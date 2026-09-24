# ISIS3710-ParcialPractico-202620
Sofia Garzón Mariño - 202413102
Porblemas:
1. Imagenes de los planes
- Ubicacion: src/app/plans/page.tsx
- Problema: las imagenes no tenian alt
- Regla: las imagenes deben tener texto alternativo
- Correccion: se agrego alt con el nombre del plan
2. Contraste de algunos textos
- Ubicacion: src/app/plans/page.tsx
- Problema: habia textos muy claros sobre fondo claro
- Regla: debe tener contraste suficiente para poder leerse
- Correccion: se cambio el color del texto a uno mas oscuro
3. Buscador sin label
- Ubicacion: src/app/page.tsx
- Problema: el input del buscador solo tenia placeholder
- Regla: los controles de formulario deben tener un nombre facil
- Correccion: se agrego un label asociado al input
4. Boton de cerrar sesion
- Ubicacion: src/components/UserMenu.tsx
- Problema: el boton solamente tenia un icono y no tenia un nombre accesible
- Regla: los botones deben poder ser identificados por tecnologias de asistencia
- Correccion: se agrego aria-label="Cerrar sesión"
5. Zoom deshabilitado
- Ubicacion: src/app/layout.tsx
- Problema: la configuracion no permitia hacer zoom
- Regla: el usuario debe poder ampliar el contenido
- Correccion: se quitaron maximumScale y userScalable false
6. Crear Plan
- Ubicacion: src/components/UserMenu.tsx
- Problema: Crear Plan estaba hecho con un div aunque funcionaba como elemento interactivo
- Regla: se deben usar elementos HTML con la semantica correcta
- Correccion: se cambio por un Link que lleva a /plans/new

todos con lighthouse