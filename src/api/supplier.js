/**
 * @file api/supplier.js
 * @description Supplier onboarding API. All endpoints require authentication.
 *
 * Endpoints:
 *   POST /suppliers/apply              — submit application
 *   GET  /suppliers/application/status — poll application status
 *
 * @see pages/SupplierRegisterPage.jsx, components/supplier/SupplierApplicationForm.jsx
 */
import { apiRequest } from '@/api/client';

/**
 * Submit a supplier application.
 * Requires authentication.
 */
export async function applyAsSupplier(payload) {
  return apiRequest('/suppliers/apply', {
    method: 'POST',
    body: payload,
    auth: true,
  });
}

/**
 * Get current user's supplier application status.
 * Requires authentication.
 */
export async function getSupplierApplicationStatus() {
  return apiRequest('/suppliers/application/status', {
    method: 'GET',
    auth: true,
  });
}
