import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// User Roles
export const USER_ROLES = {
  CUSTOMER: 'customer',
  MANAGER: 'manager',
  OWNER: 'owner'
};

// Role Permissions
export const PERMISSIONS = {
  // Customer permissions
  VIEW_PRODUCTS: 'view_products',
  ADD_TO_CART: 'add_to_cart',
  CHECKOUT: 'checkout',
  VIEW_OWN_ORDERS: 'view_own_orders',
  MANAGE_WISHLIST: 'manage_wishlist',
  
  // Store Manager permissions
  VIEW_INCOME_EXPENSE: 'view_income_expense', // View income/expense lists
  VIEW_RECORDS: 'view_records', // View all records
  VIEW_CUSTOMER_INVOICES: 'view_customer_invoices', // View customer purchase invoices
  VIEW_ALL_ORDERS: 'view_all_orders',
  UPDATE_ORDER_STATUS: 'update_order_status',
  VIEW_INVENTORY: 'view_inventory',
  UPDATE_INVENTORY: 'update_inventory', // Adjust stock levels
  ADD_PRODUCTS: 'add_products',
  EDIT_PRODUCTS: 'edit_products',
  VIEW_CUSTOMERS: 'view_customers',
  
  // Store Owner permissions (Full access except inventory purchase)
  MANAGE_PRODUCTS: 'manage_products',
  DELETE_PRODUCTS: 'delete_products',
  MANAGE_USERS: 'manage_users',
  VIEW_ANALYTICS: 'view_analytics',
  VIEW_REVENUE_REPORTS: 'view_revenue_reports',
  MANAGE_SETTINGS: 'manage_settings',
  MANAGE_PROMOTIONS: 'manage_promotions',
  FULL_ACCESS: 'full_access',
  
  // Explicitly forbidden permissions
  PURCHASE_INVENTORY: 'purchase_inventory' // Neither Manager nor Owner can do this
};

// Role-based permissions mapping
const rolePermissions = {
  [USER_ROLES.CUSTOMER]: [
    PERMISSIONS.VIEW_PRODUCTS,
    PERMISSIONS.ADD_TO_CART,
    PERMISSIONS.CHECKOUT,
    PERMISSIONS.VIEW_OWN_ORDERS,
    PERMISSIONS.MANAGE_WISHLIST
  ],
  [USER_ROLES.MANAGER]: [
    // View permissions
    PERMISSIONS.VIEW_PRODUCTS,
    PERMISSIONS.VIEW_INCOME_EXPENSE,
    PERMISSIONS.VIEW_RECORDS,
    PERMISSIONS.VIEW_CUSTOMER_INVOICES,
    PERMISSIONS.VIEW_ALL_ORDERS,
    PERMISSIONS.VIEW_INVENTORY,
    PERMISSIONS.VIEW_CUSTOMERS,
    
    // Management permissions
    PERMISSIONS.UPDATE_ORDER_STATUS,
    PERMISSIONS.UPDATE_INVENTORY, // Can adjust stock levels
    PERMISSIONS.ADD_PRODUCTS,
    PERMISSIONS.EDIT_PRODUCTS,
    
    // Explicitly CANNOT:
    // - PURCHASE_INVENTORY
    // - DELETE_PRODUCTS
    // - MANAGE_USERS
    // - MANAGE_SETTINGS
    // - VIEW_ANALYTICS
  ],
  [USER_ROLES.OWNER]: [
    // Full access to everything except purchasing inventory
    PERMISSIONS.FULL_ACCESS,
    PERMISSIONS.VIEW_PRODUCTS,
    PERMISSIONS.VIEW_INCOME_EXPENSE,
    PERMISSIONS.VIEW_RECORDS,
    PERMISSIONS.VIEW_CUSTOMER_INVOICES,
    PERMISSIONS.VIEW_ALL_ORDERS,
    PERMISSIONS.VIEW_INVENTORY,
    PERMISSIONS.VIEW_CUSTOMERS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_REVENUE_REPORTS,
    
    PERMISSIONS.UPDATE_ORDER_STATUS,
    PERMISSIONS.UPDATE_INVENTORY,
    PERMISSIONS.ADD_PRODUCTS,
    PERMISSIONS.EDIT_PRODUCTS,
    PERMISSIONS.DELETE_PRODUCTS,
    PERMISSIONS.MANAGE_PRODUCTS,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_SETTINGS,
    PERMISSIONS.MANAGE_PROMOTIONS,
    
    // Explicitly CANNOT:
    // - PURCHASE_INVENTORY (Owner also cannot purchase inventory)
  ]
};

// Demo users for testing
const DEMO_USERS = {
  customer: {
    id: 1,
    username: 'customer@demo.com',
    password: 'customer123',
    role: USER_ROLES.CUSTOMER,
    name: 'John Customer',
    email: 'customer@demo.com'
  },
  manager: {
    id: 2,
    username: 'manager@demo.com',
    password: 'manager123',
    role: USER_ROLES.MANAGER,
    name: 'Sarah Manager',
    email: 'manager@demo.com'
  },
  owner: {
    id: 3,
    username: 'owner@demo.com',
    password: 'owner123',
    role: USER_ROLES.OWNER,
    name: 'Mike Owner',
    email: 'owner@demo.com'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('techmart_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (username, password) => {
    // Find matching demo user
    const foundUser = Object.values(DEMO_USERS).find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('techmart_user', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }

    return { success: false, message: 'Invalid credentials' };
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('techmart_user');
  };

  // Check if user has permission
  const hasPermission = (permission) => {
    if (!user) return false;
    const userPermissions = rolePermissions[user.role] || [];
    return userPermissions.includes(permission) || userPermissions.includes(PERMISSIONS.FULL_ACCESS);
  };

  // Check if user has role
  const hasRole = (role) => {
    if (!user) return false;
    return user.role === role;
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    hasPermission,
    hasRole,
    USER_ROLES,
    PERMISSIONS,
    DEMO_USERS
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
