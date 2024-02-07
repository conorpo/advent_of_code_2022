const DAY = 5;

import { parseArgs } from "util";

const test_input =
`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

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

    const [crates, moves] = input.split("\n\n");

    const crate_rows = crates.split("\n");
    const stacks = [];
    const stack_count = crate_rows[crate_rows.length - 1].split("   ").length;
    for(let i = 0; i < stack_count; i++){
        stacks.push([]);
    }
    
    for(let i = crate_rows.length - 2; i >= 0; i--){
        const row = crate_rows[i];
        for(let j = 0; j < stack_count; j++){
            const crate = row[j*4 + 1];
            if(crate !== " "){
                stacks[j].push(crate);
            }
        }
    }


    const move_lines = moves.split("\n");

    for(let move of move_lines){
        let [cnt, from, to] = move.match(/[\d]+/g).map(Number);
        while(cnt > 0 && stacks[from - 1].length > 0){
            cnt--;
            stacks[to - 1].push(stacks[from - 1].pop());
        }
    }

    return stacks.map(stack => stack.pop()).join("");
}

export async function part2() {
    const input = await get_input(); 

    const [crates, moves] = input.split("\n\n");

    const crate_rows = crates.split("\n");
    const stacks = [];
    const stack_count = crate_rows[crate_rows.length - 1].split("   ").length;
    for(let i = 0; i < stack_count; i++){
        stacks.push([]);
    }
    
    for(let i = crate_rows.length - 2; i >= 0; i--){
        const row = crate_rows[i];
        for(let j = 0; j < stack_count; j++){
            const crate = row[j*4 + 1];
            if(crate !== " "){
                stacks[j].push(crate);
            }
        }
    }

    const move_lines = moves.split("\n");

    for(let move of move_lines){
        let [cnt, from, to] = move.match(/[\d]+/g).map(Number);
        let temp = [];
        while(cnt > 0 && stacks[from - 1].length > 0){
            cnt--;
            temp.push(stacks[from - 1].pop());
        }

        while(temp.length > 0){
            stacks[to - 1].push(temp.pop());
        }
    }

    return stacks.map(stack => stack.pop()).join("");
}

if (import.meta.main) {
    console.log(await part1());
    console.log(await part2());
}
