const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testNotifications() {
  try {
    console.log('Testing notification model...');
    
    // Try to create a test notification
    const result = await prisma.notification.findMany({
      take: 1
    });
    
    console.log('Success! Notifications model is working:', result);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testNotifications();
