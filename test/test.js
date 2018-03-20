
const VM = require('../runtime/vm');
const vm = new VM.$Machine();
let isFinish = false;
vm.on("error", function(e) {
    console.log('Error:', e, e.stack);
    outputStatus()
});
vm.on("paused", function(e) {
    console.log('pause:-------------------------------');
    outputStatus()
});

vm.on("resumed", function() {
    console.log("resumed------------------------------");
    outputStatus()
    // isFinish = true
});

vm.on("finish", () => {
    console.log("finish------------------------------");
    outputStatus()
    isFinish = true;
});

function outputStatus() {
    console.log('currentPausedLoc', vm.getLocation())
    console.log('output', vm.getOutput())
    if (vm.stack) {
        let stack = vm.stack[0]
        console.log('stack:', JSON.stringify(stack.scope), stack.state)
    }
}

vm.loadString(`var a = 1; var b = 2; var x = 3; x = a + 1; console.log(1);
console.log(3);
test(3);
console.log(x);`);

const breakpoints = [0,1,2,3,4,5,6,7];

breakpoints.forEach(line => {
    vm.toggleBreakpoint(line);
});

vm.run();
let v = setInterval(() => {
    vm.continue();
    if (isFinish) {
        console.log('finish:', isFinish)
        clearInterval(v)
    }
}, 1000)