# NIKAT App Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    NIKAT Mobile Application                  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Presentation Layer (UI)                │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  Screens:      Navigation:          Components:     │  │
│  │  • Home        • Stack Nav          • Button         │  │
│  │  • Login       • Tab Nav            • Input          │  │
│  │  • Shop List   • Route Guards       • Card           │  │
│  │  • Subscribe   • Linking            • Grid           │  │
│  │  • Profile                          • Loader         │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Business Logic Layer (Hooks/Context)        │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  • useAuth           • AuthContext                   │  │
│  │  • useLanguage       • LanguageContext               │  │
│  │  • Custom Hooks      • Global State Management       │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Service Layer (API Integration)           │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  • AuthService       • PaymentService                │  │
│  │  • ShopService       • LocationService               │  │
│  │  • FirebaseService   • ValidationService             │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            Data Layer (Firebase/Backend)            │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  • Firebase Auth     • Firestore Database            │  │
│  │  • Cloud Functions   • Storage Buckets               │  │
│  │  • Analytics         • Logging                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │      External Services (Third-Party APIs)           │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  • Razorpay (Payments)      • Google Maps           │  │
│  │  • Twilio (SMS/Calls)       • Analytics Services    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Authentication Flow
```
User Input (Phone) 
    ↓
LoginScreen Component
    ↓
AuthService.sendOTP()
    ↓
Firebase Auth
    ↓
Verify OTP
    ↓
AuthContext Updates State
    ↓
Navigation to Home
```

### Shop Browsing Flow
```
User Selects Category
    ↓
ShopListScreen Renders
    ↓
ShopService.getShopsByCategory()
    ↓
Firestore Query
    ↓
Load & Display Results
    ↓
Check Subscription Status
    ↓
Show Locked/Unlocked UI
```

### Subscription Flow
```
User Clicks Unlock
    ↓
SubscriptionScreen Shows Plans
    ↓
User Selects Plan
    ↓
PaymentService.createPayment()
    ↓
Process Payment (Razorpay/UPI)
    ↓
PaymentService.activateSubscription()
    ↓
Update User & Shop in Firestore
    ↓
Navigate to Home
```

## Folder Structure with Purposes

```
NIKAT/
│
├── src/                          # Source code
│   │
│   ├── screens/                  # Complete screen/page components
│   │   ├── LanguageSelectionScreen.js    # First screen on app launch
│   │   ├── LoginScreen.js                # Phone OTP login
│   │   ├── HomeScreen.js                 # Main category grid
│   │   ├── ShopListScreen.js             # List shops by category
│   │   ├── SubscriptionScreen.js         # Subscription plans
│   │   ├── RegisterShopScreen.js         # Shop registration
│   │   ├── ProfileScreen.js              # User profile
│   │   ├── MyShopsScreen.js              # User's shops list
│   │   └── index.js                      # Export all screens
│   │
│   ├── components/               # Reusable UI components
│   │   ├── Button.js             # Customizable button
│   │   ├── Input.js              # Text input with validation
│   │   ├── ShopCard.js           # Shop card UI
│   │   ├── CategoryGrid.js       # Category grid layout
│   │   ├── Header.js             # App header bar
│   │   ├── SkeletonLoader.js     # Loading placeholders
│   │   └── index.js              # Export all components
│   │
│   ├── services/                 # Business logic & API calls
│   │   ├── authService.js        # Firebase authentication
│   │   ├── shopService.js        # Shop CRUD operations
│   │   ├── paymentService.js     # Payment & subscription
│   │   └── index.js              # Export all services
│   │
│   ├── context/                  # Global state (Context API)
│   │   ├── AuthContext.js        # User authentication state
│   │   └── LanguageContext.js    # App language state
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAuth.js            # Hook to access AuthContext
│   │   └── useLanguage.js        # Hook to access LanguageContext
│   │
│   ├── config/                   # Configuration files
│   │   └── firebase.js           # Firebase initialization
│   │
│   ├── constants/                # Static data & constants
│   │   ├── Colors.js             # Color palette
│   │   ├── Strings.js            # Multi-language strings
│   │   └── SubscriptionPlans.js  # Plans & categories data
│   │
│   ├── utils/                    # Utility functions
│   │   ├── validation.js         # Input validation functions
│   │   ├── helpers.js            # Helper functions
│   │   └── storage.js            # AsyncStorage wrapper
│   │
│   ├── navigation/               # Navigation setup
│   │   └── RootNavigator.js      # Navigation structure
│   │
│   └── assets/                   # Images, fonts, media
│       └── .gitkeep              # Directory placeholder
│
├── App.js                        # Root component
├── app.json                      # Expo configuration
├── package.json                  # Dependencies
├── babel.config.js               # Babel configuration
├── metro.config.js               # Metro bundler config
├── eas.json                      # EAS build configuration
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
│
├── README.md                     # Main documentation
├── QUICKSTART.md                 # 5-minute setup guide
├── INSTALLATION.md               # Detailed installation
├── DEVELOPMENT.md                # Developer guide
├── BUILD_GUIDE.md                # Building & deployment
├── SECURITY.md                   # Security documentation
├── TESTING.md                    # Testing guide
├── TROUBLESHOOTING.md            # Help & support
├── ARCHITECTURE.md               # This file
├── CONTRIBUTING.md               # Contribution guide
├── STATUS.md                     # Project status
│
└── [Configuration files]
    - .gitkeep files for directories
```

