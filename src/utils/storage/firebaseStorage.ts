/**
 * Firebase Storage Stub (Replaced by Neon DB)
 */

import { NeonDbStorage } from './neondbStorage';

export class FirebaseStorage extends NeonDbStorage {
  getStorageInfo() {
    return {
      type: 'neondb',
      name: 'Neon DB (PostgreSQL Serverless)',
      description: 'Serverless PostgreSQL Database with 7-Day Automated Auto-Purge Content Rotation',
      isConfigured: true,
      lastSync: new Date(),
    };
  }
}
