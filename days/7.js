
const DAY = 7;

import { parseArgs } from "util";

const test_input =
`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

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

    let root = {files: [], dirs: {}};
    root.parent = root;

    let cur = root;
    
    for(let line of input.split("\n")){
        if(line.startsWith("$")){
            let args = line.split(" ");

            // Handle CD
            if (args[1] === "cd") {
               if (args[2] === "/") {
                   cur = root;
               } else if (args[2] === "..") {
                   cur = cur.parent;
               } else {
                    let dir = args[2];
                    if(cur.dirs[dir]){
                        cur = cur.dirs[dir];
                    } else {
                        cur.dirs[dir] = {parent: cur, files: [], dirs: {}};
                        cur = cur.dirs[dir];
                    }
               }
            } 


        } else {
            // Handle files
            if(!line.startsWith("dir")){
                let size = Number(line.split(" ")[0]);
                cur.files.push(size);
            }
        }
    }

    let sum = 0;

    cur = root;
    main: while(cur.size === undefined){
        let size = 0;

        for(let dir of Object.values(cur.dirs)){
            if(dir.size === undefined){
                cur = dir;
                continue main;
            }
            size += dir.size;
        }

        for(let file of cur.files){
            size += file;
        }
        cur.size = size;
        if (size < 100000) sum += size;
        cur = cur.parent;
    }


    return sum;
}

export async function part2() {
    const total_disk_space = 70000000;
    const min_unused_space = 30000000;

    const input = await get_input(); 

    let root = {files: [], dirs: {}};
    root.parent = root;

    let cur = root;
    
    for(let line of input.split("\n")){
        if(line.startsWith("$")){
            let args = line.split(" ");

            // Handle CD
            if (args[1] === "cd") {
               if (args[2] === "/") {
                   cur = root;
               } else if (args[2] === "..") {
                   cur = cur.parent;
               } else {
                    let dir = args[2];
                    if(cur.dirs[dir]){
                        cur = cur.dirs[dir];
                    } else {
                        cur.dirs[dir] = {parent: cur, files: [], dirs: {}};
                        cur = cur.dirs[dir];
                    }
               }
            } 


        } else {
            // Handle files
            if(!line.startsWith("dir")){
                let size = Number(line.split(" ")[0]);
                cur.files.push(size);
            }
        }
    }

    let dir_sizes = [];

    cur = root;
    main: while(cur.size === undefined){
        let size = 0;

        for(let dir of Object.values(cur.dirs)){
            if(dir.size === undefined){
                cur = dir;
                continue main;
            }
            size += dir.size;
        }

        for(let file of cur.files){
            size += file;
        }

        cur.size = size;
        dir_sizes.push(size);
        cur = cur.parent;
    }

    let cur_free_space = total_disk_space - root.size;
    let space_needed = min_unused_space - cur_free_space;

    return dir_sizes.filter(size => size >= space_needed).sort((a, b) => a - b)[0];
}

if(positionals.some(pos => pos.endsWith(`${DAY}.js`))) {
    console.log(await part1());
    console.log(await part2());
}
