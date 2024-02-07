const DAY = 0;

import { parseArgs } from "util";

const test_input =
``;

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
}

export async function part2() {
    const input = await get_input();
}

if (import.meta.main) {
    console.log(await part1());
    console.log(await part2());
}
