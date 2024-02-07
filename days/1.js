const DAY = 1;

import { parseArgs } from "util";

const test_input =
`1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

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

    const elves = input.split("\n\n");

    const total_calories_per_elf = elves.map(calorie_list => calorie_list.split("\n").map(Number).reduce((a, b) => a + b));

    return total_calories_per_elf.reduce((a, b) => Math.max(a, b));
}

export async function part2() {
    const input = await get_input();

    const elves = input.split("\n\n");

    const total_calories_per_elf = elves.map(calorie_list => calorie_list.split("\n").map(Number).reduce((a, b) => a + b));

    const top_3 = total_calories_per_elf.sort((a, b) => b - a).slice(0, 3);

    return top_3.reduce((a, b) => a + b);
}

if (import.meta.main) {
    console.log(await part1());
    console.log(await part2());
}
