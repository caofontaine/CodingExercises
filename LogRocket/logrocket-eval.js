// Given a tree with nodes that have a 'value' and 'childNodes', remove
// all of the nodes where 'value' is less than 0
const tree = {
  value: 14,
  childNodes: [
    {
      value: 12,
      childNodes: [
        {
          value: -2,
          childNodes: [],
        },
      ],
    },
    {
      value: -5,
      childNodes: [
        {
          value: 6,
          childNodes: [],
        },
        {
          value: 13,
          childNodes: [],
        },
      ],
    },
  ],
};

/*
  Thought process (in the moment)
  1. Assume number of nested trees is not fixed.
  2. Try and flatten the tree so it's easier to traverse.
  3. Try to use recursion to flatten the tree to it's easier to analyze.
  4. Then traverse the flattened tree to see if a value is less than 0 and is not included in the final result.
*/

// Implementation (by the end of it)
function removeNegativeNodes(tree) {
  if (tree < 0) return null;

  for (const child of tree.childNodes) {
    if (removeNegativeNodes(child) === null) {
      tree.childNodes.pop(child);
    }
  }

  return tree;
}

console.info(JSON.stringify(removeNegativeNodes(tree), null, 2));

// Post-mortem Solution
function removeNegativeNodes(tree) {
  if (tree.value < 0) return null;
  tree.childNodes = tree.childNodes.filter(
    (child) => removeNegativeNodes(child) !== null,
  );
  return tree;
}
