"use strict";

/**
 * A KDTree implementation in JavaScript based on binary tree.
 * Author: jo32
 **/

if (require) {
    var common = require("./lib/Common");
    var Heap = require("./lib/Heap")
        .Heap;
}


function Node(parameters) {

    common.checkRequiredParameters(["object", "dimension"], parameters);

    var self = this;

    self.obj = parameters["object"];
    self.parent = null;
    self.left = null;
    self.right = null;
    self.dimension = parameters["dimension"];

    self.getDimensionValue = function () {
        return self.obj[self.dimension];
    }
}


function KDTree(parameters) {

    common.checkRequiredParameters(["dimensions"], parameters);

    var self = this;

    self.rootNode = null;
    self.dimensions = parameters["dimensions"];

    if ("points" in parameters) {
        for (var i in parameters["points"]) {
            var point = parameters["points"][i];
            self.insertPoint(point);
        }
    }

    self.getNextDimension = function (node) {
        if (node === null) {
            return self.dimensions[0];
        }
        var index = self.dimensions.indexOf(node.dimension);
        return self.dimensions[(index + 1) % self.dimensions.length];
    }

    function __findClosestPoint(rootNode, point, boundaries) {
        if (rootNode.left === null && rootNode.right === null) {
            return [rootNode, boundaries];
        }
        if (point[rootNode.dimension] <= rootNode.getDimensionValue()) {
            boundaries[rootNode.dimension][1] = rootNode.getDimensionValue();
            if (rootNode.left === null) {
                return [rootNode, boundaries];
            }
            return __findClosestPoint(rootNode.left, point, boundaries);
        }
        if (point[rootNode.dimension] > rootNode.getDimensionValue()) {
            boundaries[rootNode.dimension][0] = rootNode.getDimensionValue();
            if (rootNode.right === null) {
                return [rootNode, boundaries];
            }
            return __findClosestPoint(rootNode.right, point, boundaries);
        }
    }

    function __traverseTree(rootNode, list) {
        if (rootNode.left != null) {
            __traverseTree(rootNode.left, list);
        }
        list.push(rootNode);
        if (rootNode.right != null) {
            __traverseTree(rootNode.right, list);
        }
    }

    self.insertPoint = function (point) {
        if (self.rootNode === null) {
            self.rootNode = new Node({
                "object": point,
                "dimension": self.getNextDimension(null)
            });
        } else {
            var node = self.findClosestPoint(point)[0];
            if (point[node.dimension] <= node.getDimensionValue()) {
                var newNode = new Node({
                    "object": point,
                    "dimension": self.getNextDimension(node)
                });
                newNode.parent = node;
                node.left = newNode;
            } else {
                var newNode = new Node({
                    "object": point,
                    "dimension": self.getNextDimension(node)
                });
                newNode.parent = node;
                node.right = newNode;
            }
        }
    }

    self.findClosestPoint = function (point) {
        if (self.rootNode == null) {
            return null;
        }
        var boundaries = {};
        for (var i in self.dimensions) {
            boundaries[self.dimensions[i]] = [Number.MIN_VALUE, Number.MAX_VALUE];
        }
        var r = __findClosestPoint(self.rootNode, point, boundaries);
        return r;
    }

    self.getNearestNeigbors = function (number, point, metric) {

        function __isCovered(boundaries, heap, point) {
            var currentMaxDistance = metric(point, heap.list[0]);

            var isCovered = true;
            for (var i in self.dimensions) {
                var dimension = self.dimensions[i];
                var boundary = boundaries[dimension];
                var tempPoint = {};
                for (var j in self.dimensions) {
                    tempPoint[self.dimensions[j]] = point[self.dimensions[j]];
                }
                tempPoint[dimension] = boundary[0];
                var tempDistance = metric(point, tempPoint);
                if (tempDistance < currentMaxDistance) {
                    return false;
                }
                tempPoint[dimension] = boundary[1];
                var tempDistance = metric(point, tempPoint);
                if (tempDistance < currentMaxDistance) {
                    return false;
                }
            }

        }

        function __comp(a, b) {
            var a = metric(point, a);
            var b = metric(point, b);
            return a - b;
        }

        var h = new Heap({
            "compare": __comp,
            "size": number
        });

        var r = self.findClosestPoint(point);
        h.add(r[0].obj);
        var boundaries = r[1];

        var currentNode = r[0];
        while (h.list.length < number || __isCovered(boundaries, h, point) === false) {
            var parent = currentNode.parent;
            if (parent == null) {
                break;
            }
            h.add(parent.obj);
            var toAddList = [];
            if (parent.left == currentNode) {
                __traverseTree(parent.right, toAddList);
            } else {
                __traverseTree(parent.left, toAddList);
            }
            for (var i in toAddList) {
                h.add(toAddList[i].obj);
            }
            if(!parent.parent) {
                break;
            }
            if (parent.parent.left == parent) {
                boundaries[parent.parent.dimension][1] = parent.parent.getDimensionValue();
            } else {
                boundaries[parent.parent.dimension][0] = parent.parent.getDimensionValue();
            }
        }

        return h.list;

    }

}

if (exports !== "undefined") {
    exports["KDTree"] = KDTree;
}