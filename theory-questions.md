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

# Skyline Skyways – QA Automation

Este documento describe la estrategia de pruebas funcionales, validaciones de frontend y el enfoque manual vs automatizado aplicado al MVP de Skyline Skyways, con base en los flujos reales observados en la aplicación y sus defectos intencionales.

---

## 1. Casos de Prueba Funcionales

### 1.1 Happy Path (Flujos Correctos)

| ID | Escenario | Precondiciones | Pasos | Resultado Esperado | Severidad |
|----|----------|---------------|-------|-------------------|-----------|
| HP-01 | Búsqueda válida sin return date | App disponible | 1. Ingresar origin válido (BOG)<br>2. Ingresar destination válido (MEX)<br>3. Seleccionar departure date válida<br>4. Enviar formulario | Navega a `/results` mostrando resultados | P1 |
| HP-02 | Búsqueda válida con return date | App disponible | 1. Completar origin y destination<br>2. Seleccionar departure y return date válidas<br>3. Enviar formulario | Navega a `/results` con fechas correctas | P1 |
| HP-03 | API `/api/flights` responde correctamente | Backend mock activo | Ejecutar búsqueda con origin en mayúsculas | Respuesta HTTP 200 con lista de itinerarios | P1 |
| HP-04 | Visualización de resultados | Resultados disponibles | Acceder a `/results` | Se renderiza Flight Results y cards | P1 |

---

### 1.2 Casos Límite (Edge Cases)

| ID | Escenario | Precondiciones | Pasos | Resultado Esperado | Severidad |
|----|----------|---------------|-------|-------------------|-----------|
| CL-01 | Return date vacío | App disponible | Completar formulario sin return date | Navega a resultados correctamente | P2 |
| CL-02 | Longitud mínima de IATA | App disponible | Ingresar códigos de 3 letras | Campo aceptado | P2 |
| CL-03 | Fecha futura lejana | App disponible | Seleccionar fecha > 1 año | Navega a resultados | P3 |
| CL-04 | Departure date = Return date | App disponible | Usar misma fecha en ambos campos | Navega a resultados | P3 |
| CL-05 | Sin resultados disponibles | Backend mock activo | Buscar combinación sin vuelos | Se muestra mensaje “No flights found” | P2 |

---

### 1.3 Casos de Error (Negativos)

| ID | Escenario | Precondiciones | Pasos | Resultado Esperado | Severidad |
|----|----------|---------------|-------|-------------------|-----------|
| ER-01 | Origin en minúscula | App disponible | origin = `bog` | API responde 500 (defecto intencional) | P1 |
| ER-02 | Campos obligatorios vacíos | App disponible | Enviar formulario incompleto | No navega / muestra validación | P1 |
| ER-03 | Return date anterior a departure | Defect toggle activo | Enviar fechas inválidas | Navega a resultados (defecto documentado) | P2 |
| ER-04 | API sin respuesta | Backend alterado | Ejecutar búsqueda | UI maneja error sin romper | P1 |
| ER-05 | Overlay bloquea CTA en mobile | Viewport < 640px | Intentar “Book Flight” | CTA no clickeable | P2 |

---

## 2. Validaciones del Frontend

### 2.1 Validaciones Identificadas

| Campo | Validación |
|------|-----------|
| Origin / Destination | Código IATA de 3 letras |
| Departure Date | Obligatoria |
| Return Date | Opcional |
| Submit | Bloqueado si faltan campos requeridos |
| Mobile UI | Overlay puede bloquear CTA |

---

### 2.2 Estrategia de Verificación

- Uso del patrón **Page Object Model (POM)** para centralizar selectores y lógica.
- Encapsulación de acciones como `fillTrip()` y `submit()`.
- Aserciones reutilizables como `assertNavigatedToResults()`.
- Validaciones con Playwright usando:
  - `expect(page).toHaveURL()`
  - `expect(locator).toBeVisible()`
  - `expect(locator).toHaveValue()`

---

## 3. Estrategia Manual vs Automatizada

### 3.1 Pruebas Manuales

Se ejecutan manualmente:

- Pruebas exploratorias
- Lighthouse / Performance
- Validaciones visuales y responsive
- Revisión de copy y accesibilidad
- Confirmación de defectos intencionales

**Justificación:**  
Requieren criterio humano y no aportan valor directo a la regresión automatizada.

---

### 3.2 Pruebas Automatizadas

Se automatizan con Playwright + Cucumber:

- Happy Path completo (search → results)
- Casos negativos controlados
- Validaciones de navegación
- Pruebas mobile (viewport reducido)
- Defectos documentados como evidencia viva

**Criterios de priorización:**
1. Impacto al negocio  
2. Riesgo de regresión  
3. Frecuencia de uso  
4. Facilidad de automatización  

---

## Conclusión

La estrategia prioriza cobertura funcional real, documentación clara de defectos y automatización sostenible, alineada con un MVP y orientada a regresión continua.
