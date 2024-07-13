import { connect } from "@/db/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { getUserIdFromToken } from "@/utils/getUserIdFromToken";
import mongoose, { isValidObjectId } from "mongoose";

connect()


export async function GET(request: NextRequest) {

    try {
        const userId = getUserIdFromToken(request)

        if(!isValidObjectId(userId)){
            return NextResponse.json({ error: "Invalid Token" }, { status: 401 })
        }

        const user = await User.findById(userId).select("-password")

        if (!user) {
            return NextResponse.json({ error: "Invalid user" }, { status: 401 })
        }

        return NextResponse.json({
            message: "User fetched sucessfully",
            sucess: true,
            user
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}