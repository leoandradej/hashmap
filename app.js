const HashMap = require("./HashMap");
const BST = require("./BST");

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

const hm = new HashMap();
hm.set('Makenzie Palmer', 'Phoenix, AZ')
hm.set('Taylor Craig', 'Chicago, IL')
hm.set('Reece Herrera', 'San Diego, CA')
hm.set('Tommy Reilly', 'Denver, CO')
hm.set('Haley Rogers', 'Houston, TX')
hm.set('Louie Buchanan', 'Atlanta, GA')
hm.set('Max Scott', 'Portland, OR')
hm.set('Celine Norton', 'Seattle, WA')
hm.set('Seth Levy', 'Sacramento, CA')
hm.set('Ava Mitchell', 'Boston, MA')
hm.set('Jacob Warren', 'Los Angeles, CA')
hm.set('Cleo Sawyer', 'New York, NY')

//console.log(hm.entries())

const bst = new BST();

bst.add(9);
bst.add(4);
bst.add(17);
bst.add(3);
bst.add(6);
bst.add(22);
bst.add(5);
bst.add(7);
bst.add(20);
bst.add(4);

prettyPrint(bst.root)