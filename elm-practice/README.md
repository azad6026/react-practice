## Elm Banner Component in Astro

This project demonstrates how to integrate an Elm application within an Astro site. It features a responsive banner grid component built with Elm that fetches data from a JSON file and renders it with custom styling.

## Project Structure

```
elm-practice/
├── public/
│   ├── banners.json         # Banner data in JSON format
│   └── elm-banner.js        # Compiled Elm application
├── src/
│   ├── components/
│   │   └── ElmBanner.astro  # Astro component that loads the Elm app
│   ├── elm/                 # Elm source code
│   │   ├── elm.json         # Elm package manifest
│   │   └── src/
│   │       └── Banner.elm   # Elm application source code
│   ├── layouts/
│   │   └── Layout.astro     # Main layout component
│   ├── pages/
│   │   └── index.astro      # Main page that includes the banner component
│   └── styles/
│       ├── global.css       # Global styles and Tailwind imports
│       └── utilities.css    # Custom utility classes
├── astro.config.mjs         # Astro configuration
├── package.json             # Node.js dependencies and scripts
└── tailwind.config.js       # Tailwind CSS configuration
```

## How It Works

### Data Flow

1. Banner data is stored in `public/banners.json`
2. The Elm application (`src/elm/src/Banner.elm`) fetches this data via HTTP request
3. The JSON is decoded into Elm data structures
4. Elm renders the HTML structure with appropriate styling
5. The compiled Elm application is loaded by the Astro component (`src/components/ElmBanner.astro`)

### Key Components

#### Banner.elm

This is the main Elm application that:
- Defines the data model for banners
- Fetches data from the JSON file
- Decodes the JSON response
- Handles loading and error states
- Renders the banner grid with appropriate styling

#### ElmBanner.astro

This Astro component:
- Creates a container for the Elm application
- Includes the compiled Elm JavaScript with the `is:inline` directive
- Initializes the Elm application when the DOM is loaded
- Provides additional styling for loading and error states

## Setup and Installation

### Prerequisites

- Node.js (via nvm)
- Elm

### Installation Steps

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd elm-practice
   ```
3. Activate nvm and install dependencies:
   ```bash
   . ~/.nvm/nvm.sh
   npm install
   ```
4. Install Elm packages (if not already done):
   ```bash
   cd src/elm
   elm install elm/http
   elm install elm/json
   ```

### Building the Elm Component

To compile the Elm application:

```bash
cd src/elm
elm make src/Banner.elm --output=../../public/elm-banner.js --optimize
```

### Running the Development Server

```bash
cd elm-practice
. ~/.nvm/nvm.sh 
npm run dev
```

Access the site at: http://localhost:4321

## Important Notes

### Astro Integration

- The Elm JavaScript file is loaded with `is:inline` directive to prevent Astro from bundling it
- Custom utility classes are imported to match the original HTML structure's styling
- Tailwind CSS is configured to work with the Astro project

### CSS Structure

- Base Tailwind styles are imported in `global.css`
- Custom utility classes for the banner component are defined in `utilities.css`
- Component-specific styles are defined within the component files

### JSON Data Structure

The banner data follows this structure:
```json
{
  "banners": [
    {
      "id": "unique-id",
      "href": "/link-path",
      "imageUrl": "https://example.com/image.jpg",
      "imageSizes": "(min-width: 768px) 50vw, 100vw",
      "srcset": "image-srcset-values",
      "title": "Banner Title",
      "linkText": "Call to action text >"
    },
    // More banners...
  ]
}
```

## Further Development

### Modifying the Elm Component

If you need to modify the Elm component:

1. Edit the `src/elm/src/Banner.elm` file
2. Recompile it with:
   ```bash
   cd src/elm
   elm make src/Banner.elm --output=../../public/elm-banner.js --optimize
   ```
3. Refresh your browser to see the changes

### Adding More Banner Items

To add more banners:
1. Edit the `public/banners.json` file
2. Add new banner objects to the `banners` array
3. Follow the existing structure for consistency

### Styling Changes

- For Tailwind-based styling: Edit or add classes in the Elm component
- For custom utility classes: Modify `src/styles/utilities.css`
- For component-specific styles: Edit the `<style>` section in `ElmBanner.astro`

