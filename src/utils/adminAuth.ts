/**
 * Admin Authentication Service
 * Secure authentication for admin panel using Firebase
 * 
 * @module utils/adminAuth
 * @version 1.0.0
 */

import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

// Admin user interface
export interface AdminUser {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
}

// Authentication state interface
export interface AuthState {
  user: AdminUser | null;
  isLoading: boolean;
  error: string | null;
}

// Admin credentials from environment variables
const ADMIN_EMAIL = import.meta.env.PUBLIC_ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = import.meta.env.PUBLIC_ADMIN_PASSWORD || 'Admin123';

/**
 * Sign in as admin
 * @param email - Admin email
 * @param password - Admin password
 * @returns Promise with user data or error
 */
export async function signInAdmin(email: string, password: string): Promise<{
  success: boolean;
  user?: AdminUser;
  error?: string;
}> {
  try {
    // First, check if credentials match the configured admin account
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return {
        success: false,
        error: 'Invalid admin credentials',
      };
    }

    // Sign in with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Create admin user object
    const adminUser: AdminUser = {
      id: userCredential.user.uid,
      email: userCredential.user.email || '',
      displayName: userCredential.user.displayName || 'Admin User',
      photoURL: userCredential.user.photoURL || '',
    };

    return {
      success: true,
      user: adminUser,
    };
  } catch (error: any) {
    console.error('[Auth] Sign in error:', error);
    return {
      success: false,
      error: error.message || 'Failed to sign in',
    };
  }
}

/**
 * Sign out current admin
 * @returns Promise with success status
 */
export async function signOutAdmin(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    await signOut(auth);
    return {
      success: true,
    };
  } catch (error: any) {
    console.error('[Auth] Sign out error:', error);
    return {
      success: false,
      error: error.message || 'Failed to sign out',
    };
  }
}

/**
 * Check if current user is authenticated as admin
 * @returns Promise with authentication status
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  return new Promise((resolve) => {
    let unsubscribeFunc: (() => void) | undefined;
    
    unsubscribeFunc = auth.onAuthStateChanged((user: any) => {
      if (unsubscribeFunc) {
        unsubscribeFunc();
      }
      
      // Check if user is authenticated and matches admin email
      const isAdmin = user && user.email === ADMIN_EMAIL;
      resolve(isAdmin as boolean);
    });
  });
}

/**
 * Get current admin user
 * @returns Promise with admin user data
 */
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  return new Promise((resolve) => {
    let unsubscribeFunc: (() => void) | undefined;
    
    unsubscribeFunc = onAuthStateChanged(auth, (user) => {
      if (unsubscribeFunc) {
        unsubscribeFunc();
      }
      
      if (user && user.email === ADMIN_EMAIL) {
        resolve({
          id: user.uid,
          email: user.email || '',
          displayName: user.displayName || 'Admin User',
          photoURL: user.photoURL || '',
        });
      } else {
        resolve(null);
      }
    });
  });
}

/**
 * Set up auth state listener
 * @param callback - Callback function to receive auth state changes
 * @returns Unsubscribe function
 */
export function onAdminAuthStateChange(callback: (user: AdminUser | null) => void) {
  return onAuthStateChanged(auth, (user) => {
    if (user && user.email === ADMIN_EMAIL) {
      const adminUser: AdminUser = {
        id: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'Admin User',
        photoURL: user.photoURL || '',
      };
      callback(adminUser);
    } else {
      callback(null);
    }
  });
}

/**
 * Check if user has admin permissions
 * @param user - Firebase user object
 * @returns Boolean indicating if user is admin
 */
export function isUserAdmin(user: any): boolean {
  return user && user.email === ADMIN_EMAIL;
}
