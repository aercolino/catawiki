var assert = require('chai').assert;
var cli = require('../src/cli');
 
// TODO find a way to test this module
// probably by mocking stdin and stdout
// or by attaching readline to a child_process


// child_process looks quite promising
// see https://nodejs.org/api/child_process.html

// Example: A very elaborate way to run 'ps ax | grep ssh'

    // const spawn = require('child_process').spawn;
    // const ps = spawn('ps', ['ax']);
    // const grep = spawn('grep', ['ssh']);

    // ps.stdout.on('data', (data) => {
    //   grep.stdin.write(data);
    // });

    // ps.stderr.on('data', (data) => {
    //   console.log(`ps stderr: ${data}`);
    // });

    // ps.on('close', (code) => {
    //   if (code !== 0) {
    //     console.log(`ps process exited with code ${code}`);
    //   }
    //   grep.stdin.end();
    // });

    // grep.stdout.on('data', (data) => {
    //   console.log(`${data}`);
    // });

    // grep.stderr.on('data', (data) => {
    //   console.log(`grep stderr: ${data}`);
    // });

    // grep.on('close', (code) => {
    //   if (code !== 0) {
    //     console.log(`grep process exited with code ${code}`);
    //   }
    // });
