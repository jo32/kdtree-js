"use strict";

/**
 * A heap implementation based on array.
 * Author: jo32
 * 
 * License: MIT
 * 
 **/

if (require) {
    var common = require("./Common");
}


function Heap(parameters) {

    common.checkRequiredParameters(["compare"], parameters);

    var self = this;
    self.list = [];
    self.compare = parameters["compare"];
    if ("size" in parameters) {
        self.size = parameters["size"];
    } else {
        self.size = -1;
    }

    self.add = function (element) {
        self.list.push(element);
        __heapify();
        if (self.list.length > self.size && self.size !== -1) {
            self.list = self.list.slice(1);
            __heapify();
        }
    }

    function __heapify() {
        var start = (self.list.length - 2) / 2;
        while (start >= 0) {
            __shift(start, self.list.length - 1);
            start -= 1;
        }
    }

    function __shift(start, end) {

        var root = start;

        while (root * 2 + 1 <= end) {
            var child = root * 2 + 1;
            var swap = root;

            if (self.compare(self.list[swap], self.list[child]) < 0) {
                swap = child;
            }
            if (child + 1 <= end && self.compare(self.list[swap], self.list[child + 1]) <= 0) {
                swap = child + 1;
            }

            if (swap != root) {
                var temp = self.list[swap];
                self.list[swap] = self.list[root];
                self.list[root] = temp;
                root = swap;
            } else {
                return;
            }

        }
    }
}

if (exports !== "undefined") {
    exports["Heap"] = Heap;
}