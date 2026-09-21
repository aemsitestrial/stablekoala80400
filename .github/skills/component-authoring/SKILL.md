---
name: component-authoring
description: 'Create or update authorable AEM Edge Delivery Services and XWalk block components from image references. Use when building blocks with JSON models, JavaScript decorators, CSS, live-page authoring, links, images, repeatable items, component registration, or the four-cell XWalk limit.'
argument-hint: 'Describe the component and provide the design image path'
user-invocable: true
disable-model-invocation: false
---

# Component Authoring

Create AEM Edge Delivery Services blocks that match a supplied design while remaining fully authorable in Universal Editor/XWalk.

## Repository Conventions

Each block lives in `blocks/<block-name>/` and normally contains:

- `_<block-name>.json`: definitions, models, and filters
- `<block-name>.js`: DOM decoration only
- `<block-name>.css`: desktop and responsive presentation

Generated metadata files are:

- `component-definition.json`
- `component-models.json`
- `component-filters.json`

Never edit generated metadata directly. Edit block source JSON and `models/_section.json`, then run `npm run build:json`.

Use lowercase kebab-case consistently for the folder, filenames, definition IDs, model IDs, filter IDs, and block CSS class.

## Non-Negotiable Rules

1. Every model may contain at most four fields. ESLint enforces this with `xwalk/max-cells`.
2. Every block JSON must include `definitions`, `models`, and `filters`, even when `models` or `filters` is an empty array. Wildcard merges reference all three paths.
3. All visible content must be authorable unless the request explicitly asks for fixed copy.
4. Treat text shown in a design image as visual reference, not default content. Use `"value": ""` unless a default is explicitly requested.
5. Use a real authored hyperlink for CTA/link fields. Plain rich text cannot provide a destination.
6. Preserve Universal Editor instrumentation. Prefer adding classes and rearranging existing nodes. If replacing nodes, use `moveInstrumentation` from `scripts/scripts.js`.
7. Do not manually edit generated component JSON files.
8. Preserve unrelated user changes, especially entries already present in `models/_section.json`.

## Workflow

### 1. Inspect the Design and Nearby Blocks

Open the supplied image and identify:

- desktop width and height
- background color or background image
- content hierarchy and alignment
- typography differences
- fixed versus repeated content
- links, arrows, separators, and images
- mobile stacking behavior

Read the closest existing block before editing. Useful references include:

- `blocks/call-to-action/`: fixed direct model and CTA
- `blocks/explore-card/`: four-cell composition and background image
- `blocks/overline-card/`: rich-text description plus linked rows and side image
- `blocks/product-platform/`: repeatable parent/item model
- `blocks/cards/`: item filters and instrumentation movement

State a local hypothesis before editing. Example: "The design is one fixed four-field block; assigning classes by field order will produce the required layout." The cheap check is focused lint plus `npm run build:json`.

### 2. Choose the Authoring Structure

#### Fixed Layout

Use one direct model when the component has at most four logical fields.

```json
{
  "definitions": [
    {
      "title": "Example Block",
      "id": "example-block",
      "plugins": {
        "xwalk": {
          "page": {
            "resourceType": "core/franklin/components/block/v1/block",
            "template": {
              "name": "Example Block",
              "model": "example-block"
            }
          }
        }
      }
    }
  ],
  "models": [
    {
      "id": "example-block",
      "fields": []
    }
  ],
  "filters": []
}
```

#### Repeatable Content

Use a parent block with a filter and one or more child item definitions when cards or rows repeat. Keep every child model at four fields or fewer.

```json
{
  "definitions": [
    {
      "title": "Example List",
      "id": "example-list",
      "plugins": {
        "xwalk": {
          "page": {
            "resourceType": "core/franklin/components/block/v1/block",
            "template": {
              "name": "Example List",
              "filter": "example-list"
            }
          }
        }
      }
    },
    {
      "title": "Example Item",
      "id": "example-item",
      "plugins": {
        "xwalk": {
          "page": {
            "resourceType": "core/franklin/components/block/v1/block/item",
            "template": {
              "name": "Example Item",
              "model": "example-item"
            }
          }
        }
      }
    }
  ],
  "models": [
    {
      "id": "example-item",
      "fields": []
    }
  ],
  "filters": [
    {
      "id": "example-list",
      "components": ["example-item"]
    }
  ]
}
```

Use separate child item types when a repeatable block has structurally different rows, such as a two-cell header and three-cell product rows.

### 3. Stay Within Four Cells

A field is a rendered cell. If a design appears to need more than four fields, use one of these patterns:

