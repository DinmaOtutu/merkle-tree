# MERKLE TREE

## TABLE OF CONTENTS

- [MERKLE TREE](#merkle-tree)
  - [TABLE OF CONTENTS](#table-of-contents)
  - [Introduction](#introduction)
  - [What is Merkle tree](#what-is-merkle-tree)
  - [Hash functions](#hash-functions)
  - [Merkle Proof](#merkle-proof)
  - [Implementing Merkle Proof In Javascript](#implementing-merkle-proof-in-javascript)
    - [Project Setup](#project-setup)
  - [Conclusion](#conclusion)

## Introduction

Blockchain technology, is a distributed ledger that records transactions across multiple computers in such a way that the registered transactions cannot be altered.
However, with the massive volume of transactions and the distributed nature of the network, ensuring swift verification of data presents a significant challenge.

Imagine having to verify the authenticity of a single transaction within a block of thousands, or checking the integrity of a file in a massive dataset. This is where Merkle trees and Merkle proofs come into play. Providing a simplified process by summarizing all the transactions into a single hash, the Merkle root, which serves as a compact representation of the entire dataset.

Through Merkle proofs, it is possible to verify any single transaction without needing to download the entire blockchain, thereby ensuring security and efficiency.

You will learn about Merkle Tree, Hash functions, and the implementation of Merkle Proof.

## What is Merkle tree

![Merkle tree](/assets/merkleTree.jpeg)

This is a hash based data structure that is used for data validation. A binary tree consisting of hash pointers. The leaves (the bottom-most nodes) from the diagram its labled `leaf nodes` contain hashes of individual transactions. Moving up the tree, each non-leaf node known as the parent node is a hash of the combined hashes of its two child nodes(leaf nodes). This process continues until there is a single hash at the top, known as the Merkle root(Root node).

 Any alteration of a single transaction would result in a different hash being propagated up to the root. This concept allows for the verification of a transaction within a block without needing to hold the entire block's data. When correctly combined, should match the block's Merkle root.

## Hash functions

These are simply methods in cryptography to generate fixed-size output for an input of variable size.Merkle tree uses a one-way hashing which is efficient for data validation. This means that no two plaintext hashes can have the same value.

## Merkle Proof

Merkle proof is based on the Merkle tree data structure and it is used to determine if a data (for example transaction) belongs in a tree, to prove the validity of data as part of a dataset without storing the whole data.

From the diagram of Merkle tree above, hashing the hash of nodes M and E gives the non-leaf node
H(ME). Hashing the hash of nodes H(ME) and H(RK) we obtain the non-leaf node H(MERK). The root node H(MERKLE) is obtained by hashing the hash of H(MERK) and H(LE).

For us to prove that a particular node is part of the Merkle tree, we do not need to hash all the nodes in the tree.

If we want to validate K in the tree, we need H(R), H(ME), and H(MERK). H(R) and H(K) gives H(RK). H(RK), and H(ME), gives H(MERK). Hash H(MERK) and H(LE), gives the root node - H(MERKLE). If the hash of the root doesn't match the hash generated, the data isn't accurate.

## Implementing Merkle Proof In Javascript

To implement Merkle proof using Javascript see setup the project(The code can also be found in the index.js file).

### Project Setup

After creating a folder for your project install Merkle Tree Library

`npm install merkletreejs`

## Conclusion

Merkle proof allows anyone to prove that a single piece of data is part of a dataset in a way that is quick and secure, which is particularly useful in distributed systems like blockchains where integrity and efficiency are crucial.
