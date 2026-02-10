# Admin Setup Guide

## Initial Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Admin User
```bash
npm run seed:admin
```

This will create an admin user with:
- **Email**: admin@turkishelite.com
- **Password**: admin123
- **⚠️ IMPORTANT**: Change this password after first login!

### 3. Start the Application
```bash
npm run dev
```

## Admin Dashboard Access

1. **Login** as admin:
   - Click "Login" in the navbar
   - Email: `admin@turkishelite.com`
   - Password: `admin123`

2. **Access Dashboard**:
   - After login, click "Admin" button in navbar
   - Or navigate to: `http://localhost:5173/admin`

## Admin Dashboard Features

### Analytics Overview
- Total Bookings
- Total Contacts/Inquiries
- Pending Bookings
- Total Revenue

### Cities & Places Management
- **Add City**: Click "Add City" button
  - Name, Description, Image URL, Highlights
- **Edit City**: Click edit icon on any city card
- **Delete City**: Click delete icon on any city card

### Medical Options Management
- **Add Medical Option**: Click "Add Medical Option" button
  - Title, Description, Icon name, Features
- **Edit Option**: Click edit icon on any option card
- **Delete Option**: Click delete icon on any option card

## User Registration & Authentication

### Registration
- Users can register via "Register" button in navbar
- Registration creates a regular user account
- Users can then book tours and manage reservations

### Login
- Users can login via "Login" button
- After login, users see "Logout" button
- Admin users see additional "Admin" button

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Admin Only
- `GET /api/analytics` - Get dashboard analytics
- `POST /api/cities` - Create city
- `PUT /api/cities/:id` - Update city
- `DELETE /api/cities/:id` - Delete city
- `POST /api/medical-options` - Create medical option
- `PUT /api/medical-options/:id` - Update medical option
- `DELETE /api/medical-options/:id` - Delete medical option

### Public
- `GET /api/tours` - Get all tours
- `GET /api/cities` - Get all cities
- `GET /api/medical-options` - Get all medical options
- `POST /api/bookings` - Create booking
- `POST /api/contacts` - Submit contact form

## Security Notes

1. **JWT Secret**: Update `JWT_SECRET` in `.env` file for production
2. **Admin Password**: Change default admin password immediately
3. **MongoDB**: Use strong MongoDB credentials in production
4. **CORS**: Update `CLIENT_URL` in `.env` for production domain

## Button Functionality

All buttons are now functional:
- **"Book Now"** - Scrolls to tours section
- **"Explore Tours"** - Scrolls to tours section
- **"Medical Services"** - Scrolls to medical section
- **"Get Free Consultation"** - Scrolls to contact section
- **"Send Message"** - Submits contact form to backend
- **"Book Now" (on tour cards)** - Opens booking dialog

## Contact Form

The contact form is fully connected to the backend:
- Validates all fields
- Submits to `/api/contacts`
- Shows success/error messages
- Saves to database for admin review

## Next Steps

1. Change admin password
2. Add your first city/place
3. Add medical options
4. Customize analytics dashboard if needed
5. Set up email notifications (optional)
