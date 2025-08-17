#!/usr/bin/env node

/**
 * Test script for the Supabase Auth Proxy
 * Run with: node scripts/test-auth-proxy.js
 */

const https = require('https');
const http = require('http');

// Configuration
const config = {
  development: {
    auth: 'http://localhost:3000',
    app: 'http://localhost:3000',
  },
  production: {
    auth: 'https://auth.aahrbitx.in',
    app: 'https://app.aahrbitx.in',
  }
};

const environment = process.env.NODE_ENV || 'development';
const urls = config[environment];

console.log(`🧪 Testing Auth Proxy for ${environment} environment`);
console.log(`📍 Auth URL: ${urls.auth}`);
console.log(`📍 App URL: ${urls.app}`);
console.log('');

// Test functions
async function testApiEndpoint(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(`${url}/api/verify?token=test&type=signup`, (res) => {
      console.log(`✅ API Endpoint Test: ${res.statusCode} ${res.statusMessage}`);
      resolve(res.statusCode);
    }).on('error', (err) => {
      console.log(`❌ API Endpoint Test: ${err.message}`);
      resolve(null);
    });
  });
}

async function testErrorPage(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(`${url}/auth/verification-error`, (res) => {
      console.log(`✅ Error Page Test: ${res.statusCode} ${res.statusMessage}`);
      resolve(res.statusCode);
    }).on('error', (err) => {
      console.log(`❌ Error Page Test: ${err.message}`);
      resolve(null);
    });
  });
}

async function runTests() {
  console.log('🚀 Starting tests...\n');
  
  // Test API endpoint
  console.log('1️⃣ Testing API endpoint...');
  await testApiEndpoint(urls.auth);
  
  // Test error page
  console.log('\n2️⃣ Testing error page...');
  await testErrorPage(urls.app);
  
  console.log('\n✨ Tests completed!');
  console.log('\n📋 Next steps:');
  console.log('1. Set up DNS records for auth.aahrbitx.in');
  console.log('2. Deploy to production');
  console.log('3. Test with real signup flow');
  console.log('4. Verify emails contain your domain');
}

// Run tests
runTests().catch(console.error);
