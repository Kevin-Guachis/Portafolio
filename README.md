# Portafolio de Kevin Guachamin

Base en React, Vite y CSS. Navegación por anclas y casos desplegables con HTML nativo. Sin router, librería de componentes ni backend.

## Desarrollo

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## Agregar proyectos

1. Copiar uno de los archivos de `src/data/projects/` y asignar un `id` único.
2. Actualizar exclusivamente la información confirmada. Mantener `null` en datos desconocidos y `screenshots: []` si no hay capturas.
3. Importarlo y agregarlo al arreglo de `src/data/projects/index.js`. El componente genera automáticamente el resumen y el caso de estudio.
4. Usar `featured: true` para destacar un proyecto. El Conservatorio conserva la prioridad mientras sea el destacado.

Campos: `id`, `name`, `organization`, `category`, `featured`, `summary`, `date`, `role`, `problem`, `contribution`, `decisions`, `screenshots`, `links`, `stack`, `architecture`.

Cada captura admite `src`, `alt` y `caption`. Colocar imágenes publicables en `public/images/projects/` y usar rutas como `/images/projects/conservatorio-panel.webp`. La primera captura aparece en el resumen; las siguientes, dentro del caso. Añadir texto alternativo que describa la pantalla real.

`links` admite `production` y `demo`. `production` genera el botón «Sistema en producción» y `demo` el botón «Demo»; aparecen solo cuando existe su URL. Los enlaces a repositorios de proyectos se omiten del portafolio. No se asume que el enlace de producción sea un entorno de pruebas. `stack` agrupa listas de tecnologías; `architecture` es una lista de capas con `label`, `technologies` y `description`. La arquitectura del proyecto destacado aparece siempre visible, con conexiones visuales; en los demás casos permanece dentro del desplegable.

## Caso de estudio del Conservatorio

El contenido verificado está en `src/data/projects/conservatorio.js`. `caseSections` es opcional: cada sección admite `id`, `title`, `paragraphs` e `items`. Otros proyectos conservan su presentación anterior mientras no utilicen este campo. No se incorporaron nuevas dependencias.

`architectureDirection: 'vertical'` representa el flujo de capas con flechas descendentes y `architectureNote` permite documentar su alcance.

El Conservatorio utiliza `compactCase`: participación y módulos visibles, un desplegable con el proceso resumido y otro con el contenido completo de `caseSections`. El stack y la arquitectura de tres bloques permanecen visibles. Los demás proyectos conservan su presentación.

Las siete rutas de `screenshots` apuntan a `public/images/projects/conservatorio/`: `hero.png`, `login.png`, `administracion-escolar.png`, `informacion-estudiantil.png`, `fechas-notas.png`, `reportes.png` y `calificaciones.png`. La primera aparece en el resumen y las seis restantes en la galería responsive. Añadir los archivos reales y revisar su texto alternativo; no hace falta modificar los componentes. Las imágenes mantienen sus proporciones y se pueden abrir a tamaño completo en otra pestaña. Si faltan o fallan al cargar, se muestran placeholders.

## Perfil y contenido pendiente

Editar `src/data/profile.js` para completar biografía, correo, perfiles y CV. No hay fechas, métricas, contribuciones o capturas inventadas. La información existente procede del contexto suministrado por Kevin.

## Diseño

Tema oscuro con superficies escalonadas y acento azul. Los tokens primitivos, semánticos y de componentes están en `src/styles.css`. Inter se carga desde Google Fonts, con una alternativa del sistema si no está disponible. Los casos de estudio usan controles nativos de teclado. El diseño respeta la preferencia de movimiento reducido.

La sección de capacidades de la portada es editorial: revisarla si se añaden tecnologías nuevas. Las tarjetas y casos sí se generan íntegramente desde los archivos de proyectos.
