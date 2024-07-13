import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"


export const getUserIdFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || ""
        const decodedToken: any = jwt.verify(token, process.env.SECRETE_KEY!)

        return decodedToken.id;
    } catch (error) {
        console.log(error);
        return ""
    }
}