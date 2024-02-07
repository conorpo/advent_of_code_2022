const DAY = 8;

import { parseArgs } from "util";

const test_input =
`30373
25512
65332
33549
35390`;

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

    const grid = input.split("\n").map(x => x.split("").map(Number));

    const h = grid.length;
    const w = grid[0].length;

    const visible = Array(h).fill().map(() => Array(w).fill(false));

    // Row Visible
    for(let y = 0; y < h; y++) {
        let max = -1;
        for(let x = 0; x < w; x++) {
            if (grid[y][x] > max) {
                visible[y][x] = true;
            }
            max = Math.max(max, grid[y][x]);
        }

        max = -1;
        for(let x = w - 1; x >= 0; x--) {
            if (grid[y][x] > max) {
                visible[y][x] = true;
            }
            max = Math.max(max, grid[y][x]);
        }
    }

    // Column Visible
    for(let x = 0; x < w; x++) {
        let max = -1;
        for(let y = 0; y < h; y++) {
            if (grid[y][x] > max) {
                visible[y][x] = true;
            }
            max = Math.max(max, grid[y][x]);
        }

        max = -1;
        for(let y = h - 1; y >= 0; y--) {
            if (grid[y][x] > max) {
                visible[y][x] = true;
            }
            max = Math.max(max, grid[y][x]);
        }
    }

    return visible.flat().filter(x => x).length;
}

// Multiplies a scene score grid by the scene score for a given direction
function scene_score_dir(grid, scene_score, checking_row, increasing) {
    const h = grid.length;
    const w = grid[0].length;

    let major_dim = checking_row ? h : w;
    let minor_dim = checking_row ? w : h;

    for(let i = 0; i < major_dim; i++) {
        let closest_tree = Array(10).fill(0); // Stores the distance from the edge of the closest tree at a each height

        for(let j = 0; j < minor_dim; j++) {
            let y = checking_row ? i : (increasing ? j : w - j - 1);
            let x = checking_row ? (increasing ? j : w - j - 1) : i;

            let height = grid[y][x];

            // Find closest tree at h >= height
            let blocking_tree_dist_from_edge = closest_tree.slice(height).reduce((a, b) => Math.max(a, b), 0);
            scene_score[y][x] *= (j - blocking_tree_dist_from_edge); // j is our distance from the edge

            closest_tree[height] = j;
        }
    }
}

export async function part2() {
    const input = await get_input(); 

    const grid = input.split("\n").map(x => x.split("").map(Number));
    
    // I overcomplicated it and took forever, turns out lower trees are always visible

    const h = grid.length;
    const w = grid[0].length;

    const scene_score = Array(h).fill().map(() => Array(w).fill(1));

    scene_score_dir(grid, scene_score, true, true); // (_ , _ , checking_row, increasing) , (true, true) => left view
    scene_score_dir(grid, scene_score, true, false); //  right view
    scene_score_dir(grid, scene_score, false, true); // top view
    scene_score_dir(grid, scene_score, false, false); // bottom view

    return scene_score.flat().reduce((a, b) => Math.max(a, b));
}

if (import.meta.main) {
    console.log(await part1());
    console.log(await part2());
}
