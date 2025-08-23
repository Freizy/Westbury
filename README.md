# Luxury Apartments Accra - Full Stack Website

A modern, responsive luxury apartment rental website built with React, Node.js, and MySQL.

## 🚀 Features

- **Property Listings** - Browse luxury apartments with detailed information
- **Booking System** - Online reservation with availability checking
- **Admin Dashboard** - Complete property and booking management
- **Staff Portal** - Attendance tracking and inventory management
- **Contact Forms** - Customer inquiry management
- **Responsive Design** - Mobile-first approach with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React** - User interface
- **Tailwind CSS** - Styling
- **React Router** - Navigation

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MySQL** - Database (XAMPP)
- **JWT** - Authentication
- **Nodemailer** - Email notifications

## 📋 Prerequisites

- **XAMPP** - For MySQL database
- **Node.js** (v16+) - JavaScript runtime
- **npm** - Package manager

## ⚡ Quick Start

### 1. Clone and Install
   ```bash
   git clone <repository-url>
cd APART
npm install
cd client && npm install
   ```

### 2. Database Setup
   ```bash
# Start XAMPP MySQL
# Open XAMPP Control Panel and start MySQL

# Create environment file
copy env.example .env

# Install MySQL dependency
npm install mysql2
```

### 3. Import Sample Data
   ```bash
# The application will create tables automatically
# Sample data is included in database/sample_data.sql
   ```

### 4. Start Development
   ```bash
# Start both server and client
   npm run dev
   
# Or start separately
npm run server    # Backend on port 5000
npm run client    # Frontend on port 3000
```

## 🔧 Configuration

### Environment Variables (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration (XAMPP MySQL)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=luxury_apartments_accra
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@luxuryapartmentsaccra.com

# Client URL
CLIENT_URL=http://localhost:3000
```

## 📊 Database Schema

The application automatically creates these tables:

- **users** - Admin accounts with role-based access
- **properties** - Property listings with JSON amenities/images
- **bookings** - Guest reservations with foreign keys
- **contact_inquiries** - Customer contact forms
- **staff** - Staff member information
- **attendance** - Staff attendance tracking
- **inventory** - Inventory management

## 🔐 Admin Access

- **URL**: http://localhost:3000/admin
- **Username**: `admin`
- **Password**: `admin123`

## 📁 Project Structure

```
APART/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── Images/        # Static images
│   └── public/
├── server/                 # Node.js backend
│   ├── database/          # Database configuration
│   ├── middleware/        # Authentication middleware
│   ├── routes/            # API routes
│   └── uploads/           # File uploads
├── database/              # SQL files
│   └── sample_data.sql    # Sample data
└── package.json           # Dependencies
```

## 🚀 Available Scripts

```bash
npm run dev          # Start both server and client
npm run server       # Start backend only
npm run client       # Start frontend only
npm run build        # Build for production
npm run install-all  # Install all dependencies
```

## 🗄️ Database Management

### Using phpMyAdmin
1. Open http://localhost/phpmyadmin
2. Select database: `luxury_apartments_accra`
3. Browse and manage tables

### Using MySQL Command Line
```bash
cd C:\xampp\mysql\bin
mysql -u root -p
USE luxury_apartments_accra;
```

## 🔧 Troubleshooting

### Common Issues

1. **MySQL Connection Failed**
   - Ensure XAMPP MySQL is running
   - Check port 3306 availability
   - Verify credentials in `.env`

2. **Port Already in Use**
   - Change port in `.env` file
   - Stop other services using the port

3. **Database Not Found**
   - Application creates database automatically
   - Or create manually in phpMyAdmin

### Reset Database
```bash
# Drop database in phpMyAdmin
# Restart application (recreates tables)
# Import sample data from database/sample_data.sql
```

## 📧 API Endpoints

### Properties
- `GET /api/properties` - List all properties
- `GET /api/properties/:id` - Get single property
- `GET /api/properties/featured/list` - Featured properties

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - List bookings (admin)
- `PATCH /api/bookings/:id/status` - Update status

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Admin registration

### Contact
- `POST /api/contact` - Submit inquiry
- `GET /api/contact` - List inquiries (admin)

## 🔒 Security Notes

- Change default admin password in production
- Use strong JWT secrets
- Configure proper MySQL permissions
- Enable SSL for production
- Set up regular backups

## 🚀 Production Deployment

1. Use dedicated MySQL server
2. Configure environment variables
3. Set up SSL/TLS encryption
4. Configure proper security settings
5. Set up automated backups

## 📞 Support

For issues:
1. Check console logs
2. Verify XAMPP MySQL is running
3. Test database connection
4. Review environment configuration

---

**Status**: ✅ Ready for development and production use 