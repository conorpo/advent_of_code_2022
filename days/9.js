const DAY = 9;

import { parseArgs } from "util";

const test_input =
`R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

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

const dirs = {
    'R': {x: 1, y: 0},
    'L': {x: -1, y: 0},
    'U': {x: 0, y: 1},
    'D': {x: 0, y: -1}
}

function pos_hash(pos) {
    return `${pos.x},${pos.y}`;
}

function add_vec(a, b) {
    return {x: a.x + b.x, y: a.y + b.y};
}

function sub_vec(a, b) {
    return {x: a.x - b.x, y: a.y - b.y};
}

// Returns the dot product of dif and dir
function check_dir_dist(dif, dir) {
    return dif.x * dir.x + dif.y * dir.y;
}

export async function part1() {
    const input = await get_input(); 

    let tail_pos = {x: 0, y: 0};
    let head_pos = {x: 0, y: 0};

    let visited = new Set();

    visited.add(pos_hash(tail_pos));

    const lines = input.split("\n");

    for (const line of lines) {
        const line_parts = line.split(" ");
        const dir = dirs[line_parts[0]];
        const dist = parseInt(line_parts[1]);
        
        // Simulate first 3 steps by checking for diagonal moves
        let i = 0;
        const steps = Math.min(dist, 3);
        for(; i < steps; i++) {
            head_pos = add_vec(head_pos, dir);
            let dif = sub_vec(head_pos, tail_pos);
            let dot = check_dir_dist(dif, dir);
            if(dot > 1 ){
                tail_pos = add_vec(tail_pos, dir);
                let opposite_axis = {x: dir.y, y: dir.x};
                if(opposite_axis.x === 0){
                    tail_pos.y = head_pos.y;
                } else {
                    tail_pos.x = head_pos.x;
                }
            }   
            visited.add(pos_hash(tail_pos));
        };

        //Diagonal move would've been done by now, tail should be directly behind head
        for(; i < dist; i++) {
            head_pos = add_vec(head_pos, dir);
            tail_pos = add_vec(tail_pos, dir);
            visited.add(pos_hash(tail_pos));
        }
    }       

    return visited.size;
}



export async function part2() {
    const lines = (await get_input()).split("\n"); 

    let visited = new Set();

    let positions = Array(10).fill({x: 0, y: 0});

    for (const line of lines) {
        const line_parts = line.split(" ");
        const dir = dirs[line_parts[0]];
        const dist = parseInt(line_parts[1]);
        
        for(let i = 0; i < dist; i++) {
            positions[0] = add_vec(positions[0], dir);

            for(let j = 1; j < positions.length; j++) {
                const dif = sub_vec(positions[j-1], positions[j]);
                if(Math.abs(dif.x) > 1 || Math.abs(dif.y) > 1) {
                    const x_move = dif.x / Math.max(Math.abs(dif.x), 1);
                    const y_move = dif.y / Math.max(Math.abs(dif.y), 1);
                    positions[j] = add_vec(positions[j], {x: x_move, y: y_move});
                }
                //console.log(dif, j, move, "\n");
            }
            visited.add(pos_hash(positions[positions.length - 1]));
        }
    }

    return visited.size;
}

if (import.meta.main) {
    console.log(await part1());
    console.log(await part2());
}
