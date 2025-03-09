# CoffeeKit - Coffee Equipment CMS

CoffeeKit is a simple, free CMS for coffee enthusiasts to upload, organize, and share their coffee equipment setups.

## Features

- **User Authentication**: Sign up, log in, forgot password functionality
- **Equipment Management**: Add, edit, and delete coffee equipment items
- **Image Support**: Upload images or use web links for equipment photos
- **Dashboard**: View statistics about your coffee setup
- **Sharing**: Generate public links to share your coffee setup with others

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Django (planned)
- **Email**: Mailhog for transactional emails (planned)
- **Image Storage**: AWS S3 or web links (planned)
- **Hosting**: Vercel (planned)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/coffee-kit.git
   cd coffee-kit
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Copy the example environment file:
   ```
   cp .env.example .env
   ```

4. Start the development server (will auto-open in your browser):
   ```
   npm start
   ```

5. The app will open automatically at [http://localhost:3000](http://localhost:3000)

## TODO

- [ ] Set up Vercel account for deployment
- [ ] Deploy initial version to Vercel
- [ ] Implement Django backend API
- [ ] Connect frontend to Django backend
- [ ] Set up Mailhog for transactional emails
- [ ] Implement image upload functionality
- [ ] Add social sharing features
- [ ] Create user documentation

## Deployment

This project is configured for easy deployment to Vercel.

### Deploy to Vercel

#### Option 1: Using the Vercel CLI

1. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Login to Vercel:
   ```
   vercel login
   ```

3. Deploy to Vercel:
   ```
   npm run deploy
   ```

#### Option 2: Using the Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and sign up/login
3. Click "New Project" and import your GitHub repository
4. Configure the project settings (the defaults should work fine)
5. Click "Deploy"

## Project Structure

```
coffee-kit/
├── public/              # Static files
├── src/                 # Source code
│   ├── api/             # API service functions
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable components
│   ├── context/         # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main App component
│   └── index.tsx        # Entry point
├── .env.example         # Example environment variables
├── .gitignore           # Git ignore file
├── package.json         # Project dependencies
├── README.md            # Project documentation
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── vercel.json          # Vercel deployment configuration
```

## Future Plans

- Implement Django backend for user authentication and data storage
- Set up Mailhog for transactional emails
- Add AWS S3 integration for image uploads
- Implement public sharing functionality
- Add social features for coffee enthusiasts

## License

This project is licensed under the MIT License - see the LICENSE file for details.


Ideas / TODO (standard across a lot of projects hopefully)
- Keyboard nav
- Keyboard shortcuts, Cmd + E to edit, Cmd + Delete to delete, Cmd + Enter to submit