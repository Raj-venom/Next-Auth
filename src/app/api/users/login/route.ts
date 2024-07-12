import { connect } from "@/db/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()

        const { email, password } = reqBody;

        if ([email, password].some((field) => field === "" || field?.trim() == undefined)) {
            return NextResponse.json({ error: "All field required" }, { status: 400 })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ error: "Email not registerd" }, { status: 400 })
        }

        const validateUser = await bcrypt.compare(password, user.password)

        if (!validateUser) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRETE_KEY!, { expiresIn: '1d' })

        const response = NextResponse.json({
            message: "Logged in Sucessfully",
            success: true
        }, { status: 200 })

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}