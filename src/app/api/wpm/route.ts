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

const calcStats = (correct:number, wrong:number, words:number) => {
    const totalWords = correct/5
    const accuracy = ((wrong/5)/totalWords) * 100
    const wpm = totalWords
}

export async function POST(req: Request, res: Response) {
   const response = await req.json();
   const newData = {
    data: response.correct,
    sec: response.wrong,
    // words: data.words
   }
   data.speed = newData
   console.log("New data here",newData);
   return new Response("OK");
}