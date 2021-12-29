# YourHeartValve README

Documentation for YourHeartValve using Kentico Headless CMS 

## SCSS Folder Structure

Based upon [7-1 Sass architecture](https://www.learnhowtoprogram.com/user-interfaces/building-layouts-preprocessors/7-1-sass-architecture)

```text
scss/
|
|– abstracts/
|   |– _variables.scss    # Sass Variables
|   |– _mixins.scss       # Sass Mixins
|
|– vendors/
|   |– _bootstrap.scss    # Bootstrap
|
|– base/
|   |– _reset.scss        # Reset/normalize
|   |– _typography.scss   # Typography rules
|
|– layout/
|   |– _navigation.scss   # Navigation
|   |– _grid.scss         # Grid system
|   |– _header.scss       # Header
|   |– _footer.scss       # Footer
|   |– _sidebar.scss      # Sidebar
|   |– _forms.scss        # Forms
|
|– components/
|   |– _buttons.scss      # Buttons
|   |– _carousel.scss     # Carousel
|   |– _cover.scss        # Cover
|   |– _dropdown.scss     # Dropdown
|
|– pages/
|   |– _home.scss         # Home specific styles
|   |– _contact.scss      # Contact specific styles
|
|– themes/
|   |– _theme.scss        # Default theme
|   |– _admin.scss        # Admin theme
|
 – main.scss              # Main Sass input file
```

1. **`abstracts`** contains no actual styles, just Sass mechanisms that help define styles in other directories (sometimes called "helpers"). This includes things like global variables, functions, and mixins. Each of these categories should be placed in their own appropriately-named partial file, as seen above.

2. **`vendors`** contains any third-party stylesheets a project uses. For instance, if we wanted to use Bootstrap alongside our own custom Sass in a project, we'd download the Bootstrap stylesheet and place it here.

3. **`base`** contains boilerplate used throughout an entire si te. This includes project-wide typography styles, and stylesheets that universally reset or normalize default CSS.

4. **`layout`** contains styles for different aspects of the site's structural layout (think of areas like nav bars, headers, footers, etc.)

5. **`components`** are like "mini" layouts. Styles for small, reusable pieces of the site should reside here (think buttons, forms, profile pictures, etc.)

6. **`pages`** is where page-specific styles reside. For instance, if a project contained several style rules that are only ever used on the "Contact Us" page, they'd live here in a \_contact.scss file, as seen above.

7. **`themes`** is used whenever a site has multiple themes. For instance, the example project above includes both admin and default themes. We can therefore assume this example site is styled entirely differently for logged-in admins. Perhaps to better present and accommodate the additional features an Admin has. Some websites also offer a "night mode", where the background of the site is darker with lighter-colored text for easier reading in low-light environments. An option like this would be represented in its own theme file too.

## 🤓 BEM (Block Element Modifier) CSS Methodology

**`BEM`**: BEM (Block. Element. Modifier) is a naming methodology, which aims to solve many of the problems you’ll commonly encounter when naming classes and structuring your CSS. It also does a great job of enabling you to create reusable front end components, which is something we all strive for: to be healthy, wealthy and create reusable components.

**`Block`**: Standalone entity that is meaningful on its own.

**`Element`**: A part of a block that has no standalone meaning and is semantically tied to its block.

**`Modifier`**: A flag on a block or element. Use them to change appearance or behavior.

1.  **CSS**

    ```shell
      .card {
         &__title: {
            font-size: 1rem;
         }
         &__description {
            color: #000000;
            &--primary {
               color: #c8102e;
            }
         }
      }
    ```

2.  **HTML**

    ```shell
      <div class="card">
         <div class="card__title">Hello World</div>
         <div class="card__description card__description--primary">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
      </div>
    ```

## 🗃️ Containers vs. Components

When organzing UI Elements they can be grouped into two different folders

1. **`Components`**: Smaller UI Elements that can be nested inside of a **Container**. For example Cards, Accordions, Pagination, Sidebar
2. **`Containers`**: Sections of content that can contain multiple **Components** or just have groupings of content. For example Navbar, Hero, Features (Intro Heading + Looping through an array of Card components).

## Steps to creating a new component or container

When creating a new component thinking in terms of scalability we need to create a variants folder that will house all variations of component. Even if there is only one variation we need to think in terms of possibility of there being different versions in future.

**JavaScript Folder structure**

```text
.
└── Components
   └── Card
      ├── index.js
      └── variants
         └── CardBasic
            └── index.js


```

**SCSS Folder Structure**

```text
.
└── scss
   └── components
      └── card
         ├── _cardBasic.scss
         └── _index.scss

```

**main.scss** `./src/assets/scss/main.scss`

```css
@import './abstracts/functions';
@import './abstracts/variables';
@import './abstracts/mixins';

@import './base/reset';
@import './base/typography';
@import './base/utilities';

@import './layouts/navbar';
@import './layouts/footer';

@import './components/button';
@import './components/hero';
@import './components/card';
@import './components/pagination';
@import './components/sidebar';
```

**Component Specific Folder** `./src/assets/scss/components/hero/_index.scss`

```css
@import './heroLarge';
@import './heroSmall';
```

**Component Variant** `./src/assets/scss/components/hero/_heroSmall.scss`

```css
.heroSmall {
  height: 8rem;
  width: 100%;
  object-fit: cover;
  object-position: center;
  @include md {
    height: 14rem;
  }
}
```

**Naming Convention**

[Root Component Folder Name][simple descriptive keyword]

Example: `CardBasic`, `HeroLarge`, `NavbarDefault`

**index.js**

```javascript
import React from 'react'
import CardBasic from './variants/CardBasic'

const Card = ({ data }) => {
  switch (data.variant) {
    case 'Basic':
      return <CardBasic data={data} />
  }
}

export default Card
```

**CardBasic.js**

```javascript
import React from 'react'

const CardBasic = ({ data }) => {
  if (!data) {
    return null
  }
  const { title, icon, description, cta_link, cta_text } = data
  return (
    <article className="cardBasic">
      <h3 className="cardBasic__title">{title}</h3>
      <div className="cardBasic__icon">{icon}</div>
      <p className="cardBasic__description">{description}</p>
      <a href={cta_link} className="btn btn-blue cardBasic__cta">
        {cta_text}
      </a>
    </article>
  )
}

export default CardBasic
```

**Usage in page template**

```javascript
import React from 'react'
import { cardLinks } from '../../assets/data/links'
import CardBasic from '../../components/Card/variants/CardBasic'

const Features = () => {
  return (
    <div className="section">
      <div className="container-sm">
        <p className="text-center lead">
          A patient information resource from Edwards Lifesciences, the leader
          in heart valve therapy
        </p>
        <div className="grid-md-2 gap-1 gap-md-2">
          {cardLinks.map((card) => {
            return <CardBasic data={card} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Features
```

## REM Units

**`base rem value`**: 16px

Utilize `rem` units in css instead of `px`

## ⚙️ SCSS Variables

`./src/assets/scss/abstracts/variables`

Instead of writing hardcoded values for css properties utilizing pre existing variables should used Instead.

If you find yourself rewriting same code over again add to the variables file.

### ✅ Good

```css
h2 {
  font-size: $font-size-h2;
  line-height: line-height($font-size-h2);
  font-weight: $font-weight-light;
  color: $color-crimson;
  margin-bottom: $spacer;
  color: $color-black;
}
```

### 🚫 Bad

```css
h2 {
  font-size: 15px;
  line-height: 2.31px;
  font-weight: bold;
  color: #c8102e;
  margin-bottom: 23.4rem;
  color: #000;
}
```

## 🖌️ Color Reference

| Color                                                                   | Hex     |
| ----------------------------------------------------------------------- | ------- |
| ![#c8102e](https://via.placeholder.com/10/c8102e?text=+) $color-crimson | #c8102e |
| ![#505759](https://via.placeholder.com/10/505759?text=+) $color-slate   | #505759 |
| ![#dfdfdf](https://via.placeholder.com/10/dfdfdf?text=+) $color-slate-1 | #DFDFDF |
| ![#edeeee](https://via.placeholder.com/10/edeeee?text=+) $color-slate-2 | #EDEEEE |
| ![#000000](https://via.placeholder.com/10/000000?text=+) $color-black   | #000000 |
| ![#FFFFFF](https://via.placeholder.com/10/FFFFFF?text=+) $color-white   | #FFFFFF |
| ![#8ba9bd](https://via.placeholder.com/10/8ba9bd?text=+) $color-blue     | #356584 |

## Breakpoints

Using a min-width breakpoint system

| Breakpoints | Size   |
| ----------- | ------ |
| default     | 0px    |
| md          | 768px  |
| lg          | 1024px |

### Using breakpoint mixins with css

The below code will generate styling for `h2` element with red color until it reaches medium screens and becomes blue.

```css
h2 {
  color: red;
  @include md {
    color: blue;
  }
}
```

## Grid System

Utilizes CSS Grid to create utility classes for easy usage.

_Using these utility classes isn't necessary in markup if you just want to write your own styles in corresponding partial sass file for component_

`./src/assets/scss/base/_utilities.scss`

### Two Column Layout

```html
<div className="grid-md-2">
  <Card />
  <Card />
</div>
```

### Two Column Layout (mobile) + 4 Column Layout (desktop)

```html
<div className="grid-2 grid-md-4">
  <Card />
  <Card />
  <Card />
  <Card />
</div>
```

### Gap

By default the gap creating using grid is `2rem`

In order to adjust the size of the gap use `grid-number` convention

the `number` used above for class will correlate to how many `rems` of gap you will have

**Example**

The below code will generate a layout with `3rems` of spacing between elements for mobile and `2rems` of spacing between elements for desktop

```html
<div className="grid-3 gap-3 gap-md-2">
  <Card />
  <Card />
  <Card />
</div>
```

### Ordering

The below code will order the `hello world` text on mobile below the `img` and on the left side in desktop

```html
<div className="container grid-1 grid-md-2">
  <div className="order-2 order-md-1">
    <p>hello world</p>
  </div>
  <div className="order-1 order-md-2">
    <img src="#" alt="sample image" />
  </div>
</div>
```

### Custom Column Sizes

In order to achieve a explicit column layout for instance `4 + 8` we need to first set the grid template columns to 12 `grid-md-12`

**`col-md-4`**: sets the `grid-column` span to 4

**`col-md-8`**: sets the `grid-column` span to 8

```html
<div className="grid-1 grid-md-12 gap-1 gap-md-2">
  <div className="col-md-4">
    <Sidebar />
  </div>
  <div className="col-md-8">
    <h3>Hello world</h3>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit nobis
      molestias reprehenderit nostrum reiciendis. Voluptate excepturi reiciendis
      repellat eaque sit libero ad facere adipisci molestiae? Sint non
      aspernatur eveniet quibusdam!
    </p>
  </div>
</div>
```

## Generating Custom Utility Classes

`./src/assets/scss/base/_utilities.scss`

When needed, custom utilities can be added to the below $utilities map.

```css
$utilities: (
  'text-align': (
    'prefix': 'text',
    'values': (
      'center': center,
    ),
  ),
  'margin-top': (
    'prefix': 'mt',
    'values': (
      '0': 0,
      '1': 1rem,
      '2': 2rem,
      '3': 3rem,
      '4': 4rem,
      '5': 5rem,
    ),
  ),
);

@each $property, $map in $utilities {
  $prefix: map-get($map, 'prefix');
  $values: map-get($map, 'values');

  @each $k, $v in $values {
    .#{$prefix}-#{$k} {
      #{$property}: $v;
    }
    @include md {
      .#{$prefix}-md-#{$k} {
        #{$property}: $v;
      }
    }
  }
}
```

**Adding a Margin Left utility Example**

```css
$utilities: (
  'text-align': (
    'prefix': 'text',
    'values': (
      'center': center
    )
  ),
  'margin-top': (
    'prefix': 'mt',
    'values': (
      '0': 0,
      '1': 1rem,
      '2': 2rem,
      '3': 3rem,
      '4': 4rem,
      '5': 5rem
    )
  ),
  'margin-left': (
    'prefix': 'ml',
    'values': (
      '0': 0,
      '1': 1rem,
      '2': 2rem,
      '3': 3rem,
      '4': 4rem,
      '5': 5rem
    )
  )
);
```

Will generate classes `ml-0` through `ml-5`

*Sample text for dev PR*
