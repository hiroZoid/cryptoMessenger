"use strict";

define(function (require) {
    return {

        renderAll: function (children) {
            for (var key in children) {
                if (children[key].render) {
                    children[key].render();
                }
            }
        },

        removeAllChildrenFrom: function (node) {
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
        },

        append: function (node, parentNode) {
            if (node.parentNode !== parentNode) {
                parentNode.appendChild(node);
            }
        }

    };
});