import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../lib/authOptions";
import { db } from "../../../../../lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json({ error: 'Username required' }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { user_name: username },
      select: { nickname: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ nickname: user.nickname });
  } catch (error) {
    console.error('Error fetching nickname:', error);
    return NextResponse.json(
      { error: 'Failed to fetch nickname' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.login) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { nickname } = await req.json();

    if (nickname && nickname.length > 50) {
      return NextResponse.json(
        { error: 'Nickname must be 50 characters or less' },
        { status: 400 }
      );
    }

    const user = await db.user.update({
      where: { user_name: session.user.login },
      data: { nickname },
    });

    return NextResponse.json({ success: true, nickname: user.nickname });
  } catch (error) {
    console.error('Error updating nickname:', error);
    return NextResponse.json(
      { error: 'Failed to update nickname' },
      { status: 500 }
    );
  }
}