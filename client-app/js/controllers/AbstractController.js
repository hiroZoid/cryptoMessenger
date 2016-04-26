function AbstractController() {

    this.renderAll = function (children) {
        for (var key in children) {
            if (children[key].render) {
                children[key].render();
            }
        }
    };

    this.removeAllChildrenFrom = function (node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
}
