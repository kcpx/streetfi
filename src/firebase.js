// Firebase Configuration and Setup
// This file connects your app to Firebase

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

// Your Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyCdSWOJEXBQufNccUhu8R-p-oMbsfmEkWg",
  authDomain: "leverfinance-f8b0a.firebaseapp.com",
  projectId: "leverfinance-f8b0a",
  storageBucket: "leverfinance-f8b0a.firebasestorage.app",
  messagingSenderId: "821829561521",
  appId: "1:821829561521:web:60cfeea167453a9458c690",
  measurementId: "G-BZJBK1ZE0Y"
};

// Initialize Firebase (this starts up Firebase in your app)
const app = initializeApp(firebaseConfig);

// Get Firebase services
export const auth = getAuth(app); // For login/signup
export const db = getFirestore(app); // For saving data

// AUTH FUNCTIONS - These are the functions you'll use in your app

/**
 * Sign up a new user
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise} - Returns user data or error
 */
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Log in an existing user
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise} - Returns user data or error
 */
export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Log out the current user
 * @returns {Promise} - Returns success or error
 */
export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Check if a user is logged in (runs automatically)
 * @param {function} callback - Function to run when auth state changes
 * @returns {function} - Unsubscribe function
 */
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// DATABASE FUNCTIONS - For saving calculator results and user data

/**
 * Save a calculator result to the database
 * @param {string} userId - The user's ID
 * @param {string} calculatorType - Type of calculator (e.g., 'leverage-trading')
 * @param {object} inputs - The inputs user entered
 * @param {object} results - The calculated results
 * @returns {Promise} - Returns success or error
 */
export const saveCalculation = async (userId, calculatorType, inputs, results) => {
  try {
    const docRef = await addDoc(collection(db, 'calculations'), {
      userId: userId,
      calculatorType: calculatorType,
      inputs: inputs,
      results: results,
      timestamp: new Date().toISOString(),
      createdAt: new Date()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Get all saved calculations for a user
 * @param {string} userId - The user's ID
 * @param {number} maxResults - Maximum number of results to return (default 20)
 * @returns {Promise} - Returns array of calculations or error
 */
export const getUserCalculations = async (userId, maxResults = 20) => {
  try {
    const q = query(
      collection(db, 'calculations'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(maxResults)
    );
    
    const querySnapshot = await getDocs(q);
    const calculations = [];
    querySnapshot.forEach((doc) => {
      calculations.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, calculations: calculations };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Save quiz results to the database
 * @param {string} userId - The user's ID
 * @param {object} quizAnswers - The user's quiz answers
 * @param {object} riskProfile - The calculated risk profile
 * @returns {Promise} - Returns success or error
 */
export const saveQuizResults = async (userId, quizAnswers, riskProfile) => {
  try {
    const docRef = await addDoc(collection(db, 'quizResults'), {
      userId: userId,
      answers: quizAnswers,
      riskProfile: riskProfile,
      timestamp: new Date().toISOString(),
      createdAt: new Date()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default app;
