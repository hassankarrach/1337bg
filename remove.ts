// remove.js - Using Prisma directly (simplest approach)
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function removeLastTwoFeedbacks() {
  try {
    // First, find the user
    const user = await prisma.user.findUnique({
      where: { user_name: "kraghib" },
      select: { id: true },
    });

    if (!user) {
      console.log("User 'kraghib' not found");
      return;
    }

    console.log("User found:", user);

    // Get the last two feedbacks for this user
    const lastTwoFeedbacks = await prisma.feedback.findMany({
      where: { receiver_id: user.id },
      orderBy: { created_at: "desc" },
      take: 2,
      select: { id: true, created_at: true },
    });

    if (lastTwoFeedbacks.length === 0) {
      console.log("No feedbacks found for user 'kraghib'");
      return;
    }

    console.log(`Found ${lastTwoFeedbacks.length} feedback(s) to delete:`, lastTwoFeedbacks);

    // Extract the IDs
    const feedbackIds = lastTwoFeedbacks.map(feedback => feedback.id);

    // Delete the feedbacks
    const deleteResult = await prisma.feedback.deleteMany({
      where: {
        id: {
          in: feedbackIds
        }
      }
    });

    console.log(`Successfully deleted ${deleteResult.count} feedback(s)`);
    
  } catch (error) {
    console.error("Error removing feedbacks:", error);
  } finally {
    // Disconnect from database
    await prisma.$disconnect();
  }
}

// Run the function
removeLastTwoFeedbacks();