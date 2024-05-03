import { NextApiRequest, NextApiResponse } from "next";

var data = {
    wpm: {
        data: 36,
        // time: 200,
        // accuracy: '100%'
    },
    time: {
        data: '15s',
    },
    accuracy: {
        data: '100%'
    }
}


export async function GET() {
    // console.log("new newer request")
    return Response.json({ data });
}

const calcStats = (correct: number, wrong: number, time: number, totalWords: number) => {
    const words = Math.floor(correct / 5)
    const wpm = Math.round(words / (15/60))
    // const wpm = totalWords
    var accuracy = 0
    if (correct === 0) accuracy = 0
    if (wrong === 0 && correct === 0) accuracy = 0
    else accuracy = Math.round((correct / (correct+wrong)) * 100)

    // accuracy = (wrong !== 0) ? (correct / (correct+wrong)) * 100 : '100'

    // return { wpm: wpm, time: time, accuracy: `${accuracy}%` }
    return {wpm:{data:wpm}, time: {data: String(time)+'s'}, accuracy: {data: String(accuracy)+'%'}}
}

export async function POST(req: Request, res: Response) {
    const response = await req.json();

    const newData = calcStats(response.correct, response.wrong, response.time, response.totalWords)
    // const newData = {
    //     wpm: wpm,
    //     time: response.time,
    //     accuracy: `${accuracy}%`
    // }
    data = newData
    // console.log("New data here", newData);
    return new Response("OK");
}