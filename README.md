# Galicia Viaje

Pagina familiar para votar y priorizar sitios a visitar desde O Freixo, Outes.

Pagina publicada:

https://jnnico.github.io/galicia-viaje/

## Votos persistentes con Google Sheet

Hoja creada para guardar votos:

https://docs.google.com/spreadsheets/d/1ufvEBP7X_JuEQmBnGllK3PVQfc2Fhnmicw07W2H-3Nk

Pasos para activar la persistencia compartida:

1. Abre la hoja de Google.
2. Ve a `Extensiones > Apps Script`.
3. Pega el contenido de `apps-script/Code.gs`.
4. Pulsa `Implementar > Nueva implementacion`.
5. Tipo: `Aplicacion web`.
6. Ejecutar como: `Yo`.
7. Quien tiene acceso: `Cualquier usuario`.
8. Copia la URL que termina en `/exec`.
9. Pegala en `config.js`:

```js
window.GALICIA_VOTES_API_URL = "https://script.google.com/macros/s/.../exec";
```

10. Haz commit y push. La web empezara a leer y guardar los votos en la hoja.
