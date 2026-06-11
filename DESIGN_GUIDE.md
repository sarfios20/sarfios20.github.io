# Guía de diseño de la web

Destilado de **"Design for Developers - Enhance UI"** (Adrian Twarog). Aplica a toda la web (home, CV, proyectos, posts, about), no solo al blog. Complementa la skill `frontend-design` de Anthropic instalada en `~/.claude/skills/`.

La pirámide del libro, de la base a la cima: **color + tipografía → componentes → jerarquía visual → diseño de página (wireframe + styleguide)**. Si algo se ve mal, el problema suele estar en una capa más baja de la que estás tocando.

## Color

- Máximo 2-3 colores (regla **60/30/10**: 60% dominante, 30% secundario, 10% acento). La paleta completa: primario, secundario, acento semántico (éxito/aviso/peligro) y neutros.
- Definir cada color en **pesos 100-800** (como font-weights) y referenciar siempre por peso, nunca a ojo. Dark mode = invertir el orden de los pesos.
- Cada gris debe tener un trabajo asignado (fondo, texto cuerpo, texto muted, bordes, divisores), no elegirse ad hoc.
- Ligeramente desaturar siempre: los colores 100% saturados son ásperos. Un poco de tone (gris) calma; shade (negro) para títulos y prioridad; tint (blanco) para fondos y elementos pasivos.
- Cálidos (rojos/naranjas) exigen atención: reservar para avisos y acciones clave. Fríos (azules/verdes) para estructura y elementos pasivos.
- Contraste texto/fondo mínimo **4.5:1** (WCAG). Truco: mirar la web en escala de grises para comprobar jerarquía y contraste.
- Acciones destructivas siempre en rojo y distintas de todo lo demás.

**En esta web:** los tokens de `src/styles/global.css` ya siguen esto (neutral 50-950 + accent índigo, semánticos por rol, dark mode invertido). Mantener la disciplina: cualquier color nuevo entra como token con peso, no como hex suelto.

## Tipografía

- **Máximo 2 familias**: una para títulos, otra para cuerpo (la nuestra: Fraunces serif para títulos, Inter sans para cuerpo; JetBrains Mono solo para código). Serif para titulares grandes (estilo y emoción), sans para cuerpo y texto pequeño (legibilidad).
- Escala modular para los tamaños (la nuestra ~1.25). Tamaños progresivos y consistentes; nada de valores intermedios sueltos (15px).
- Cuerpo: **16-24px** según viewport (nuestro: 18px). Nunca <16px en desktop ni >30px.
- Los títulos encogen mucho más que el cuerpo en móvil (hasta 50% vs ~25%). Un H1 no debería partirse en dos líneas si se puede evitar.
- **Line height**: cuerpo 1.5 (no pasar de 1.75); títulos grandes ~1.15 (no pasar de 1.25). Cuanto más grande la fuente, menos interlineado y menos peso necesita.
- **Letter spacing**: solo tocarlo en texto grande (>64px), reducir ligeramente (~-0.025em). Consistente en todo el sitio.
- Negrita: máximo 1-2 elementos por zona. Itálica solo para citas. Subrayado para énfasis puntual y para links en hover (no links en reposo). ALL CAPS solo en piezas cortas (labels, eyebrows), nunca frases.
- Texto pequeño (labels, botones) gana con más peso; texto grande con menos.

## Espaciado y layout

- **Sistema de incrementos fijos** (el nuestro: 4-point). Todo margen/padding/gap sale de la escala; nada de valores arbitrarios.
- Empezar con espacio en blanco generoso y reducir; es más fácil quitar que añadir.
- **Proximidad = significado**: el espacio dentro de un grupo debe ser menor que el espacio entre grupos. Para separar secciones, 2-3x el espacio estándar.
- Nada toca los bordes de su contenedor: padding generoso siempre.
- Contenedor máximo **1200px** (el nuestro: 1024px wide / 38rem prosa, bien) con padding lateral ~30px (el nuestro: 24px, aceptable).
- Texto y contenido alineados a la izquierda por defecto; centrado solo para bloques cortos y aislados.
- Alineación: elementos de una fila a una misma línea base o centrados verticalmente si las alturas difieren poco; ancho de contenedor consistente entre secciones para que los bordes casen.

## Componentes (reglas que nos aplican)

