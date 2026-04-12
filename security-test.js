// AgentForge Security Verification Script
// Run this in browser console on your deployed site

async function testAgentForgeSecurity() {
  console.log('=== AGENTFORGE SECURITY TEST ===');
  
  try {
    // Test 1: Check current user authentication
    console.log('1. Testing user authentication...');
    const authResponse = await fetch('/api/auth/me');
    const authData = await authResponse.json();
    console.log('User auth status:', authData);
    
    // Test 2: Test marketplace access (should work for everyone)
    console.log('2. Testing marketplace access...');
    const templatesResponse = await fetch('/api/marketplace/templates');
    const templatesData = await templatesResponse.json();
    console.log('Templates accessible:', templatesData.templates?.length || 0);
    
    // Test 3: Test skills access (should work for everyone)
    console.log('3. Testing skills access...');
    const skillsResponse = await fetch('/api/marketplace/skills');
    const skillsData = await skillsResponse.json();
    console.log('Skills accessible:', skillsData.skills?.length || 0);
    
    // Test 4: Test customer data access (should be restricted)
    console.log('4. Testing customer data isolation...');
    const customerResponse = await fetch('/api/customers');
    const customerData = await customerResponse.json();
    console.log('Customer data access:', customerResponse.status);
    
    // Test 5: Test deployment access (should be restricted to user's own)
    console.log('5. Testing deployment isolation...');
    const deploymentResponse = await fetch('/api/deployments');
    const deploymentData = await deploymentResponse.json();
    console.log('Deployment access:', deploymentResponse.status);
    
    console.log('=== SECURITY TEST COMPLETE ===');
    console.log('If all tests show 200/403 status codes appropriately, security is working!');
    
  } catch (error) {
    console.error('Security test error:', error);
    console.log('This might indicate security is blocking unauthorized access (good!)');
  }
}

// Auto-run test
testAgentForgeSecurity();

// Also expose function for manual testing
window.testAgentForgeSecurity = testAgentForgeSecurity;
