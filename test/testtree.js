var KDTree = require("../KDTree")
    .KDTree;
console.log(KDTree)

var t = new KDTree({
    "dimensions": ["x", "y"]
});
var p1 = {
    "x": 3,
    "y": 4
}
var p2 = {
    "x": 2,
    "y": 4
}
var p3 = {
    "x": 5,
    "y": 5
}
var p4 = {
    "x": 4,
    "y": 7
}
t.insertPoint(p1);
t.insertPoint(p2);
t.insertPoint(p3);
t.insertPoint(p4);
console.log(t);

function metric(a, b) {
    return Math.sqrt(Math.pow(a["x"] - b["x"], 2) + Math.pow(a["y"] - b["y"], 2));
}

var r = t.getNearestNeigbors(1, {
    "x": 1,
    "y": 1
}, metric);
console.log(r);