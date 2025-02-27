# Wardrobe Management Frontend

A responsive Vue 3 frontend for the Wardrobe Management System. This application allows users to manage their wardrobe with features like authentication, CRUD operations for clothing items, categorization, and search/filter functionality.

## Features

* User authentication (login/registration)
* Add, edit, and delete clothing items
* Categorize items (tops, bottoms, shoes, etc.)
* Search and filter functionality
* Responsive design with Tailwind CSS
* Beautiful UI components with shadcn-vue

## Prerequisites

* **Node.js** (>= 18.x) and **npm**: [Download](https://nodejs.org/)
* **Git**: [Download](https://git-scm.com/downloads)

Verify installations:

```bash
node -v
npm -v
git --version
```

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd wardrobe-frontend
```

**Note**: Replace `<repository-url>` with the actual URL of the frontend repository.

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Tailwind CSS (if not pre-configured)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

* Edit `tailwind.config.js`:

```js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {}
  },
  plugins: [],
}
```

* Add to `src/assets/main.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

* Import in `src/main.js`:

```js
import './assets/main.css'
```

Follow the prompts to set up components in `src/components/ui`.

### 5. Install Axios for API requests

```bash
npm install axios
```

### 6. Create a .env file (if needed)

```bash
touch .env
```

Add your environment variables:

```
VITE_API_URL=http://localhost:8000/api
```

## Running the Project

### 1. Start the Development Server

```bash
npm run dev
```

The application will be available at http://localhost:5173.

**Note**: Make sure the backend server is running at http://localhost:8000.

## Project Structure

```
src/
├── assets/         # Static assets (CSS, images)
├── components/     # Vue components
│   └── ui/         # shadcn-vue components
├── composables/    # Vue composables
├── layouts/        # Layout components
├── router/         # Vue Router configuration
├── stores/         # Pinia/Vuex stores
├── services/       # API services
├── views/          # Page components
├── App.vue         # Main application component
└── main.js         # Application entry point
```

## Available Scripts

* `npm run serve` - Start the development server
* `npm run build` - Build for production
* `npm run preview` - Preview the production build
* `npm run lint` - Run ESLint
* `npm run test` - Run tests (if configured)

## Deployment

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory and can be deployed to any static web server.

## Backend Integration

This frontend is designed to work with the Laravel backend. Make sure the backend is running and accessible at the URL specified in your environment variables.

To connect with a different backend, update the API URL in your `.env` file or in the API service files.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.