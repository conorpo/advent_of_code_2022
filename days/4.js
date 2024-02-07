const DAY = 4;

import { parseArgs } from "util";

const test_input =
`.234.....  2-4
.....678.  6-8

.23......  2-3
...45....  4-5

....567..  5-7
......789  7-9

.2345678.  2-8
..34567..  3-7

.....6...  6-6
...456...  4-6

.23456...  2-6
...45678.  4-8`;

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

    let ans = 0;
    const pairs = input.split("\n");

    for (let pair of pairs) {
        const [[al,ar],[bl,br]] = pair.split(",").map(line => line.split("-").map(Number));

        if ((al <= bl && ar >= br) || (bl <= al && br >= ar)) ans++;
    }

    return ans;
}

export async function part2() {
    const input = await get_input(); 

    let ans = 0;
    const pairs = input.split("\n");

    for (let pair of pairs) {
        const [[al,ar],[bl,br]] = pair.split(",").map(line => line.split("-").map(Number));

        let l = Math.max(al, bl);
        let r = Math.min(ar, br);

        if (l <= r) ans++;
    }

    return ans;
}

if (import.meta.main) {
    console.log(await part1());
    console.log(await part2());
}
