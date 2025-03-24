# BeGainer Backend

A modern Express backend built with TypeScript.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory and add your environment variables:
```
PORT=3000
NODE_ENV=development
```

## Development

To run the development server with hot-reload:
```bash
npm run dev
```

## Production

To build and run the production server:
```bash
npm run build
npm start
```

## Testing

To run tests:
```bash
npm test
```

## API Endpoints

- `GET /`: Welcome message
- `POST /api/auth/register`: Register a user
- `POST /api/auth/login`: Login a user