## Component Relationships

```
App.js (Root)
├── LanguageProvider
│   ├── AuthProvider
│   │   └── RootNavigator
│   │       ├── LanguageSelectionScreen
│   │       ├── LoginScreen
│   │       └── AppStackNavigator (TabNavigator)
│   │           ├── HomeStackNavigator
│   │           │   ├── HomeScreen
│   │           │   ├── ShopListScreen
│   │           │   ├── SubscriptionScreen
│   │           │   └── MyShopsScreen
│   │           └── ProfileStackNavigator
│   │               ├── ProfileScreen
│   │               └── RegisterShopScreen
```

## Data Models

### User Model
```javascript
{
  id: string,              // Firebase UID
  name: string,
  phone: string,           // 10-digit Indian number
  role: "user|shop|admin",
  isSubscribed: boolean,
  planExpiry: timestamp,
  createdAt: timestamp,
  category: string,
  location: string
}
```

### Shop Model
```javascript
{
  id: string,
  ownerId: string,         // Reference to User
  name: string,
  category: string,
  location: string,
  phone: string,
  rating: number,
  isActive: boolean,       // Requires subscription
  isPremium: boolean,      // Top listing
  createdAt: timestamp,
  description: string
}
```

### Payment Model
```javascript
{
  id: string,
  userId: string,          // Reference to User
  amount: number,
  planId: string,
  status: "pending|success|failed",
  createdAt: timestamp,
  extId?: string           // Razorpay order ID
}
```

## State Management

### Local State (useState)
- Form inputs (phone, OTP, name)
- UI state (loading, error)
- List states (shops, filters)

### Context State (Global)
- **AuthContext**: User authentication, subscription status
- **LanguageContext**: App language preference

### Persistent State (AsyncStorage)
- User login session
- Language preference
- User profile data

## Lifecycle Flows

### App Startup
```
App Start
├── Check language preference
├── Load user session (if exists)
├── Initialize Firebase
├── Show appropriate screen
│   ├── If no language → LanguageSelectionScreen
│   ├── If no user → LoginScreen
│   └── If user exists → HomeScreen
└── Ready for user interaction
```

### User Registration
```
User Registration
├── Fill phone number
├── Verify OTP
├── Get logged in
├── Optionally register shop
├── Optionally subscribe
└── Access full features
```

## Performance Optimizations

### Code Splitting
- Screens loaded on-demand
- Components lazy-loaded
- Services separated from UI

### Data Optimization
- Pagination for lists
- Caching with AsyncStorage
- Lazy loading images
- Skeleton loading animations

### Rendering Optimization
- useCallback for function memos
- useMemo for expensive calculations
- FlatList for lists (not ScrollView)
- Avoid inline styles

## Security Layers

```
User Input
    ↓
Validation (client-side)
    ↓
Sanitization (remove harmful chars)
    ↓
Encryption (transit)
    ↓
Firebase Security Rules (backend)
    ↓
Secure Database Storage
```

## Integration Points

### Firebase
- Authentication: Phone OTP
- Firestore: Data persistence
- Cloud Functions: Payments, notifications

### External Services
- Razorpay: Payment processing
- Google Maps: Location services
- Analytics: User behavior tracking

## Scalability Considerations

### Horizontal Scaling
- Split into microservices
- Load balancing
- CDN for images

### Vertical Scaling
- Database indexing
- Query optimization
- Caching strategy

### Feature Scaling
- Admin panel
- Analytics dashboard
- Advanced search
- Real-time messaging

---

**Architecture Diagram Last Updated**: 2024-04-21  
**Framework**: React Native with Expo  
**Backend**: Firebase (Firestore + Auth + Cloud Functions)
