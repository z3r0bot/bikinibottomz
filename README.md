# BikinibottomZ E-Commerce Website

A modern, minimal e-commerce website with a dual theme system (light/dark) and custom cursor interactions.

## Features

- 🎨 Dual theme system (light/dark)
- 🖱️ Custom cursor with interactive states
- 📱 Responsive design
- ⚡ Fast performance with Next.js
- 🎯 TypeScript for type safety
- 🎨 Tailwind CSS for styling

## Prerequisites

- Node.js 18.x or later
- npm or yarn package manager
- Git for version control

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bikinibottomz.git
   cd bikinibottomz
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
bikinibottomz/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Layout.tsx
│   │   └── CustomCursor.tsx
│   └── context/
│       └── ThemeContext.tsx
├── public/
│   └── cursors/
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── postcss.config.js
```

## Development

- The project uses Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- Custom cursor implementation
- Theme switching functionality

## Deployment

The project is configured for deployment on AWS Amplify:

1. Install AWS Amplify CLI:
   ```bash
   npm install -g @aws-amplify/cli
   ```

2. Configure Amplify:
   ```bash
   amplify configure
   ```

3. Initialize Amplify in your project:
   ```bash
   amplify init
   ```

4. Add hosting:
   ```bash
   amplify add hosting
   ```

5. Deploy:
   ```bash
   amplify publish
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 