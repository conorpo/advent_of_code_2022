const DAY = 2;

import { assert } from "console";
import { parseArgs } from "util";

const test_input =
`A Y
B X
C Z`;

const { values, positionals} = parseArgs({
    args: Bun.argv,
    options: {
        test: {
            type: "boolean",
            default: false
        }
    },
    allowPositionals: true
});

async function get_input() {

    if(values.test) {
        return test_input;
    }

    return await Bun.file(`./days/${DAY}.txt`).text();
}

export async function part1() {
    const input = await get_input(); 

    let score = 0;

    const games = input.split("\n");
    games.forEach(game => {
        const [opp, you] = game.split(" ");
        
        const oppV = (opp.charCodeAt(0) - 'A'.charCodeAt(0));
        let youV = (you.charCodeAt(0) - 'X'.charCodeAt(0));

        score += youV + 1;

        if (youV == 0) youV = 3;
        
        if(youV - oppV == 1) {
            score += 6;
        } else if (youV % 3 == oppV) {
            score += 3;
        }
    })

    return score;
}

export async function part2() {
    const input = await get_input();

    let score = 0;

    const games = input.split("\n");
    games.forEach(game => {
        const [opp, res] = game.split(" ");
        
        const oppV = (opp.charCodeAt(0) - 'A'.charCodeAt(0));
        let youV;

        if(res == "X") {
            youV = (oppV - 1 + 3) % 3;
        } else if(res == "Y") {
            youV = oppV;
            score += 3;
        } else if(res == "Z") {
            youV = (oppV + 1) % 3;
            score += 6;
        }
        
        score += youV + 1;
    })

    return score;
}

if (import.meta.main) {
    console.log(await part1());
    console.log(await part2());
}



