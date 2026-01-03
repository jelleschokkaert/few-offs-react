import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  ChevronRight,
  Truck,
  Clock,
  CheckCircle,
  Plus,
  Edit,
} from "lucide-react";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import Breadcrumbs from "../components/UI/Breadcrumbs";

const LoginForm = ({ onSwitch, onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="auth-form-container">
      <div className="auth-header">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to your account</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-input-group">
          <label className="auth-label">Email</label>
          <div className="auth-input-wrapper">
            <Mail size={18} className="auth-input-icon" />
            <input
              type="email"
              className="auth-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="auth-input-group">
          <label className="auth-label">Password</label>
          <div className="auth-input-wrapper">
            <Lock size={18} className="auth-input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              className="auth-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="auth-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="auth-options">
          <label className="auth-checkbox-label">
            <input type="checkbox" className="auth-checkbox" />
            <span>Remember me</span>
          </label>
          <a href="#" className="auth-forgot-link">
            Forgot password?
          </a>
        </div>

        <button type="submit" className="auth-submit-btn">
          Sign In
        </button>

        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        <button type="button" className="auth-social-btn">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>
      </form>

      <p className="auth-switch-text">
        Don't have an account?{" "}
        <button className="auth-switch-btn" onClick={onSwitch}>
          Sign up
        </button>
      </p>
    </div>
  );
};

const RegisterForm = ({ onSwitch, onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="auth-form-container">
      <div className="auth-header">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join us and start shopping</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-input-group">
          <label className="auth-label">Full Name</label>
          <div className="auth-input-wrapper">
            <User size={18} className="auth-input-icon" />
            <input
              type="text"
              className="auth-input"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
        </div>

        <div className="auth-input-group">
          <label className="auth-label">Email</label>
          <div className="auth-input-wrapper">
            <Mail size={18} className="auth-input-icon" />
            <input
              type="email"
              className="auth-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>

        <div className="auth-input-group">
          <label className="auth-label">Password</label>
          <div className="auth-input-wrapper">
            <Lock size={18} className="auth-input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              className="auth-input"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              className="auth-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <label className="auth-checkbox-label auth-terms">
          <input type="checkbox" className="auth-checkbox" />
          <span>
            I agree to the <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>
          </span>
        </label>

        <button type="submit" className="auth-submit-btn">
          Create Account
        </button>

        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        <button type="button" className="auth-social-btn">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>
      </form>

      <p className="auth-switch-text">
        Already have an account?{" "}
        <button className="auth-switch-btn" onClick={onSwitch}>
          Sign in
        </button>
      </p>
    </div>
  );
};

const ProfileDashboard = ({ onLogout }) => {
  const menuItems = [
    {
      icon: Package,
      label: "My Orders",
      description: "Track and manage your orders",
      count: 3,
      link: "/account/orders",
    },
    {
      icon: Heart,
      label: "Wishlist",
      description: "Items you've saved",
      count: 12,
      link: "/wishlist",
    },
    {
      icon: MapPin,
      label: "Addresses",
      description: "Manage delivery addresses",
      link: "/account/addresses",
    },
    {
      icon: CreditCard,
      label: "Payment Methods",
      description: "Saved cards and payment options",
      link: "/account/payment",
    },
    {
      icon: Settings,
      label: "Account Settings",
      description: "Update your profile and preferences",
      link: "/account/settings",
    },
  ];

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <User size={32} />
        </div>
        <div className="profile-info">
          <h1 className="profile-name">John Doe</h1>
          <p className="profile-email">john.doe@example.com</p>
        </div>
      </div>

      <div className="profile-menu">
        {menuItems.map((item, index) => (
          <Link to={item.link || "#"} key={index} className="profile-menu-item">
            <div className="profile-menu-icon">
              <item.icon size={22} />
            </div>
            <div className="profile-menu-content">
              <span className="profile-menu-label">{item.label}</span>
              <span className="profile-menu-description">
                {item.description}
              </span>
            </div>
            <div className="profile-menu-right">
              {item.count && (
                <span className="profile-menu-count">{item.count}</span>
              )}
              <ChevronRight size={18} className="profile-menu-arrow" />
            </div>
          </Link>
        ))}
      </div>

      <button className="profile-logout-btn" onClick={onLogout}>
        <LogOut size={16} />
        Sign Out
      </button>
    </div>
  );
};

const AccountSubPage = ({ title, icon, children }) => {
  const navigate = useNavigate();
  const Icon = icon;

  return (
    <div className="account-subpage">
      <button className="account-back-btn" onClick={() => navigate("/account")}>
        <ArrowLeft size={20} />
        <span>Back to Account</span>
      </button>
      <div className="account-subpage-header">
        <div className="account-subpage-icon">
          <Icon size={28} />
        </div>
        <h1 className="account-subpage-title">{title}</h1>
      </div>
      <div className="account-subpage-content">{children}</div>
    </div>
  );
};

