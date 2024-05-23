/**
 * Determines whether a linked list has a cycle using Floyd's Cycle Detection Algorithm (Tortoise and Hare algorithm).
 * @param {LinkedList} list - The linked list to be checked for cycles.
 * @returns {boolean} - True if the linked list has a cycle, false otherwise.
 */
const hasCycle = (list) => {
  // Initialize two pointers, tortoise and hare, both starting from the head of the list
  let tortoise = list.head
  let hare = list.head

  // Iterate through the list until hare reaches the end or hare's next node becomes null
  while(hare !== null && hare.next !== null) {
    // Move tortoise one step forward
    tortoise = tortoise.next
    // Move hare two steps forward
    hare = hare.next.next
    // If tortoise and hare meet, there's a cycle in the list
    if(tortoise === hare) {
      return true
    }
  }

  // If hare reaches the end of the list, or hare's next node becomes null, there's no cycle
  return false
}
