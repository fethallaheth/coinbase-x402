import fs from 'fs';
import path from 'path';

// Simple in-memory storage for demo (use a real database in production)
let appStats = {
  totalRevenue: 0,
  transactionCount: 0,
  uniqueUsers: new Set(),
  lastUpdated: new Date()
};

// Load stats from file if exists
const statsFile = path.join(process.cwd(), 'data', 'stats.json');

function loadStats() {
  try {
    if (fs.existsSync(statsFile)) {
      const data = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
      appStats = {
        ...data,
        uniqueUsers: new Set(data.uniqueUsers || []),
        lastUpdated: new Date(data.lastUpdated)
      };
    }
  } catch (error) {
    console.log('Stats file not found, starting with defaults');
  }
}

function saveStats() {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(statsFile);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const dataToSave = {
      ...appStats,
      totalRevenue: Math.round(appStats.totalRevenue * 100) / 100, // Ensure clean decimal
      uniqueUsers: Array.from(appStats.uniqueUsers),
      lastUpdated: appStats.lastUpdated.toISOString()
    };
    
    fs.writeFileSync(statsFile, JSON.stringify(dataToSave, null, 2));
  } catch (error) {
    console.error('Failed to save stats:', error);
  }
}

export function recordTransaction(amount, userAddress = null) {
  // Convert amount from string like "$0.10" to number
  const numericAmount = parseFloat(amount.replace('$', ''));
  
  // Use proper decimal arithmetic to avoid floating point errors
  appStats.totalRevenue = Math.round((appStats.totalRevenue + numericAmount) * 100) / 100;
  appStats.transactionCount += 1;
  
  if (userAddress) {
    appStats.uniqueUsers.add(userAddress);
  }
  
  appStats.lastUpdated = new Date();
  saveStats();
  
  console.log(`Transaction recorded: $${numericAmount}, Total: $${appStats.totalRevenue.toFixed(2)}`);
}

export function getStats() {
  loadStats();
  
  return {
    totalRevenue: appStats.totalRevenue.toFixed(2),
    transactionCount: appStats.transactionCount,
    uniqueUsers: appStats.uniqueUsers.size,
    lastUpdated: appStats.lastUpdated.toISOString(),
    avgTransactionValue: appStats.transactionCount > 0 
      ? (appStats.totalRevenue / appStats.transactionCount).toFixed(2)
      : '0.00'
  };
}

// Initialize stats on import
loadStats();