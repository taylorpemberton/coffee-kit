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
- **Backend**: Django with Django REST Framework
- **Database**: SQLite (local), PostgreSQL (production)
- **Authentication**: Token-based authentication
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Python 3.8 or later (for backend)

### Frontend Installation

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

### Backend Installation

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```
   python manage.py migrate
   ```

5. Create a superuser:
   ```
   python manage.py createsuperuser
   ```

6. Start the development server:
   ```
   python manage.py runserver
   ```

7. Access the Django admin at [http://localhost:8000/admin](http://localhost:8000/admin)

## Current Status

- ✅ Frontend UI implemented with React and Tailwind CSS
- ✅ Django backend API implemented with Django REST Framework
- ✅ Equipment and RetailerLink models created
- ✅ API endpoints for equipment and retailer links
- ✅ Backend deployed to Vercel

## TODO (Next Steps)

- [ ] Set up PostgreSQL database in production
- [ ] Configure environment variables in Vercel
- [ ] Run migrations on production database
- [ ] Create superuser for production admin
- [ ] Connect frontend to backend API
- [ ] Deploy frontend to Vercel
- [ ] Implement user authentication in frontend
- [ ] Set up Mailhog for transactional emails
- [ ] Implement image upload functionality
- [ ] Add social sharing features
- [ ] Create user documentation

## Deployment

### Backend Deployment (Completed)

The backend has been deployed to Vercel at:
https://coffee-kit-backend-f223xmwg6-taylors-projects-cba75833.vercel.app

### Frontend Deployment

This project is configured for easy deployment to Vercel.

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
   vercel
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
├── backend/             # Django backend
│   ├── coffee_backend/  # Django project settings
│   ├── equipment/       # Equipment app
│   ├── manage.py        # Django management script
│   └── requirements.txt # Python dependencies
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

- Add AWS S3 integration for image uploads
- Implement public sharing functionality
- Add social features for coffee enthusiasts
- Mobile app version

## License

This project is licensed under the MIT License - see the LICENSE file for details.


Ideas / TODO (standard across a lot of projects hopefully)
- Keyboard nav
- Keyboard shortcuts, Cmd + E to edit, Cmd + Delete to delete, Cmd + Enter to submit