const OrdersPage = () => {
  const orders = [
    {
      id: "ORD-2024-001",
      date: "Jan 15, 2024",
      status: "Delivered",
      total: "€299.00",
      items: 3,
    },
    {
      id: "ORD-2024-002",
      date: "Jan 28, 2024",
      status: "In Transit",
      total: "€159.00",
      items: 2,
    },
    {
      id: "ORD-2024-003",
      date: "Feb 5, 2024",
      status: "Processing",
      total: "€89.00",
      items: 1,
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle size={16} />;
      case "In Transit":
        return <Truck size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  return (
    <AccountSubPage title="My Orders" icon={Package}>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-card-header">
              <span className="order-id">{order.id}</span>
              <span
                className={`order-status order-status--${order.status.toLowerCase().replace(" ", "-")}`}
              >
                {getStatusIcon(order.status)}
                {order.status}
              </span>
            </div>
            <div className="order-card-details">
              <span className="order-date">{order.date}</span>
              <span className="order-items">{order.items} items</span>
              <span className="order-total">{order.total}</span>
            </div>
          </div>
        ))}
      </div>
    </AccountSubPage>
  );
};

const AddressesPage = () => {
  const addresses = [
    {
      id: 1,
      name: "Home",
      street: "123 Main Street",
      city: "Amsterdam",
      postal: "1012 AB",
      country: "Netherlands",
      isDefault: true,
    },
    {
      id: 2,
      name: "Work",
      street: "456 Business Ave",
      city: "Rotterdam",
      postal: "3011 CD",
      country: "Netherlands",
      isDefault: false,
    },
  ];

  return (
    <AccountSubPage title="Addresses" icon={MapPin}>
      <div className="addresses-grid">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`address-card ${address.isDefault ? "address-card--default" : ""}`}
          >
            {address.isDefault && (
              <span className="address-default-badge">Default</span>
            )}
            <h3 className="address-name">{address.name}</h3>
            <p className="address-details">
              {address.street}
              <br />
              {address.postal} {address.city}
              <br />
              {address.country}
            </p>
            <button className="address-edit-btn">
              <Edit size={16} />
              Edit
            </button>
          </div>
        ))}
        <button className="address-card address-card--add">
          <Plus size={32} />
          <span>Add New Address</span>
        </button>
      </div>
    </AccountSubPage>
  );
};

const PaymentPage = () => {
  const cards = [
    { id: 1, type: "Visa", last4: "4242", expiry: "12/25", isDefault: true },
    {
      id: 2,
      type: "Mastercard",
      last4: "8888",
      expiry: "06/26",
      isDefault: false,
    },
  ];

  return (
    <AccountSubPage title="Payment Methods" icon={CreditCard}>
      <div className="payment-list">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`payment-card ${card.isDefault ? "payment-card--default" : ""}`}
          >
            <div className="payment-card-info">
              <span className="payment-card-type">{card.type}</span>
              <span className="payment-card-number">
                •••• •••• •••• {card.last4}
              </span>
              <span className="payment-card-expiry">Expires {card.expiry}</span>
            </div>
            {card.isDefault && (
              <span className="payment-default-badge">Default</span>
            )}
          </div>
        ))}
        <button className="payment-add-btn">
          <Plus size={20} />
          Add Payment Method
        </button>
      </div>
    </AccountSubPage>
  );
};

const SettingsPage = () => {
  return (
    <AccountSubPage title="Account Settings" icon={Settings}>
      <div className="settings-sections">
        <div className="settings-section">
          <h3 className="settings-section-title">Personal Information</h3>
          <div className="settings-form">
            <div className="settings-field">
              <label>Full Name</label>
              <input type="text" defaultValue="John Doe" />
            </div>
            <div className="settings-field">
              <label>Email</label>
              <input type="email" defaultValue="john.doe@example.com" />
            </div>
            <div className="settings-field">
              <label>Phone</label>
              <input type="tel" defaultValue="+31 6 12345678" />
            </div>
          </div>
        </div>
        <div className="settings-section">
          <h3 className="settings-section-title">Password</h3>
          <button className="settings-change-btn">Change Password</button>
        </div>
        <div className="settings-section">
          <h3 className="settings-section-title">Preferences</h3>
          <label className="settings-checkbox">
            <input type="checkbox" defaultChecked />
            <span>Email notifications for orders</span>
          </label>
          <label className="settings-checkbox">
            <input type="checkbox" defaultChecked />
            <span>Newsletter and promotions</span>
          </label>
        </div>
        <button className="settings-save-btn">Save Changes</button>
      </div>
    </AccountSubPage>
  );
};

const AccountPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <>
      <Navbar />
      <div className="account-page">
        <div className="container">
          <Breadcrumbs />

          <div className="account-content">
            {isLoggedIn ? (
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProfileDashboard onLogout={() => setIsLoggedIn(false)} />
                  }
                />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/addresses" element={<AddressesPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            ) : isLoginView ? (
              <LoginForm
                onSwitch={() => setIsLoginView(false)}
                onLogin={() => setIsLoggedIn(true)}
              />
            ) : (
              <RegisterForm
                onSwitch={() => setIsLoginView(true)}
                onLogin={() => setIsLoggedIn(true)}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccountPage;
