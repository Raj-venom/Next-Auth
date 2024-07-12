import { connect } from "@/db/dbConfig"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs";
import { sendEmail } from "@/utils/mailer";
import { RESET, VERIFY } from "@/constants/constant"


connect()


export async function POST(request: NextRequest) {
    try {
        // get user data from user
        // validate data
        // validate if user already register
        // encrypt password 
        // create database entry
        // send email of verify
        // send response

        const reqBody = await request.json()
        const { username, email, password } = reqBody;

        // validate fields
        if ([username, email, password].some((item) => item === "" && item === undefined)) {
            return NextResponse.json({ error: "All field are required" }, { status: 400 })
        }

        // validate register user
        const existedUser = await User.findOne({
            $or: [{ username }, { email }]
        })

        if (existedUser) {
            return NextResponse.json({ error: "User with email or username already exists" }, { status: 400 })
        }

        // encrypt password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        // create database entry
        const newUser = new User({
            username,
            email,
            password: hashPassword
        })

        const savedUser = await newUser.save()

        if (!savedUser) {
            return NextResponse.json({ error: "Soemething went wrong while registering user" }, { status: 500 })
        }

        await sendEmail({ email, emailType: VERIFY, userId: savedUser._id })

        savedUser.password = undefined

        return NextResponse.json({
            status: 200,
            message: "User created successfully",
            success: true,
            savedUser
        })


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })


    }

}