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
    - [Explanation](#explanation)
      - [Preparing Data for the Tree](#preparing-data-for-the-tree)
      - [Building the Merkle Tree](#building-the-merkle-tree)
      - [The Merkle Root](#the-merkle-root)
      - [Creating and Verifying a Merkle Proof](#creating-and-verifying-a-merkle-proof)
      - [Logged Data](#logged-data)
  - [How Merkle Proofs would work for a whitelisting of three email addresses](#how-merkle-proofs-would-work-for-a-whitelisting-of-three-email-addresses)
  - [Conclusion](#conclusion)

## Introduction

Blockchain technology, is a distributed ledger that records transactions across multiple computers in such a way that the registered transactions cannot be altered.
However, with the massive volume of transactions and the distributed nature of the network, ensuring swift verification of data presents a significant challenge.

Imagine having to verify the authenticity of a single transaction within a block of thousands, or checking the integrity of a file in a massive dataset. This is where Merkle trees come into play, by providing a simplified process of summarizing all the transactions into a single hash.

You will learn about Merkle Tree and how it works.

## Common Terminologies used

- *Node*:  A basic unit of binary tree used to build the structure which contains data and one or several links to other nodes.

- *Binary tree*: Nodes arranged in a hierarchical structure. Each node in a binary tree has a maximum of two children, referred to as the left child and the right child.

- *Leaf node*: It represents the end of a path in the tree and contain hashes of the data blocks (e.g., transactions). These are the tree's foundation and they have  no children.

- *Parent node*: Known as non-leaf nodes in a Merkle Tree that contain hashes derived from their child(leaf node). This combination process uses a cryptographic hash function, which ensures any tiny change in data alters the hash.

- *Root node*: At the very top of the tree sits a single node called the Merkle root. This node's hash is derived from the hashes of all the data below it. It serves as a compact summary of all the data in the tree.

- *Hash*: The output of a hash function.

## What is Merkle tree?

![Merkle tree](/assets/merkleTree.jpeg)

 A Merkle Tree is a special type of binary tree used for securely organizing and verifying chunks of data, such as transactions in a blockchain.

The power of a Merkle Tree lies in its Merkle Root, if one piece or more of data changes anywhere in the tree, this change cascades up through the hashes, resulting in a different Merkle Root. This feature makes it easy to verify the accuracy and completeness of the data without needing to examine each piece individually.

## Hash functions

These are simply methods in cryptography to generate fixed-size output for an input of variable size. Merkle tree uses a one-way hashing which is efficient for data validation. This means that no two plaintext hashes can have the same value.

## Merkle Proof

Merkle proof is based on the Merkle tree data structure and it is used to determine if a data (for example transaction) belongs in a tree, to prove the validity of the transaction as part of a dataset without storing it all.

From the diagram of Merkle tree above, hashing the hash of nodes M and E gives the non-leaf node
H(ME). Hashing the hash of nodes H(ME) and H(RK) we obtain the non-leaf node H(MERK). The root node H(MERKLE) is obtained by hashing the hash of H(MERK) and H(LE).

For us to prove that a particular node is part of the Merkle tree, we do not need to hash all the nodes in the tree.

If we want to validate K(Hash(Transaction 4)) in the tree:

- Start with H('K') – our target hash to verify.

- Take the sibling hash, H('R') (Transaction 3), and hash it together with H('k'). This will give  H('RK'), which is the parent hash of 'K' and 'R'.

- Move up the tree to the next level. Take H('ME') (the hash of Transactions 1 and 2), which is the sibling of H('RK'), and hash it together to get the hash H('MERK').

- Lastly, take the hash of the sibling of H('MERK'), which is H('LE') to get the root hash H('MERKLE').

- If H('MERKLE') matches the root hash of the Merkle tree, then 'K' is indeed part of the Merkle tree.
- This process does not require to check or know the individual hashes of Transactions 1, 2, 5, and 6, only the combined hashes at each level up to the root.

## Implementing Merkle Proof In Javascript

In the upcoming code snippet, we're going to demonstrate the construction of a Merkle Tree using JavaScript, specifically focusing on how to generate and verify a Merkle Proof for a piece of data. 

We set up a Node.js environment and leverage the merkletreejs library alongside the keccak256 hash function. We would create a Merkle Tree from a series of data, generating a proof for a specific piece of data, and verify this proof to attest its presence within our tree.

- Create an empty directory with the following command.

 For Linux and Mac

`mkdir merkle-proof`or any preferred name.

- Initialize a Node.js project.

`npm init -y`

For the implementation of Merkle proof, we will use the merkletreejs package. It provides all the  functions to construct a Merkle tree, generate and verify proof.

- We go ahead to install Merkle Tree library by using the command

`npm install merkletreejs`

For hashing install a hash library keccak256

 `npm install keccak256`

- Create an index file and import the dependencies
  
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
```

Save the file and execute it using the command node

`node index.js`

 The logged Data shows as follows:

```javascript
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

### Explanation

#### Preparing Data for the Tree

 We have a list of individual characters: ['m', 'e', 'r', 'k', 'l', 'e'].
 Each character is hashed (transformed into a unique, fixed-size string of numbers and letters) using the hash function, keccak256, turning it into a format that can be securely handled. These hashed values are the leaf nodes of our Merkle Tree.

#### Building the Merkle Tree

The MerkleTree class from the merkletreejs library is used to create the tree. When building the tree, we specify to use the keccak256 hash function and to sort pairs, which ensures consistency in how the tree is structured.
As the tree is constructed, each non-leaf node is created by hashing together its child nodes, layer by layer, until we reach the root.

#### The Merkle Root

The getRoot() method gives us the root of the tree, which we convert to a hexadecimal string with `.toString('hex')`(This method converts data from its original binary or buffer format into a hexadecimal (hex) string representation for human readabilty). This root hash summarizes all the data in the tree.

#### Creating and Verifying a Merkle Proof

To prove that the character 'k' is indeed in our dataset without revealing the entire dataset, we generate a Merkle Proof using getProof(). This proof consists of the minimum set of hashes needed to recreate the path from our data ('k') to the root hash.

The verify() method checks if this path is correct, effectively proving that 'k' is part of our dataset, based on the proof provided and without needing to compare against every piece of data in the set.If the method returns true, it means that the data is a part of the tree, else it is not.

If we pass a different value to the `dataToProve` variable and the value doesn't belong to the tree, the `verified` output will be `false`.

#### Logged Data

The Tree from the logged data showcases the process of constructing a Merkle Tree, generating a Merkle Proof for a specific piece of data, and verifying that data's presence within the tree, all while maintaining data integrity and privacy.

## How Merkle Proofs would work for a whitelisting of three email addresses

Using the same logic for proving 'k', we list the email address we want to whitelist

```javascript
const whitelist = [
  'email1@example.com',
  'email2@example.com',
  'email3@example.com'
];
// Hash each email address
const leaves = whitelist.map(addr => keccak256(addr));

// Create the Merkle Tree
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

// Get the Merkle root
const root = tree.getRoot().toString('hex');

// Generate a Merkle proof for the first email address
const emailToProve = 'otutudinma1@gmail.com';
const proof = tree.getProof(keccak256(emailToProve)).map(x => x.data.toString('hex'));

// Verify the Merkle proof
const verified = tree.verify(proof, keccak256(emailToProve), root);

console.log('Is Verified:', verified);
Is Verified: false
// The verified value will be false, since otutudinma1@gmail.com is not part of the whitelisted emails.
```

## Conclusion

Merkle proof allows anyone to prove that a single piece of data is part of a dataset in a way that is quick and secure, which is particularly useful in distributed systems like blockchains where integrity and efficiency are crucial.
