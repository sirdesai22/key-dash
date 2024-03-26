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
    return Response.json({ data });
}

export async function POST(req: Request, res: Response) {
   const d = await req.json();
   const newData = {
    data: d.data,
    sec: d.sec
   }
   data.wpm.data = d.data;
   data.wpm.sec = d.sec;
   console.log("New data here",newData);
   return new Response("OK");
}