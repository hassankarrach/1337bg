import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/authOptions";
import { db } from "../../../../lib/db";

// GET - Fetch user's notifications
export async function GET(req: NextRequest) {
  const session = await getServerSession({ req, ...authOptions });
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Find user by login
    const user = await db.user.findUnique({
      where: { user_name: session.user.login },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch notifications for the user
    const notifications = await (db as any).notification.findMany({
      where: { user_id: user.id },
      orderBy: { created_at: "desc" },
      take: 50, // Limit to 50 most recent notifications
    });

    // Count unread notifications
    const unreadCount = await (db as any).notification.count({
      where: { 
        user_id: user.id,
        is_read: false 
      },
    });

    return NextResponse.json({ 
      notifications,
      unreadCount 
    }, { status: 200 });
    
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications." },
      { status: 500 }
    );
  }
}

// PATCH - Mark notification(s) as read
export async function PATCH(req: NextRequest) {
  const session = await getServerSession({ req, ...authOptions });
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { notificationId, markAllAsRead } = await req.json();

  try {
    // Find user by login
    const user = await db.user.findUnique({
      where: { user_name: session.user.login },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (markAllAsRead) {
      // Mark all notifications as read for this user
      await (db as any).notification.updateMany({
        where: { 
          user_id: user.id,
          is_read: false 
        },
        data: { is_read: true },
      });
    } else if (notificationId) {
      // Mark specific notification as read
      await (db as any).notification.updateMany({
        where: { 
          id: notificationId,
          user_id: user.id // Ensure user can only mark their own notifications
        },
        data: { is_read: true },
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
    
  } catch (error) {
    console.error("Failed to update notification:", error);
    return NextResponse.json(
      { error: "Failed to update notification." },
      { status: 500 }
    );
  }
}
