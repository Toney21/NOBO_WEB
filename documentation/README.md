# Nobo Documentation

## Overview

Nobo is a comprehensive food delivery application built with Next.js and React. It provides a full-featured platform for ordering food from restaurants, managing carts, tracking orders, and more. This application is designed for scalability, performance, and user experience, incorporating modern web technologies and best practices.

**Version:** 3.0.0  
**Framework:** Next.js 15.1.6  
**UI Library:** Material-UI (MUI)  
**State Management:** Redux Toolkit  
**Authentication:** Firebase  
**Internationalization:** i18next  

## Features

### Core Functionality
- **Restaurant Discovery:** Browse restaurants by categories, cuisines, popularity, and location
- **Menu Management:** Detailed restaurant menus with item customization
- **Shopping Cart:** Persistent cart with item management and quantity controls
- **User Authentication:** Login/signup with social providers (Google, Facebook, Apple)
- **Order Management:** Place orders, track delivery, view order history
- **Payment Integration:** Multiple payment methods and cashback features
- **Real-time Notifications:** Push notifications via Firebase
- **Location Services:** GPS-based location detection and delivery tracking
- **Multi-language Support:** Internationalization with i18next
- **Responsive Design:** Mobile-first design with Material-UI components

### Advanced Features
- **Campaigns & Promotions:** Special offers and discount campaigns
- **Wishlist:** Save favorite restaurants and items
- **Reviews & Ratings:** Rate restaurants and leave reviews
- **Chat Support:** In-app customer support
- **Delivery Registration:** Registration system for delivery personnel
- **Restaurant Registration:** Onboarding for new restaurants
- **Admin Dashboard:** (Assumed based on structure) Management interface

## Technology Stack

### Frontend
- **Next.js 15.1.6:** React framework for server-side rendering and static site generation
- **React 18.2.0:** Core UI library
- **Material-UI (MUI):** Component library for consistent design
- **Redux Toolkit:** State management
- **Framer Motion:** Animation library
- **Formik:** Form handling
- **Axios:** HTTP client for API calls

### Backend Integration
- **Firebase:** Authentication, real-time database, push notifications
- **Google Maps API:** Location services and mapping
- **Custom API:** Main API integration via `src/api/MainApi.js`

### Development Tools
- **ESLint:** Code linting
- **Jest:** Testing framework
- **Webpack:** Build tool (via Next.js)
- **Babel:** JavaScript transpilation

### Additional Libraries
- **i18next:** Internationalization
- **React Google Recaptcha:** Spam protection
- **React Date Range:** Date picker components
- **Emoji Picker:** User input enhancement
- **NProgress:** Loading indicators

## Project Structure

```
Nobo React/
├── public/                    # Static assets
│   ├── static/               # Images, icons, banners
│   └── firebase-messaging-sw.js
├── src/
│   ├── api/                  # API configuration and calls
│   ├── assets/               # Additional assets
│   ├── components/           # Reusable UI components
│   │   ├── auth/            # Authentication components
│   │   ├── cart-clear/      # Cart management
│   │   ├── checkout-page/   # Checkout flow
│   │   ├── custom-*         # Custom UI components
│   │   └── ...              # Other feature components
│   ├── contexts/            # React contexts
│   ├── helpers/             # Utility functions
│   ├── hooks/               # Custom React hooks
│   ├── language/            # Internationalization files
│   ├── pages/               # Next.js pages (routes)
│   ├── redux/               # Redux store, slices, actions
│   ├── styled-components/   # Styled components
│   ├── styles/              # Global styles
│   ├── theme/               # Material-UI theme configuration
│   └── utils/               # Utility functions and constants
├── documentation/           # Project documentation
├── package.json             # Dependencies and scripts
├── next.config.js           # Next.js configuration
├── jsconfig.json            # JavaScript configuration
└── README.md                # Basic setup instructions
```

## Installation and Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- Git

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd "Nobo React"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_API_URL=<your-api-url>
   NEXT_PUBLIC_FIREBASE_API_KEY=<firebase-api-key>
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<firebase-auth-domain>
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<google-maps-api-key>
   # Add other required environment variables
   ```

4. **Firebase Setup:**
   - Create a Firebase project
   - Enable Authentication, Firestore, and Cloud Messaging
   - Add your Firebase configuration to the environment variables

5. **Start the development server:**
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run start
```

## Key Components

### Authentication
- **Login/Signup:** Social login with Google, Facebook, Apple
- **OTP Verification:** Phone number verification
- **Profile Management:** User profile updates

### Cart and Checkout
- **Cart Management:** Add/remove items, quantity adjustments
- **Checkout Flow:** Address selection, payment, order confirmation
- **Order Tracking:** Real-time delivery tracking

### Restaurant Features
- **Restaurant Listing:** Filter by category, cuisine, rating
- **Menu Display:** Item details, customization options
- **Reviews System:** User reviews and ratings

### Admin Features (Assumed)
- **Dashboard:** Analytics and management
- **Restaurant Management:** Onboarding and management
- **Order Management:** Processing and tracking

## API Integration

The application integrates with a custom API for backend services. Key API endpoints include:

- User authentication and profile
- Restaurant and menu data
- Order management
- Payment processing
- Location services

API calls are handled through `src/api/MainApi.js` with Axios for HTTP requests.

## Internationalization (i18n)

Nobo supports multiple languages using i18next. Language files are located in `src/language/`. The application automatically detects user language preferences and provides translations for:

- UI elements
- Error messages
- Content labels

## NoSSR Implementation

To prevent server-side rendering issues with client-only features (localStorage, window objects), the application uses Material-UI's `NoSsr` component. This ensures:

- No hydration mismatches
- Safe access to browser APIs
- Maintained SEO for meta tags

All pages have been updated to wrap dynamic content in `NoSsr` while keeping meta tags server-rendered.

## Deployment

### Build Configuration
- The application is configured for static export or server deployment
- Use `npm run build` to create production builds
- Deploy to platforms like Vercel, Netlify, or traditional hosting

### Environment Variables
Ensure all production environment variables are set in your deployment platform.

## Testing

Run tests with:
```bash
npm test
```

The application uses Jest for unit testing. Add tests in `__tests__` folders or alongside components with `.test.js` extensions.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and add tests
4. Run linting: `npm run lint`
5. Commit your changes: `git commit -am 'Add new feature'`
6. Push to the branch: `git push origin feature/your-feature`
7. Submit a pull request

## Troubleshooting

### Common Issues

1. **SSR Hydration Errors:** Ensure dynamic content is wrapped in `NoSsr`
2. **API Connection Issues:** Check environment variables and API endpoints
3. **Firebase Configuration:** Verify Firebase project settings
4. **Build Failures:** Check Node.js version and dependencies

### Performance Optimization
- Use Next.js Image component for optimized images
- Implement lazy loading for components
- Optimize bundle size with code splitting

## License

[Add license information if available]

## Support

For support and questions:
- [Add contact information or issue tracker]

---

This documentation provides an overview of the Nobo application. For detailed API documentation or specific component usage, refer to inline code comments and the respective files in the codebase.