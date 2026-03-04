# 💳 Novyra Souq

A modern e-commerce storefront built with **Next.js 16**, **React 19**, and **TypeScript**.

Novyra Souq delivers a complete online shopping experience: secure authentication, smooth product discovery, cart and wishlist management, checkout flows, order tracking, and polished UI interactions.

🔗 **Live Demo:** https://novyra-souq.vercel.app/

---

## ✨ Project Highlights

- **Full shopping lifecycle** from browsing to checkout and order history.
- **Secure authentication system** with NextAuth and JWT-based sessions.
- **Scalable frontend structure** using services + server actions + reusable components.
- **Modern, responsive UI** with dark/light mode support and smooth animations.
- **Type-safe forms and validation** using React Hook Form + Zod.
- **Smart state management** with both **TanStack Query** and **React Context**.
- **Reusable custom hooks** to keep logic clean and maintainable.

---

## 🧠 Core Features

### 1) Authentication & Account
- Register and login flows.
- Forgot password flow:
  - Send reset code,
  - Verify OTP,
  - Set new password.
- Persistent user sessions with NextAuth.

### 2) Product Discovery
- Animated landing page with brand identity.
- Products listing page.
- Product details page.
- Categories listing and category-specific products.
- Brands listing and brand-specific products.

### 3) Cart, Wishlist & Checkout
- Add to cart / remove from cart / update quantity.
- Clear all cart items.
- Add to wishlist / remove from wishlist.
- Checkout with shipping address.
- Supports:
  - Cash order flow,
  - Online checkout session flow.

### 4) Profile, Addresses & Orders
- Update profile information.
- Change account password.
- Add, list, and remove saved addresses.
- View user order history.

### 5) Reviews
- Display product reviews.
- Create, edit, and delete reviews.

### 6) UX Quality
- Mobile-friendly responsive navigation.
- Clean empty states for cart and wishlist.
- Toast notifications for user actions.
- Consistent reusable UI component patterns.

---

## 🏗️ Tech Stack

### Frontend
- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**

### UI & Styling
- **Tailwind CSS 4**
- **Radix UI**
- **Framer Motion**
- **Lucide React**
- **Sonner**

### Data, Auth & Validation
- **NextAuth**
- **TanStack Query**
- **React Context API**
- **Custom Hooks**
- **React Hook Form**
- **Zod**

---

## 📁 Project Structure

```text
src/
  app/
    (auth)/                 # login/register/password reset pages
    (pages)/                # products, cart, wishlist, profile, checkout, orders
    api/auth/[...nextauth]/ # NextAuth route handler
  actions/                  # Server actions (cart, wishlist, orders, profile, reviews)
  services/                 # API service layer
  components/
    common/                 # Navbar, Footer, global providers
    cart/                   # Cart UI components
    wishlist/               # Wishlist UI components
    reviews/                # Reviews UI components
    ui/                     # Reusable UI system components
  context/                  # Global context (cart count and shared state)
  hooks/                    # Custom hooks (example: useCart)
  lib/
    nextAuth/               # Auth configuration and token helpers
    schema/                 # Zod schemas
```

---

## 🌟 What Makes Novyra Souq Special

- Clean architecture with clear separation of responsibilities.
- Production-style patterns for auth, state, and API handling.
- Strong user-focused details in animations, transitions, and feedback.
- Built to be easy to extend with more store features.

---

## 👨‍💻 Developer
Eng.Diaa Eldeen 

Mern-Stack Developer
