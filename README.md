# Costo Claro

Calculadora de costos para emprendedores: costos fijos, costos variables, punto de equilibrio, precio y margen, y punto de equilibrio con varios productos (mezcla de ventas).

Es una app web simple (HTML + CSS + JS, sin frameworks ni paso de compilación). Todo lo que la persona ingresa se guarda en el navegador (`localStorage`), así que cada quien ve y edita sus propios datos.

## Ver localmente

Solo abre `index.html` en el navegador. No necesita servidor ni instalación de nada.

## Subir a GitHub y publicar con GitHub Pages

1. Crea un repositorio nuevo en GitHub (puede ser público o privado) y sube estos tres archivos (`index.html`, `style.css`, `app.js`) a la raíz del repositorio:

   ```bash
   cd costo-claro-app
   git init
   git add index.html style.css app.js README.md
   git commit -m "Primera versión de Costo Claro"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
   git push -u origin main
   ```

2. En GitHub, entra a **Settings → Pages** del repositorio.
3. En "Build and deployment", elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`.
4. Guarda. En uno o dos minutos la app queda publicada en `https://TU-USUARIO.github.io/TU-REPOSITORIO/`.

## Estructura

- `index.html` — esqueleto de la página y carga de fuentes/estilos.
- `style.css` — todos los estilos (paleta verde/ámbar, tarjetas, barra de navegación).
- `app.js` — toda la lógica: datos de ejemplo, cálculos (margen, punto de equilibrio, margen vs. markup, mezcla de ventas) y las seis pantallas (Inicio, Costos Fijos, Costos Variables, Punto de Equilibrio, Precio y Margen, Varios Productos).

## Personalizar

La app abre con el ejemplo de "Velas Aromáticas Luna" para que se vea cómo funciona. Para usarla con tu propio negocio, simplemente edita o borra esos costos de ejemplo desde la app y agrega los tuyos — todo queda guardado en tu navegador.

Si quieres cambiar los datos de ejemplo iniciales (los que ve alguien que abre la app por primera vez), edita la función `defaultState()` al inicio de `app.js`.