- **Botones**: 3 niveles. Primario (relleno, color de acento, uno por vista), secundario (fondo sutil u outline), terciario (solo texto). Padding ~1em vertical / 2em horizontal, texto ≥14px. El primario debe dominar visualmente; el texto describe la acción ("Download PDF", no "Submit").
- **Bordes**: sutiles y de baja opacidad; ante la duda, no poner borde. Una línea (border-bottom) suele bastar. No combinar borde + sombra.
- **Sombras**: opacidad ~0.15, offset en Y. Para hover, elevación y separar capas. Gradual y mínimo.
- **Iconos**: un solo estilo en todo el sitio (outline para navegación, solid para botones/apoyo), tamaño = tamaño de fuente acompañante, en em para que escalen, separados ~1em del texto. SVG siempre.
- **Tarjetas/listados** (nuestros posts y proyectos): jerarquía interna media > título > texto de apoyo > acciones; los metadatos del mismo ítem juntos (proximidad), espacio claro entre ítems; toda la tarjeta clicable si no hay CTA explícito.
- **Badges/etiquetas** (nuestros tags): una palabra, sentence case, más pequeños que un botón para no confundirse con uno, sin interacción.
- **Tablas** (si algún post las usa): cabecera con más peso, texto alineado a la izquierda y números a la derecha, zebra striping solo si hay muchos datos.

## Jerarquía visual

- El usuario **escanea**, no lee: patrón F para páginas densas (posts), patrón Z para páginas ligeras (home). El tamaño puede saltarse el patrón: lo más grande se ve primero.
- Ranking por: tamaño, posición, color/contraste, peso, espacio alrededor. Lo importante: más grande, más arriba, más contraste, más aire.
- Título > lead > secciones (ej. del libro: 4x / 2x / 1x). El lead con menos contraste que el título; una palabra clave del título puede ir en el color de acento como punto focal.
- Una sola acción primaria visible por vista; las secundarias en ghost/outline/link.
- **Espacio negativo como herramienta de foco**: cuanto más aire alrededor de un elemento, más atención recibe (útil para el CTA del hero).
- **Armonía**: alternar composiciones entre secciones (no repetir el mismo layout simétrico en cadena, aburre; ni el mismo asimétrico siempre). La repetición continua mata el interés.
- Consistencia total: mismo color para la misma función en todas las páginas, mismos términos en los textos de UI, navegación idéntica en todas las vistas.

## Proceso para cambios de diseño

1. **Wireframe primero** cuando se añada una sección o página nueva: grises + un acento, proporciones reales, sin contenido de relleno bonito.
2. **Este documento + los tokens de `global.css` son el styleguide**: cualquier decisión nueva (un color, un tamaño, un componente) se añade aquí y como token, con sus estados (default, hover, focus, disabled, error).
3. Para componentes nuevos, definir todos los estados antes de darlo por hecho.
4. Las reglas se pueden romper, pero solo sabiendo qué regla es y para qué sirve (cita del propio libro).

## Sistema de temas y paletas (2026-06-11)

- **Tema**: por defecto sigue al sistema (`prefers-color-scheme`), indicado por la píldora "Auto" de la nav. Al pulsar "Auto" se pasa a modo manual: se fija el tema actual y se revela el toggle sol/luna para forzar claro/oscuro; pulsar "Auto" de nuevo vuelve al sistema. Persistencia en `localStorage` (`theme`; ausente = sistema). Los tokens oscuros viven duplicados en `global.css` (media query con guard `:not([data-theme='light'])` + bloque `[data-theme='dark']`); mantener ambos en sync.
- **Colores del visitante**: el picker de la nav (icono de paleta) tiene dos selectores de color, Primary (acento) y Background (tinte de neutros), más Reset. El script del head de `BaseLayout.astro` genera las escalas completas (accent 50-900, neutral 50-950) desde el color elegido con escaleras de luminosidad fijas (HSL: hue del usuario, saturación clamped, L fija por peso), así los hovers, bordes, contraste y dark mode se derivan solos. Persistencia en `localStorage` (`accent`, `tint`). La saturación del tinte de fondo se limita al 14% para que el fondo claro siga siendo casi blanco.
- El modo claro por defecto es casi blanco (`--neutral-50: #fdfdfc`).

## Auditoría y cambios aplicados (2026-06-11)

Cumplimos: 2 familias + mono para código, serif/sans bien repartidas, escala modular, sistema 4-point, tokens semánticos con pesos, dark mode invertido, contenedor < 1200px, line heights en rango, letter spacing negativo solo en titulares, botones primario/secundario diferenciados, un solo CTA primario en la home.

Aplicado en la pasada de 2026-06-11:
- **Inter sustituida por Karla** como sans de cuerpo (Inter está vetada por la skill `frontend-design` por sobreusada; Karla comparte el punto excéntrico de Fraunces).
- `--fg-subtle` subido a neutral-600 (claro) / neutral-400 (oscuro): neutral-500 daba 4.48:1, justo por debajo del mínimo WCAG.
- Botón primario en dark mode con texto oscuro sobre el acento claro (blanco sobre accent-400 daba ~2.9:1).
- Proyectos como tarjetas con sombra y elevación al hover (translateY + shadow, sin borde, según el libro: no combinar borde y sombra). Alterna composición con la lista de posts (tarjetas vs timeline).
- Nombres de proyecto clicables (tarjeta con hover que invita a clic debe llevar a algún sitio).
- Padding de botones subido a 12/24px, más cerca del ratio 1em/2em del libro.
