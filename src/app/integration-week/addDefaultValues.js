const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addDefaultValuesToUsers() {
  try {
    // Update existing users by setting the new fields with default values
    await prisma.user.updateMany({
      data: {
        is_registered_IW: false,
        is_admin_IW: false,
        total_points_IW: 0,
        image_url : ""
      },
    });
    console.log("Updated all users with default values for new fields.");
  } catch (error) {
    console.error("Error updating users:", error);
  } finally {
    await prisma.$disconnect();
  }
}

addDefaultValuesToUsers();
