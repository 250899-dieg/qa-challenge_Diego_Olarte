# Skyline Skyways – Guía de Entregable Teórico para QA Automation

Redacta un documento (puede ser anexado junto al repo) que cubra los siguientes puntos clave. La intención es evaluar tu capacidad para diseñar estrategias de prueba basadas en los flujos reales del proyecto.

## 1. Casos de Prueba Funcionales
- **Happy Path**: Lista los escenarios esenciales donde todo funciona correctamente (ej. búsqueda válida, navegación a resultados, API responde 200).
- **Casos Límite**: Incluye entradas mínimas/máximas, campos opcionales, combinaciones de fechas poco comunes, etc.
- **Casos de Error**: Describe qué sucede con datos faltantes, formatos inválidos, `origin` en minúscula, respuesta vacía, etc.

Para cada caso especifica: precondiciones, pasos, resultado esperado y severidad.

## 2. Validaciones del Frontend
- Identifica qué validaciones se ejecutan en el formulario (IATA, fechas, campos obligatorios) y cómo las verificarías.
- Menciona si usarías utilidades como Page Objects o helpers para simular dichas validaciones.

## 3. Estrategia Manual vs. Automatizada
- Indica qué pruebas ejecutarías manualmente (ej. exploratorias, Lighthouse, defectos visuales) y justifica por qué.
- Define qué pruebas automatizarías con Playwright (flujos críticos, regresiones de API, validaciones negativas) y los criterios de priorización.

## Entrega Sugerida
Organiza el documento con secciones claras y, cuando sea útil, apóyate en tablas o listas numeradas. La rúbrica de evaluación revisará la completitud de los casos, la profundidad del análisis de UI/validaciones y la lógica detrás de la selección manual vs. automatizada.
