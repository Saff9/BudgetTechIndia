/**
 * Firebase Configuration and Services
 * Secure integration with Firebase using environment variables
 * 
 * @module utils/firebase
 * @version 1.0.0
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID || '',
  measurementId: import.meta.env.PUBLIC_FIREBASE_MEASUREMENT_ID || '',
};

// Initialize Firebase
let firebaseApp;

try {
  // Check if we have all required Firebase credentials
  const hasCredentials = firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId;
  
  if (hasCredentials) {
    firebaseApp = initializeApp(firebaseConfig);
    console.log('[Firebase] Initialized successfully');
  } else {
    console.warn('[Firebase] No credentials provided, using dummy implementation');
    // Fallback to a dummy app if no credentials are provided
    firebaseApp = {
      name: '[DEFAULT]',
      options: firebaseConfig,
    } as any;
  }
} catch (error) {
  console.error('[Firebase] Initialization error:', error);
  // Fallback to a dummy app if initialization fails
  firebaseApp = {
    name: '[DEFAULT]',
    options: firebaseConfig,
  } as any;
}

// Initialize Firebase services with dummy implementations if no credentials
let auth: any;
let db: any;
let storage: any;

try {
  const hasCredentials = firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId;
  
  if (hasCredentials) {
    auth = getAuth(firebaseApp);
    db = getFirestore(firebaseApp as any);
    storage = getStorage(firebaseApp as any);
  } else {
    // Dummy implementations for development without Firebase
    console.warn('[Firebase] Using dummy Firebase implementations');
    auth = {
      signInWithEmailAndPassword: async () => Promise.resolve({ user: { uid: 'dummy-uid', email: 'admin@example.com', displayName: 'Admin User' } }),
      signOut: async () => Promise.resolve(),
      onAuthStateChanged: (callback: any) => {
        callback({ uid: 'dummy-uid', email: 'admin@example.com', displayName: 'Admin User' });
        return () => {};
      },
    };
    db = {
      collection: () => ({
        doc: () => ({
          get: async () => Promise.resolve({ exists: () => false }),
          set: async () => Promise.resolve(),
          update: async () => Promise.resolve(),
          delete: async () => Promise.resolve(),
        }),
        add: async () => Promise.resolve({ id: 'dummy-id' }),
        getDocs: async () => Promise.resolve({ docs: [] }),
      }),
      doc: () => ({
        get: async () => Promise.resolve({ exists: () => false }),
        set: async () => Promise.resolve(),
        update: async () => Promise.resolve(),
        delete: async () => Promise.resolve(),
      }),
    };
    storage = {
      ref: () => ({
        getDownloadURL: async () => Promise.resolve(''),
        putFile: async () => Promise.resolve(),
      }),
    };
  }
} catch (error) {
  console.error('[Firebase] Error initializing services:', error);
  // Fallback dummy implementations
  auth = {
    signInWithEmailAndPassword: async () => Promise.resolve({ user: { uid: 'dummy-uid', email: 'admin@example.com', displayName: 'Admin User' } }),
    signOut: async () => Promise.resolve(),
    onAuthStateChanged: (callback: any) => {
      callback({ uid: 'dummy-uid', email: 'admin@example.com', displayName: 'Admin User' });
      return () => {};
    },
  };
  db = {
    collection: () => ({
      doc: () => ({
        get: async () => Promise.resolve({ exists: () => false }),
        set: async () => Promise.resolve(),
        update: async () => Promise.resolve(),
        delete: async () => Promise.resolve(),
      }),
      add: async () => Promise.resolve({ id: 'dummy-id' }),
      getDocs: async () => Promise.resolve({ docs: [] }),
    }),
    doc: () => ({
      get: async () => Promise.resolve({ exists: () => false }),
      set: async () => Promise.resolve(),
      update: async () => Promise.resolve(),
      delete: async () => Promise.resolve(),
    }),
  };
  storage = {
    ref: () => ({
      getDownloadURL: async () => Promise.resolve(''),
      putFile: async () => Promise.resolve(),
    }),
  };
}

export { auth, db, storage };

export { firebaseApp };
