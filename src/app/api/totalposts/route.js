import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Post from '../../../../models/post';

export async function GET() {
    await connectMongoDB();
    const totalPosts = await Post.find();
    return NextResponse.json({ totalPosts });
}