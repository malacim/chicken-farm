# HlaChick Platform: Technical Specifications & Implementation Guide

## 1. Project Overview

**HlaChick** is a digital platform connecting investors with poultry farmers in rural areas. The platform facilitates investment in egg-laying hens and chicks through a transparent, AI-driven ecosystem that calculates returns, manages risk, and creates a marketplace for poultry products.

### Core Components

1. **BaidCash**: Investment system for egg-laying hens rental
2. **KtiCash**: Investment system for chicks
3. **MyFarm**: Farmer dashboard
4. **InvestFarm**: Investor dashboard
5. **MarketChick**: Marketplace for poultry products
6. **ChickAdmin**: Admin control panel

## 2. User Roles & Access Rights

- **Visitors**: View public pages and registration instructions
- **Investors**: Select investment packages, track profits, request withdrawals
- **Farmers**: Register poultry flocks, make payments, view payment schedules
- **Market Buyers**: Browse MarketChick products, place purchase orders
- **Administrators**: Manage users, review investments, manage marketplace, create reports

## 3. User Registration & Authentication

### 3.1 Farmer Registration

1. **Personal Information Collection**
   - Full name
   - Phone number
   - Email address
   - Farm location (City/Province/Village + GPS button)

2. **Flock Information**
   - Type of poultry (laying hens/chicks/both)
   - Current number of poultry
   - Available sections for breeding
   - Vaccination program status
   - Azolla plant availability (cost-reduction feed supplement)

3. **Document Upload**
   - Two personal photos
   - ID card image (PNG/JPG ≤2 MB)

4. **Terms Agreement**
   - Commitment to maintain healthy flock
   - Farm located in rural area
   - Regular vaccination program
   - Use of Azolla plant or alternative feed cost reduction system
   - Agreement to AI monitoring and field visits

5. **Verification Process**
   - Application submitted for review
   - Field verification by HlaChick representative
   - Account activation after verification

### 3.2 Investor Registration

1. **Personal Information**
   - Full name
   - Mobile phone number
   - Email address
   - Country (dropdown preferred)

2. **Investment Preferences**
   - Preferred investment type (BaidCash/KtiCash/both)
   - Initial investment amount (numerical field - in dirhams)

3. **Terms Agreement**
   - Checkbox confirming terms and conditions review

4. **Communication Preferences**
   - WhatsApp
   - Email
   - Phone call

5. **Security**
   - Password creation
   - Password confirmation

6. **Post-Registration**
   - Welcome message sent via preferred communication channel
   - Notification: "Registration successful. Your account will be activated after administrative review."

## 4. Investment Packages & Insurance Fund

### 4.1 BaidCash (Laying Hen Rental)

- **Unit price**: 15 dirhams/hen/month
- **Duration options**: 60, 90, 180, 365 days
- **Profit percentage**: 15-30% (calculated at end of cycle)
- **Insurance fund fee**: 2.5% of investment value

### 4.2 KtiCash (Chick Investment)

- **0-day package** (45-day cycle): 10 dirhams/chick, 15% profit
- **7-day package** (90-day cycle): 15 dirhams/chick, 20% profit
- **21-day package** (180-day cycle): 22 dirhams/chick, 25% profit (30% for >500 units)
- **Insurance fund fee**: 2.5% of investment value

### 4.3 Insurance Fund

1. **Initial Contributions**
   - **Investor**: One-time mandatory insurance: 180-280 dirhams + 2.5% of subsequent investments
   - **Farmer**: Mandatory contribution: 280-380 dirhams + 2.5% of profits
   - **Platform**: 1% of monthly profits

2. **Coverage**
   - Fatal diseases and natural disasters
   - 70% of capital compensation (without profits)
   - Verification through video/photos and veterinary certificate when possible

3. **Claim Process**
   - Immediate reporting by farmer
   - Documentation submission (video, photos, reports)
   - Review and verification
   - Compensation calculation and disbursement

## 5. Implementation Phases

### Phase 1: Farmer Registration & Account Activation

1. **Registration Form**
   - Implement registration form with all required fields
   - Create verification process workflow

2. **MyFarm Dashboard Setup**
   - Farm information management
   - Flock tracking
   - Insurance contribution tracking

### Phase 2: Investor Registration & Account Activation

1. **Registration System**
   - Implement registration form with all required fields
   - Create email/phone verification system
   - Design account activation workflow

2. **InvestFarm Dashboard Preparation**
   - Initial dashboard layout
   - Account status display

### Phase 3: Investment Packages Deployment

1. **BaidCash Implementation**
   - Package selection interface
   - Investment calculator
   - Profit projection system

2. **KtiCash Implementation**
   - Package selection interface
   - Investment calculator
   - Profit projection system

3. **Manual Payment Instructions**
   - Bank transfer details display
   - Payment confirmation mechanism

### Phase 4: Investment Process Flow

1. **Package Selection Interface**
   - Display available packages with details
   - Show unit prices, durations, and profit percentages

2. **Investment Calculation System**
   - Quantity selection
   - Total capital calculation
   - Insurance fee calculation
   - Platform commission estimation
   - Total payment amount display

