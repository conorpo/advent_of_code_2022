const DAY = 10;

import { parseArgs } from "util";

const test_input =
`addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

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

    let cycle = 1;
    let X = 1;
    let sum = 0n;
    for (const line of input.split("\n")) {
        let [op, arg] = line.split(" ");
        arg = arg ? parseInt(arg) : 0;

        if (op === "addx") {
            cycle += 2;
            let cyclePlus20mod40 = (cycle+20)%40;

            X += arg;
            switch (cyclePlus20mod40) {
                case 0:
                    sum += BigInt(X) * BigInt(cycle);
                    break;
                case 1:
                    sum += BigInt(X - arg) * BigInt(cycle - 1);
                    break;
            }
            
        } else { 
            // noop
            cycle++;
            if ((cycle+20)%40 == 0) sum += BigInt(X) * BigInt(cycle);
        }
    }
    return sum;
}

export async function part2() {
    const input = await get_input();

    // Cool ass part
    let scanline = "";
    let cycle = 0;
    let X = 1;

    for (const line of input.split("\n")) {
        let [op, arg] = line.split(" ");
        arg = arg ? parseInt(arg) : 0;

        scanline += Math.abs(cycle - X) <= 1 ? '#' : '.';
        cycle++;

        if (cycle == 40) { //newline check
            console.log(scanline);
            scanline = "";
            cycle = 0;
        }
        
        if (op === "addx") {
            scanline += Math.abs(cycle - X) <= 1 ? '#' : '.';           
            X += arg;
            cycle++;        

            if (cycle == 40) { // and again for addx
                console.log(scanline);
                scanline = "";
                cycle = 0;
            }
        }
    }

    // Output is ZCBAJFZ 
    return "ZCBAJFJZ";
}

if (import.meta.main) {
    console.log(await part1());
    console.log(await part2());
}
