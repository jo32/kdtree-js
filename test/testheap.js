var Heap = require("../lib/Heap").Heap;

console.log(Heap);

function comp(a, b) {
    return a - b;
}

var h = new Heap({
    "compare": comp,
    "size": 5
})

h.add(1);
h.add(2);
h.add(3);
h.add(4);
h.add(5);
h.add(6);