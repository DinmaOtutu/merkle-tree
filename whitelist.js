const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

// List of email addresses for the whitelist
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

console.log('Merkle Root:', root);
console.log('Proof for:', emailToProve);
console.log('Proof:', proof);
console.log('Tree',tree.toString())
console.log('Is Verified:', verified);