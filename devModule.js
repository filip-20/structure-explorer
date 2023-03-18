const nodemon = require('nodemon');
const {exec} = require('child_process');

function cmd(command) {
    return new Promise((resolve, reject) => {
        console.log(command);
        const proc = exec(command);
        proc.stdout.on('data', function (data) {process.stdout.write(data)});
        proc.stderr.on('data', function (data) {process.stderr.write(data)});
        proc.on('exit', function (code) {code === 0 ? resolve(0) : reject(code)});

        process.on('exit', () => {console.log('killink'); proc.kill()});
    });
}

nodemon({
  watch: 'src public/webfonts public/css',
  ext: 'css scss',
  exec: 'npm run build-module nodemon'
});

cmd("npx babel --extensions '.ts,.tsx,.js' 'src/' --out-dir 'lib/dist' -w");