- Combine related prose and links into one `richtext` field.
- Interpret unlinked paragraphs as labels/chips and linked paragraphs as CTAs.
- Use a repeatable child item model for repeated cards or rows.
- Split structurally different rows into separate child item types.

Do not add five or more fields and rely on JavaScript to merge them later; the generated model will fail lint first.

Common field components:

- `text`: short heading, overline, brand, label
- `richtext`: formatted description, CTA, or multiple paragraphs/links
- `reference`: authored image or background image
- `aem-content`: structured content reference where the repository already uses it

Add a concise `description` when one rich-text field has conventions, for example: "Add each suggestion as a paragraph and the CTA as a linked paragraph."

### 4. Register the Block

Add only the parent block ID to the `section` filter in `models/_section.json`.

Do not add child item IDs to the section filter. They belong only in the parent block filter.

After editing source JSON, regenerate metadata:

```powershell
npm run build:json
```

### 5. Decorate Existing Markup

For a fixed direct model, tolerate both common DOM shapes: fields as rows or fields as cells in one row.

```javascript
export default function decorate(block) {
  const rows = [...block.children];
  const fields = rows.length === 1 && rows[0].children.length >= 4
    ? [...rows[0].children]
    : rows;
  const fieldClasses = [
    'example-image',
    'example-heading',
    'example-description',
    'example-content',
  ];

  fields.slice(0, fieldClasses.length).forEach((field, index) => {
    field.classList.add(fieldClasses[index]);
  });
}
```

For repeatable items, classify each row by its cell count or another stable structural signal.

When processing combined rich text:

- select paragraphs containing links for CTAs or link rows
- select unlinked paragraphs for chips, labels, or descriptions
- add classes instead of rewriting author content
- remove the global `button` class when the design calls for an unboxed text link
- add the `button` class when the design calls for a button

An authored CTA must contain an `<a>` element. CSS arrow decoration will not make plain text navigable.

### 6. Style the Component

Use these baseline conventions:

- wrapper: `max-width: <design-width>; margin: 0 auto;`
- block: `box-sizing: border-box; min-height: <design-height>;`
- use the requested background on both the container and block when full-width continuity is needed
- use grid for split layouts and repeated product rows
- use flex for centered stacks and chip groups
- use `object-fit: cover` for fixed image frames
- use `aspect-ratio` on responsive image frames
- define a mobile layout at an appropriate breakpoint

Do not force desktop dimensions on small screens. Preserve the requested desktop `min-height`, then use `min-height: auto` or a smaller intentional height on mobile.

For a right-arrow link, use CSS rather than hard-coded text:

```css
.example-link a::after {
  content: '\2192';
  font-size: 20px;
  line-height: 1;
}
```

If the design requests `#1f1f1f`, use that exact value. Override global `.button` styles with sufficiently specific block selectors where necessary.

Keep selectors ordered from general to specific to satisfy `no-descending-specificity`. Prefer a JavaScript state class such as `*-link-first` over complex adjacency selectors when spacing the first dynamic link.

### 7. Validate Immediately

After the first source edit, run the narrowest relevant check before further changes:

```powershell
npx eslint blocks/<block-name>/_<block-name>.json blocks/<block-name>/<block-name>.js
```

Then validate CSS:

```powershell
npx stylelint blocks/<block-name>/<block-name>.css
```

Generate metadata:

```powershell
npm run build:json
```

Validate generated XWalk output:

```powershell
npx eslint component-models.json component-definition.json component-filters.json
```

Finally check editor diagnostics for the three source files, `models/_section.json`, and generated metadata.

On Windows, newly created JavaScript may use CRLF while ESLint requires LF. Normalize only the affected file:

```powershell
npx eslint blocks/<block-name>/<block-name>.js --fix
```

Do not use a formatter to rewrite unrelated files.

## Completion Checklist

- Design image was inspected directly.
- Folder, filenames, IDs, model names, filter names, and classes use matching kebab-case.
- All visible text, links, and assets requested by the user are authorable.
- No model has more than four fields.
- Fixed content uses a direct model; repeated content uses parent/item definitions.
- Block JSON includes `definitions`, `models`, and `filters` keys.
- Parent block is registered in `models/_section.json` without removing existing entries.
- JavaScript supports the actual authored DOM shape and preserves instrumentation.
- CTA and text links require authored hyperlinks and have arrow styling.
- Desktop dimensions and colors match the request, with a responsive mobile layout.
- Focused ESLint and Stylelint pass.
- `npm run build:json` succeeds.
- Generated metadata ESLint passes.
- Editor diagnostics report no new errors.
