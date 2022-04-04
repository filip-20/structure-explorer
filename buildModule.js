const fs = require('fs/promises');
const {exec} = require('child_process');

function cmd(command) {
    return new Promise((resolve, reject) => {
        console.log(command);
        const proc = exec(command);
        proc.stdout.on('data', function (data) {process.stdout.write(data)});
        proc.stderr.on('data', function (data) {process.stderr.write(data)});
        proc.on('exit', function (code) {code === 0 ? resolve(0) : reject(code)});
    });
}

(async () => {
    // if exists, remove './lib/dist' folder
    await fs.rm('./lib/dist', {
        force: true,
        recursive: true,
    });
    // compile ts/tsx/js files
    await cmd("npx babel --extensions '.ts,.tsx,.js' 'src/' --out-dir 'lib/dist'");
    // copy css modules
    await cmd("npx copyfiles -u 1 'src/**/*.css' 'lib/dist'");
    // isolate normal css files
    await cmd("npx isolate-css-cli -p fol-graphexplorer-cYTZ7LnVXZ -u 1 -c -o 'lib/dist/static' 'public/css/'");
    // copy font files used by isolated css
    await cmd("npx copyfiles -u 2 'public/webfonts/*' 'lib/dist/static/webfonts'");
    // we can't isolate imported fonts, we will use original css file that imports them
    await cmd("npx copyfiles -u 2 'public/css/google-fonts.css' 'lib/dist/static/css'");
})()
