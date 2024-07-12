import { connect } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect()


export async function GET() {
    try {

        const response = NextResponse.json({
            message: "Logout sucessfully",
            sucess: true
        })

        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) })

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