3. **Payment Process**
   - Manual payment instructions
   - Payment confirmation button
   - Admin notification system

4. **Investment Activation**
   - Status tracking (PENDING_PAYMENT → ACTIVE)
   - Admin verification interface
   - Automatic status updates

5. **Investment Tracking Dashboard**
   - Progress bar showing elapsed days
   - Daily/weekly/monthly profit calculations
   - Notifications for approaching end of cycle

### Phase 5: Cycle Completion & Withdrawal

1. **Automatic Cycle Completion**
   - Status change from ACTIVE to COMPLETED at endDate
   - Notification system for completed investments

2. **Withdrawal Request System**
   - Withdrawal request form
   - Bank account/payment method confirmation
   - Admin notification system

3. **Final Amount Calculation**
   - Original capital + agreed profit percentage
   - Platform commission deduction (5-10%)
   - Net amount calculation

4. **Insurance Fund Integration**
   - Check for compensation eligibility
   - Document verification system
   - Compensation calculation if applicable

5. **Payment Processing**
   - Admin verification interface
   - Status updates (PENDING_WITHDRAWAL → APPROVED/REJECTED)
   - Payment execution system
   - Confirmation notification

6. **Transaction Documentation**
   - Complete transaction record
   - Investment details, insurance, withdrawal request, transfer order
   - Transaction history access for investors and admins

### Phase 6: MarketChick Implementation

1. **Product Listing Interface**
   - Product categories
   - Search and filter options
   - Product cards with images

2. **Product Detail Pages**
   - Images, descriptions, seller info
   - Ratings and reviews
   - Purchase request button

3. **Seller Dashboard**
   - Product CRUD operations
   - Order management
   - Vaccination record (optional)

## 6. Technical Requirements

### 6.1 Database Structure

**Main Tables**:
- Users (investor/farmer/admin)
- Investments (BaidCash/KtiCash)
- Farms
- Transactions
- InsuranceFund
- Products
- Orders
- Notifications

### 6.2 User Interfaces

**General Requirements**:
- Full RTL support for Arabic
- Main colors: natural green, farm beige, lemon/gold details
- Shared components: Navbar, Sidebar, Info Cards, Progress Bars, Tables, Modals

**MyFarm**:
- Dashboard: Flock statistics, rental/investment percentage, payment alerts
- Forms: Add/edit hens and chicks
- Payments: Weekly payment schedule and status bar

**InvestFarm**:
- Dashboard: Total investment, accumulated profits (daily/weekly/monthly), cycle progress
- Packages: Selection between BaidCash and KtiCash, unit quantity input
- Withdrawal: "Request withdrawal" button after cycle completion

**MarketChick**:
- List: Product display page, filtering by type, price, and location
- Detail: Images, description, seller, ratings, purchase request
- Seller: CRUD for products, order table, vaccination record (optional)

**ChickAdmin**:
- Dashboard: Overview (users, investments, marketplace, reports)
- Users: Activate/suspend/ban investors and farmers
- Investments & Insurance: Review BaidCash/KtiCash cycles, insurance claims
- Market: Activate/reject products, manage ratings
- Settings: Edit percentages and contracts, export PDF/CSV reports

### 6.3 API Endpoints

RESTful endpoints for each entity:
- `POST /api/auth/signup, POST /api/auth/login`
- `GET/POST /api/farmers, GET/PUT /api/farmers/:id`
- `GET/POST /api/investors, POST /api/investments`
- `GET/POST /api/transactions, GET /api/insurance/claims`
- `GET/POST /api/products, POST /api/orders`
- `GET/POST /api/admin/*`, etc.

### 6.4 AI Integration

Backend implementation via lightweight library (Python or Node.js):
- Calculate BaidCash/KtiCash profits and accumulation over periods (daily/weekly/monthly)
- Track farmer payments and delay hours → send alerts
- Manage insurance fund: calculate contributions and automatic compensation according to rules
- Use scheduled tasks (CRON/JOB Scheduler) for periodic updates

### 6.5 Security Requirements

- Password encryption (bcrypt)
- API protection (JWT)
- SSL for all communications
- Back-office roles & permissions
- Logging & audit trail for all financial operations

## 7. Development Roadmap

1. **Database Design** - Create schema and relationships
2. **API Development** - Implement backend endpoints
3. **Authentication System** - User registration and login flows
4. **MyFarm & InvestFarm** - Core dashboards development
5. **Investment Packages** - Calculation and processing systems
6. **Insurance Fund** - Contribution and claim handling
7. **MarketChick** - Marketplace functionality
8. **ChickAdmin** - Administrative tools
9. **AI Integration** - Profit calculations and alerts
10. **Testing & Deployment** - Quality assurance and launch

## 8. Terms & Conditions Documents

Separate documents should be prepared for:
1. Farmer Registration Terms
2. Investor Registration Terms
3. Insurance Fund Conditions
4. MarketChick Usage Terms

Each document should detail the specific obligations, rights, and responsibilities of the respective parties engaging with the platform.
