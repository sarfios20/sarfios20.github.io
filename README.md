# blog

Blog técnico bilingüe (ES/EN) hecho con Astro + MDX. Cada post se publica como
canónico aquí y se crospostea a dev.to apuntando con `canonical_url` a este
sitio.

## Estructura

```
src/
  content/blog/
    es/<slug>.md
    en/<slug>.md
  pages/
    es/{index, posts/[...slug]}.astro
    en/{index, posts/[...slug]}.astro
  layouts/{BaseLayout, PostLayout}.astro
  components/LanguageSwitcher.astro
  i18n/ui.ts
  styles/global.css
astro.config.mjs   # i18n: defaultLocale 'es', locales ['es','en']
```

## Comandos

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # genera ./dist
npm run preview
```

## Añadir un post

1. Decide un `translationKey` único (ej. `dotfiles-rust-2026`).
2. Crea las dos versiones:
   - `src/content/blog/es/<slug-es>.md`
   - `src/content/blog/en/<slug-en>.md`
3. Frontmatter mínimo:

   ```yaml
   ---
   title: "Título"
   description: "Resumen corto, ~150 chars."
   date: 2026-05-08
   tags: ["tag1"]
   lang: es                    # o en
   translationKey: dotfiles-rust-2026
   draft: false                # true para no publicar todavía
   canonicalUrl:               # opcional — solo si el canónico vive en otro sitio
   ---
   ```

4. El switcher de idioma resolverá automáticamente el link a la otra versión
   por `translationKey`. Si solo hay una versión, lleva a la home del otro
   idioma.

## Drafts

`draft: true` oculta el post en `npm run build` (producción) pero lo deja
visible en `npm run dev`. Workflow:

1. Crea el post con `draft: true`, edítalo y previsualiza en `localhost:4321`.
2. Cuando esté listo, cambia a `draft: false` y commit.

El filtro vive en los `index.astro` y `[...slug].astro` de cada idioma:
`!import.meta.env.PROD || !data.draft` (mostrar si estamos en dev O no es
draft).

## Crosspost a dev.to

dev.to acepta `canonical_url` en el frontmatter. Para que el SEO no penalice
contenido duplicado, publica primero aquí y luego crospostea:

```yaml
---
title: "..."
published: true
canonical_url: https://tu-dominio.com/en/posts/<slug>/
tags: rust, linux
---
```

Suele tener sentido crospostear solo la versión en inglés (la audiencia de
dev.to es mayoritariamente anglófona).

## Deploy

El sitio es estático (`npm run build` genera `./dist`). Servicios gratuitos
con auto-deploy desde GitHub:

- Cloudflare Pages — build command `npm run build`, output `dist`.
- GitHub Pages — vía workflow oficial de Astro.
- Netlify / Vercel — autodetectan Astro.

Cuando elijas dominio, actualiza `site` en `astro.config.mjs`.
