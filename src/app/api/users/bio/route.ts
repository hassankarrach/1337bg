import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/authOptions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.login) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { bio } = await request.json();

    // Validate bio length (max 500 characters)
    if (bio && bio.length > 500) {
      return NextResponse.json(
        { error: "Bio must be 500 characters or less" },
        { status: 400 }
      );
    }

    // Update user's bio in the database
    const updatedUser = await prisma.user.update({
      where: {
        user_name: session.user.login,
      },
      data: {
        bio: bio || null,
      },
      select: {
        id: true,
        user_name: true,
        bio: true,
        updated_at: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Bio updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Error updating bio:", error);
    return NextResponse.json(
      { error: "Failed to update bio" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.login) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get user's current bio
    const user = await prisma.user.findUnique({
      where: {
        user_name: session.user.login,
      },
      select: {
        bio: true,
      },
    });

    return NextResponse.json({
      bio: user?.bio || null,
    });

  } catch (error) {
    console.error("Error fetching bio:", error);
    return NextResponse.json(
      { error: "Failed to fetch bio" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
