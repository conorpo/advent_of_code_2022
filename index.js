function hrtime_to_ms(hrtime) {
    const [s, ns] = hrtime;
    return (s * 1000) + (ns / 1000000)
}

async function run_all_days() {
    let results = [{}];

    for(let i = 1; i <= 25; i++) {
        try {
            const {part1, part2} = await import(`./days/${i}.js`);
            
            const result = {};

            let start = process.hrtime();
            result["Part 1 Result"] = await part1();
            result["Part 1 Time"] = `${hrtime_to_ms(process.hrtime(start)).toFixed(3)}ms`;

            start = process.hrtime();
            result["Part 2 Result"] = await part2();
            result["Part 2 Time"] = `${hrtime_to_ms(process.hrtime(start)).toFixed(3)}ms`;

            results.push(result);
        } catch (e) {}
    }

    console.table(results);
}

run_all_days();

