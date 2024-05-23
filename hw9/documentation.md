# Data Structures

## Table of Contents

1. [Overview](#overview)
2. [Data Structures](#data-structures)
3. [Algorithms](#algorithms)
4. [Demonstrations](#demonstrations)

## Overview

This project implements various data structures and algorithms in JavaScript. The implemented data structures include Stack, Queue, Binary Tree, Binary Search Tree, Linked List, and Graph. The algorithms cover Breadth-First Search (BFS), Recognition of Binary Search Tree (BST), and Floyd's Cycle Detection Algorithm.

## Data Structures

### Stack

A stack is a linear data structure that follows the Last In, First Out (LIFO) principle. It supports two main operations: push and pop. Stacks are useful for implementing algorithms such as expression evaluation, function call stack, and backtracking.

### Queue

A queue is a linear data structure that follows the First In, First Out (FIFO) principle. It supports enqueue (addition to the rear) and dequeue (removal from the front) operations. Queues are commonly used in breadth-first search, task scheduling, and printing queues.

### Binary Tree and Binary Search Tree (BST)

A binary tree is a hierarchical data structure where each node has at most two children: left and right. A binary search tree is a special type of binary tree where the left child of a node contains values less than the node's value, and the right child contains values greater than the node's value. BSTs support efficient searching, insertion, and deletion operations.

### Linked List

A linked list is a linear data structure consisting of a sequence of elements where each element points to the next element in the sequence. Linked lists can be singly linked (each element points to the next element) or doubly linked (each element points to both the next and previous elements). Linked lists are useful for dynamic memory allocation, implementing stacks and queues, and representing polynomials.

### Graph

A graph is a non-linear data structure consisting of a finite set of vertices (nodes) and a set of edges that connect pairs of vertices. Graphs can be represented using adjacency lists or adjacency matrices. They are used in various applications such as social networks, network routing, and recommendation systems.

## Algorithms

### Min/Max Stack Algorithm

The Min/Max Stack algorithm is implemented in the `MinMaxStack` class, which extends the functionality of a standard stack by providing constant-time \(O(1)\) operations to find the minimum and maximum elements in the stack.

### Recognition of Binary Search Tree (BST)

The Recognition of BST algorithm checks whether a given binary tree satisfies the properties of a binary search tree. It recursively validates each node's value against a range of minimum and maximum values to ensure the binary search tree property is maintained.

### Breadth-First Search (BFS)

Breadth-First Search is an algorithm for traversing or searching tree or graph data structures. It starts at the root (or any arbitrary node for graphs) and explores all the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level. BFS is commonly used to find the shortest path between two nodes in an unweighted graph.

### Floyd's Cycle Detection Algorithm

Floyd's Cycle Detection Algorithm, also known as the Tortoise and Hare algorithm, is used to detect cycles in a linked list. It employs two pointers, a slow pointer (tortoise) and a fast pointer (hare), to traverse the list. If there is a cycle, the two pointers will eventually meet.

## Functions

### `isBST(tree)`

Checks if a binary tree is a Binary Search Tree (BST).

- `tree`: The binary tree to be checked.
- Returns true if the tree is a valid BST, false otherwise.

Algorithm Time Complexity: O(n), where n is the number of nodes in the tree.

### `shortestPathBFS(graph, nodeA, nodeB)`

Finds the shortest path between two nodes in a graph using Breadth-First Search (BFS).

- `graph`: The graph object containing the adjacency list representation.
- `nodeA`: The starting node.
- `nodeB`: The target node.
- Returns the shortest distance between the nodes or 'No path' if no path exists.

Algorithm Time Complexity: O(V + E), where V is the number of vertices and E is the number of edges in the graph.

### `hasCycle(list)`

Determines whether a linked list has a cycle using Floyd's Cycle Detection Algorithm.

- `list`: The linked list to be checked for cycles.
- Returns true if the linked list has a cycle, false otherwise.

Algorithm Time Complexity: O(n), where n is the number of nodes in the list.
Algorithm Space Complexity: O(1), this algorithm only requires a constant amount of extra space regardless of the size of the linked list.

## Demonstrations

Examples of using each data structure and algorithm are provided in the demonstrations folder.

