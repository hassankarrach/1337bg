// remove.js - Delete specific feedback by ID and discover field names
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function removeSpecificFeedback() {
  try {
    const feedbackId = "cmehehkk30003ujetd2c292d8";
    
    // First, let's get this specific feedback and see all its fields
    console.log("Getting the specific feedback to see its structure...");
    const targetFeedback = await prisma.feedback.findUnique({
      where: { id: feedbackId },
      include: {
        giver: {
          select: { user_name: true },
        },
        receiver: {
          select: { user_name: true },
        },
      },
    });
    
    if (!targetFeedback) {
      console.log("Feedback not found with that ID");
      return;
    }
    
    console.log("Found the target feedback:");
    console.log("Full feedback object:", targetFeedback);
    console.log("All fields:", Object.keys(targetFeedback));
    
    // Let's see if we can find the text in any field
    console.log("\nChecking for the text 'ayayaaaaay tilmida dyali rak 3ajbani' in all fields:");
    const targetText = "ayayaaaaay tilmida dyali rak 3ajbani";
    
    Object.keys(targetFeedback).forEach(key => {
      if (typeof targetFeedback[key] === 'string' && targetFeedback[key].includes('ayayaaaaay')) {
        console.log(`Found matching text in field '${key}': "${targetFeedback[key]}"`);
      }
    });
    
    console.log(`\nFeedback details:`);
    console.log(`- From: ${targetFeedback.giver?.user_name}`);
    console.log(`- To: ${targetFeedback.receiver?.user_name}`);
    console.log(`- Created: ${targetFeedback.created_at}`);
    console.log(`- ID: ${targetFeedback.id}`);
    
    // Confirm this is the right one to delete
    console.log(`\nThis appears to be the feedback from 'falamlih' to 'zichajia' that you want to delete.`);
    console.log(`Proceeding with deletion...`);
    
    // Delete this specific feedback by ID
    const deleteResult = await prisma.feedback.delete({
      where: { id: feedbackId }
    });
    
    console.log(`\n✅ Successfully deleted the feedback!`);
    console.log("Deleted feedback ID:", deleteResult.id);
    
  } catch (error) {
    console.error("Error removing feedback:", error);
  } finally {
    // Disconnect from database
    await prisma.$disconnect();
  }
}

// Run the function
removeSpecificFeedback();