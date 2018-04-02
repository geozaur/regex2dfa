const __genId = (() => {
    let i = 1;
    return () => i++;
})();

function node(value, left, right, type) {
    this.id = __genId();
    this.value = value;
    this.left = left || null;
    this.right = right || null;
    this.type = type || 'leaf';
}

function tree(root) {
    this.root = root || null;

    this.insert = (node, current) => {
        let start = current || this.root;

        if (!this.root) {
            this.root = node;
        } else if (!start.right) {
            start.right = node;
        } else if (start.right.type != 'leaf' 
                    && start.right.type != 'null' 
                    && ((!start.right.left || !start.right.right 
                        || (start.right.left.type != 'leaf' && start.right.left.type != 'null')
                        || (start.right.right.type != 'leaf' && start.right.right.type != 'null' )))) {
            this.insert(node, start.right);
        } else if (!start.left) {
            start.left = node;
        } else if (start.left.type != 'leaf' 
                    && start.left.type != 'null'
                    && ((!start.left.left || !start.left.right 
                        || (start.left.left.type != 'leaf' && start.left.left.type != 'null')
                        || (start.left.right.type != 'leaf' && start.left.right.type != 'null' )))) {
            this.insert(node, start.left);
        } else {
            throw Error(`Cannot insert node: ${node.value}`);
        }
    }

    this.getNodeById = (id) => {
        let nodes = [this.root];

        while (nodes.length > 0) {
            let node = nodes.pop();

            if (node.id == id) {
                return node;
            } else {
                if (node.left) {
                    nodes.push(node.left);
                }
                if (node.right) {
                    nodes.push(node.right);
                }
            }
        }

        throw Error(`Invalid node id: ${id}`);
    }

    this.visit = (node) => {
        console.log(node.value);
    }

    this.preorder = (node) => {
        node = node || this.root;

        this.visit(node);

        if (node.left) {
            this.preorder(node.left);
        }

        if (node.right) {
            this.preorder(node.right);
        }

    }

    this.inorder = (node) => {
        node = node || this.root;

        if (node.left) {
            this.inorder(node.left);
        }

        this.visit(node);

        if (node.right) {
            this.inorder(node.right);
        }

    }

    this.postorder = (node) => {
        node = node || this.root;

        if (node.left) {
            this.postorder(node.left);
        }

        if (node.right) {
            this.postorder(node.right);
        }

        this.visit(node);

    }
}

// r = new node(4);
// t = new tree(r);

// t.insert(new node(5, null, null, true));
// t.insert(new node(2, null, null, false));
// t.insert(new node(3, null, null, true));
// t.insert(new node(1, null, null, true));

// t.inorder();
