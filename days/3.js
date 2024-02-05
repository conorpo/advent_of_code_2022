const DAY = 3;

import { parseArgs } from "util";

const test_input =
`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

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

    let sum = 0;
    
    for (let line of input.split("\n")) {
        const first_half = line.slice(0, line.length / 2);
        const second_half = line.slice(line.length / 2);

        let set = new Set();
        for (let char of first_half) {
            set.add(char);
        }

        let set2 = new Set();
        for (let char of second_half) {
            if (set.has(char) && !set2.has(char)) {
                let dif = char.charCodeAt(0) - 'a'.charCodeAt(0);
                if(dif < 26 && dif >= 0){
                    sum += dif + 1;
                } else {
                    sum += char.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
                }
            }
            set2.add(char);
        }
    }

    return sum;    
}

export async function part2() {
    const input = await get_input();

    const lines = input.split("\n");

    let sum = 0;

    for(let i = 0; i < lines.length; i+=3){
        const a = lines[i];
        const b = lines[i+1];
        const c = lines[i+2];

        const setA = new Set();

        for(let char of a){
            setA.add(char);
        }

        const setB = new Set();

        for(let char of b){
            if(setA.has(char)){
                setB.add(char);
            }
        }

        const setC = new Set();

        for(let char of c){
            if(setB.has(char)){
                let dif = char.charCodeAt(0) - 'a'.charCodeAt(0);
                if(dif < 26 && dif >= 0){
                    sum += dif + 1;
                } else {
                    sum += char.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
                }
                break;
            }
        }
    }

    return sum;
}

if(positionals.some(pos => pos.endsWith(`${DAY}.js`))) {
    console.log(await part1());
    console.log(await part2());
}
