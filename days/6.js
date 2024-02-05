const DAY = 6;

import { parseArgs } from "util";

const test_input =
`mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

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

export async function part1(cnt = 4) {
    const input = await get_input(); 

    let map = new Map();
    for(let char of "abcdefghijklmnopqrstuvwxyz"){
        map.set(char, 0);
    }

    let i = 0;
    for(; i < cnt; i++){
        let cur = map.get(input[i]);
        map.set(input[i], cur + 1);
    }

    for(let j = 0; i < input.length; i++, j++){
        let valid = true;
        for(let val of map.values()){
            if(val > 1){
                valid = false;
                break;
            }
        }
        if(valid) return i;

        let cur = map.get(input[i]);
        map.set(input[i], cur + 1);

        let rem = map.get(input[j]);
        map.set(input[j], rem - 1);
    }
}

export async function part2() {
    return await part1(14);
}

if(positionals.some(pos => pos.endsWith(`${DAY}.js`))) {
    console.log(await part1());
    console.log(await part2());
}
