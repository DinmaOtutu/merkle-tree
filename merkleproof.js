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