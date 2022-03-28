class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class List {
  constructor(root) {
    this.root = new Node(root);
    this.count = 1;
  }

  addNode(value, index) {
    if (index <= 0 || index > this.count) {
      return false;
    }
    let currentNode = this.root;
    let node = new Node(value);
    if (!currentNode) {
      this.root = node;
      return true;
    }

    for (let i = 0; i < this.count - 1; i++) {
      if (index - 1 === i) {
        break;
      }
      currentNode = currentNode.next;
    }

    if (index !== undefined) {
      node.next = currentNode.next;
    }
    currentNode.next = node;
    this.count++;
    return true;
  }

  removeNode(index) {
    if (index < 0 || index > this.count) {
      return false;
    }
    let currentNode = this.root;
    let previousNode;
    if (index === 0) {
      this.root = currentNode.next;
      this.count--;
      return true;
    }
    for (let i = 0; i < this.count - 1; i++) {
      if (index - 1 === i) {
        break;
      }
      previousNode = currentNode;
      currentNode = currentNode.next;
    }

    previousNode.next = currentNode.next;
    this.count--;
    return true;

  }

  print() {
    let currentNode = this.root;
    let currentList = '';
    while(currentNode.next) {
      currentList += `${currentNode.value}, `;
      currentNode = currentNode.next;
    }
    return currentList;
  }

}


let list = new List(10);
console.log(list);
list.addNode(22);
list.addNode(32);
list.addNode(45);
list.addNode(67);
list.addNode(98);
list.addNode(224,2);
list.addNode(324,6);
list.removeNode();
list.removeNode(3);
console.log(list.print());
