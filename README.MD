# MERKLE TREE

## TABLE OF CONTENTS

- [MERKLE TREE](#merkle-tree)
  - [TABLE OF CONTENTS](#table-of-contents)
  - [Introduction](#introduction)
  - [Common Terminologies used](#common-terminologies-used)
  - [What is Merkle tree?](#what-is-merkle-tree)
  - [Hash functions](#hash-functions)
  - [Merkle Proof](#merkle-proof)
  - [Implementing Merkle Proof In Javascript](#implementing-merkle-proof-in-javascript)
  - [Conclusion](#conclusion)

## Introduction

Blockchain technology, is a distributed ledger that records transactions across multiple computers in such a way that the registered transactions cannot be altered.
However, with the massive volume of transactions and the distributed nature of the network, ensuring swift verification of data presents a significant challenge.

Imagine having to verify the authenticity of a single transaction within a block of thousands, or checking the integrity of a file in a massive dataset. This is where Merkle trees come into play, by providing a simplified process of summarizing all the transactions into a single hash.

You will learn about Merkle Tree and how it works.

## Common Terminologies used

- *Node*:  A basic unit of binary tree used to build the structure which contains data and one or several links to other nodes.

- *Binary tree*: nodes arranged in a hierarchical structure. Each node in a binary tree has a maximum of two children, referred to as the left child and the right child.

- *Leaf node*: It represents the end of a path in the tree and contain hashes of the data blocks (e.g., transactions). These are the tree's foundation and they have  no children.

- *Parent node*: Known as non-leaf nodes in a Merkle Tree that contain hashes derived from their child(leaf node).

- *Root node*: A type of parent node known as Merkle root, contains a hash derived from the entire dataset.

- *Hash*: The output of a hash function.

## What is Merkle tree?

![Merkle tree](/assets/merkleTree.jpeg)

 Merkle Tree is a binary tree in which every leaf node is a hash of a block of data (for example, a transaction), and every non-leaf node is a hash of the concatenation of its child nodes.  The the bottom-most nodes labeled in the diagram as `leaf nodes` contain hashes of individual transactions, and  moving up the tree, each non-leaf node known as the `parent node` is a hash of the combined hashes of its two child nodes(leaf nodes). This process continues until there is a single hash at the top, known as the Merkle root(Root node).

 Any alteration of a single transaction would result in a different hash being propagated up to the root. This concept allows for the verification of a transaction within a block without needing to hold the entire block's data. When correctly combined, should match the block's Merkle root.

## Hash functions

These are simply methods in cryptography to generate fixed-size output for an input of variable size.Merkle tree uses a one-way hashing which is efficient for data validation. This means that no two plaintext hashes can have the same value.

## Merkle Proof

Merkle proof is based on the Merkle tree data structure and it is used to determine if a data (for example transaction) belongs in a tree, to prove the validity of data as part of a dataset without storing the whole data.

From the diagram of Merkle tree above, hashing the hash of nodes M and E gives the non-leaf node
H(ME). Hashing the hash of nodes H(ME) and H(RK) we obtain the non-leaf node H(MERK). The root node H(MERKLE) is obtained by hashing the hash of H(MERK) and H(LE).

For us to prove that a particular node is part of the Merkle tree, we do not need to hash all the nodes in the tree.

If we want to validate K(Hash(Transaction 4)) in the tree, we need H(R)(Hash(Transaction 3)), H(ME), and H(MERK). Hash H(MERK) and H(LE), gives the root node - H(MERKLE). If the hash of the root doesn't match the hash generated, the data isn't accurate.

## Implementing Merkle Proof In Javascript

 How Merkle Proofs would work for a block of data.

We go ahead to install Merkle Tree library by using the command

`npm install merkletreejs`

For hashing install a hash library keccak256

 `npm install keccak256`

 ``` javascript
 const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

// List of data transactions
const data = [
  'm',
  'e',
  'r',
  'k',
  'l',
  'e'
];


// Hash each data
const leaves = data.map(addr => keccak256(addr));

// Create the Merkle Tree
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

// Get the Merkle root
const root = tree.getRoot().toString('hex');

// Generate a Merkle proof for the data K
const dataToProve = 'k';
const proof = tree.getProof(keccak256(dataToProve)).map(x => x.data.toString('hex'));

// Verify the Merkle proof
const verified = tree.verify(proof, keccak256(dataToProve), root);

console.log('Merkle Root:', root);
console.log('Proof for:', dataToProve);
console.log('Proof:', proof);
console.log(tree.toString())
console.log('Is Verified:', verified);

// Logged Data
Merkle Root: a7658d9f1b7d4e4d50184435344c7b27fd0d10b1f813143c421bb0733969054c
Proof for: k
Proof: [
  '414f72a4d550cad29f17d9d99a4af64b3776ec5538cd440cef0f03fef2e9e010',
  '245e435a693b08cc59208a4dbcbc4e13185a909bae387d9b8118d193e13d481f',
  'e7bb65d9e9bf745673ced07a8ada9869bed1a7ef504c3347a5c4f6850b60f5f5'
]
Tree: └─ a7658d9f1b7d4e4d50184435344c7b27fd0d10b1f813143c421bb0733969054c
   ├─ 62a2a2b33162d8f99ef97e51eb5474487b4dc9334e268b205ced434e65ff6407
   │  ├─ 245e435a693b08cc59208a4dbcbc4e13185a909bae387d9b8118d193e13d481f
   │  │  ├─ daba8c984363447d18bf8210079973ac8fc1ce76864315b5baacf246bf6e72f6
   │  │  └─ a8982c89d80987fb9a510e25981ee9170206be21af3c8e0eb312ef1d3382e761
   │  └─ a85b32bd450b29365c8b6c46989a35cacf6d97ca96bc0a2b4b0a3ea2f2eca464
   │     ├─ 414f72a4d550cad29f17d9d99a4af64b3776ec5538cd440cef0f03fef2e9e010
   │     └─ f3d0adcb6a1c70832365e9da0a6b2f5199422f6a53c67cfad171114e3442aa0f
   └─ e7bb65d9e9bf745673ced07a8ada9869bed1a7ef504c3347a5c4f6850b60f5f5
      └─ e7bb65d9e9bf745673ced07a8ada9869bed1a7ef504c3347a5c4f6850b60f5f5
         ├─ 6a0d259bd4fb907339fd7c65a133083c1e9554f2ca6325b806612c8df6d7df22
         └─ a8982c89d80987fb9a510e25981ee9170206be21af3c8e0eb312ef1d3382e761

Is Verified: true
 ```

## Conclusion

Merkle proof allows anyone to prove that a single piece of data is part of a dataset in a way that is quick and secure, which is particularly useful in distributed systems like blockchains where integrity and efficiency are crucial.
