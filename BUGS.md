# BUGS – Skyline Skyways QA Challenge

Create one row per unique defect you discover. Attach screenshots, console logs, or traces in the evidence column. Severity scale suggestion: `P0` (blocking) → `P3` (minor polish). Add more rows as needed.


| ID | Título | Pasos para Reproducir | Resultado Esperado | Resultado Actual | Severidad | Evidencia |
|----|--------|-----------------------|--------------------|------------------|-----------|-----------|
| 1 | El botón de búsqueda no tiene nombre accesible | 1. Navegar a la página principal `/` <br> 2. Inspeccionar el botón “Search” usando DevTools o lector de pantalla | El botón debería tener un nombre accesible (`aria-label` o texto visible) | El botón es solo un ícono y no tiene nombre accesible | P2 | Screenshot / DevTools |
| 2 | Se permite fecha de retorno anterior a la fecha de salida | 1. Ir a la página principal <br> 2. Ingresar origen y destino válidos <br> 3. Seleccionar fecha de salida posterior a la de retorno <br> 4. Enviar el formulario | El formulario debería bloquear el envío o mostrar un error de validación | Se permite la navegación a la página de resultados | P1 | Scenario Cucumber `@defect` |
| 3 | La API retorna error 500 cuando el origen está en minúsculas | 1. Consumir el endpoint `/api/flights` con `origin=bog` <br> 2. Observar la respuesta de la API | La API debería normalizar el input o retornar un error 4xx controlado | La API responde con **500 Internal Server Error** | P0 | Network tab / HAR |
| 4 | El botón “Book Flight” queda bloqueado en pantallas pequeñas | 1. Ajustar el viewport a menos de 640px <br> 2. Navegar a la página de resultados <br> 3. Intentar hacer clic en “Book Flight” | El CTA debería ser visible y clickeable | Un overlay flotante bloquea el botón | P1 | Screenshot (vista móvil) |
| 5 | Se muestra una tarifa negativa en un itinerario | 1. Ejecutar una búsqueda con datos válidos <br> 2. Revisar la lista de itinerarios | Todas las tarifas deberían ser valores positivos | Un itinerario muestra una tarifa negativa | P2 | Screenshot |
| 6 | La página de resultados carga incluso cuando no hay vuelos disponibles | 1. Ejecutar una búsqueda sin vuelos asociados <br> 2. Observar la página de resultados | Debería mostrarse un mensaje claro de “sin resultados” | La página carga pero el feedback de UX es limitado | P3 | Screenshot |
| 7 | No existe validación del formato IATA en el frontend | 1. Ingresar un código de origen inválido (ej. `AAA1`) <br> 2. Enviar el formulario | El formulario debería impedir el envío | El formulario se envía correctamente | P2 | Video / Consola |
| 8 | El campo de fecha de retorno permite valores inválidos manuales | 1. Ingresar manualmente una fecha inválida en el campo de retorno <br> 2. Enviar el formulario | El sistema debería rechazar el formato inválido | El valor inválido es aceptado | P2 | Screenshot |

> **Nota:** Los defectos marcados como *intencionales* fueron documentados y validados, pero **no corregidos**, de acuerdo con las instrucciones del challenge.  
> La automatización asociada se encuentra alineada con los escenarios en `tests/features` y los Page Objects definidos en `tests/pom/`.
