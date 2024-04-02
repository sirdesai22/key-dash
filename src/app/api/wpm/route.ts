import { NextApiRequest, NextApiResponse } from "next";

var data = {
    wpm:{
        data: 100,
        sec: 200
    },
    speed: {
        data: 100,
        sec: 200
    },
    accuracy: {
        data: 100,
        sec: 200
    },
}


export async function GET() {
    console.log("new newer request")
    return Response.json({ data });
}

export async function POST(req: Request, res: Response) {
   const d = await req.json();
   const newData = {
    data: d.correct,
    sec: d.wrong
   }
   data.speed = newData
   console.log("New data here",newData);
   return new Response("OK");
}