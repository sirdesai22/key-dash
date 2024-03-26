import texts from "@/SampleTexts/easyTexts";

export function renderTexts(){
    const text = texts[Math.floor(Math.random() * texts.length)].txt;
    const spans = text
        .split("")
        .map(
            (char, index) =>
                `<span key=${index} style="margin: 0 1px;">${char}</span>`
        );
    return spans.join("");
}
