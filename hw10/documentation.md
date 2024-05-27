# Hash Table

## Table of Contents

1. [Overview](#overview)
2. [Data Structures](#data-structures)
   - [Linked List](#linked-list)
   - [Hash Table](#hash-table)
3. [Functions](#functions)
   - [Custom Hash Function](#custom-hash-function)
4. [Analysis](#analysis)
5. [Demonstrations](#demonstrations)

## Overview

This project focuses on the implementation of a Hash Table in JavaScript, with a particular emphasis on collision handling using a Linked List.

## Data Structures

### Linked List

A linked list is a linear data structure consisting of a sequence of elements where each element points to the next element in the sequence. Linked lists can be singly linked (each element points to the next element) or doubly linked (each element points to both the next and previous elements). Linked lists are useful for dynamic memory allocation, implementing stacks and queues, and representing polynomials.

### Hash Table

A hash table is a data structure that maps keys to values for highly efficient lookup. It uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found. This implementation of a hash table in JavaScript uses separate chaining with linked lists to handle collisions and includes dynamic resizing to maintain performance.

## Functions

### Custom Hash Function

The hash function is critical to the performance of the hash table. The custom hash function computes a hash value for a given string and limit using a polynomial rolling hash algorithm, with a base of 27 and an initial value of 117.

## Analysis

### Performance Analysis

#### Insertion

The insertion operation in the hash table involves computing the hash value, finding the appropriate index, and inserting the element into a linked list at that index. The average time complexity for insertion is 𝑂(1), assuming a good hash function that distributes elements uniformly. In the worst case, where all elements hash to the same index, the time complexity is 
𝑂(n), where 𝑛 is the number of elements.

#### Retrieval

The retrieval operation also has an average time complexity of 𝑂(1). It involves computing the hash value, finding the index, and searching the linked list at that index. In the worst case, the time complexity is 𝑂(𝑛) if there is a collision for all elements.

#### Deletion

The deletion operation has an average time complexity of 𝑂(1). It involves computing the hash value, finding the index, and removing the element from the linked list at that index. In the worst case, the time complexity is 𝑂(𝑛) if there is a collision for all elements.

### Trade-offs

- `Collision Handling`: Using separate chaining with linked lists to handle collisions is simple and effective but can degrade to 𝑂(𝑛) operations if many elements collide at the same index.
- `Resizing`: To maintain performance, the hash table resizes itself when the load factor exceeds a threshold. This ensures that the average time complexity remains 𝑂(1) for insertion, retrieval, and deletion.
- `Memory Usage`: The use of linked lists for collision handling can lead to higher memory usage compared to open addressing schemes.

In summary, the implemented hash table provides efficient average-case performance for insertion, retrieval, and deletion operations. Proper resizing and a good hash function are crucial for maintaining this performance.

## Demonstrations

Examples of using the HashTable and LinkedList data structures are provided in the test folder.