KDTree in JavaScript
====================

# Example

    var KDTree = require("../KDTree")
        .KDTree;

    var t = new KDTree({
        "dimensions": ["x", "y"]
    });
    // ...

    }
    t.insertPoint(p1);
    // ...

    function metric(a, b) {
        return Math.sqrt(Math.pow(a["x"] - b["x"], 2) + Math.pow(a["y"] - b["y"], 2));
    }

    var r = t.getNearestNeigbors(3, {
        "x": 1,
        "y": 1
    }, metric);
    // where r is a list containing 3 nearest neigbors