# MERKLE TREE

## TABLE OF CONTENTS

- [MERKLE TREE](#merkle-tree)
  - [TABLE OF CONTENTS](#table-of-contents)
  - [Introduction](#introduction)
  - [What is Merkle tree](#what-is-merkle-tree)

## Introduction

Blockchain technology, is a distributed ledger that records transactions across multiple computers in such a way that the registered transactions cannot be altered.
However, with the massive volume of transactions and the distributed nature of the network, ensuring swift verification of data presents a significant challenge.

Imagine having to verify the authenticity of a single transaction within a block of thousands, or checking the integrity of a file in a massive dataset. This is where Merkle trees and Merkle proofs come into play. Providing a simplified process by summarizing all the transactions into a single hash, the Merkle root, which serves as a compact representation of the entire dataset. 

Through Merkle proofs, it is possible to verify any single transaction without needing to download the entire blockchain, thereby ensuring security and efficiency.

You will learn about Merkle Tree, Hash functions, and the implementation of Merkle Proof.

## What is Merkle tree

![Merkle tree](https://console.cloudinary.com/console/c-d6075c7540a3ce7db5280f12cb9f45/media_library/search?sortDirection=desc&sortField=uploaded_at&view_mode=mosaic&q=%7B%22uploadedTimeOption%22%3A%22today%22%2C%22createdTimeOption%22%3A%22today%22%2C%22createdByUsers%22%3A%5B%22abb776a6093fc49c918c3cac1c8d0a%22%5D%7D)

This is a hash based data structure that is used for data validation.
