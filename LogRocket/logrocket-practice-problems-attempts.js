// ------------------------------------------------------------
// WARM-UP 1: Group Anagrams
// ------------------------------------------------------------
// Glassdoor reports anagram questions at LogRocket interviews.
//
// Given an array of strings, group the anagrams together.
// Two strings are anagrams if they contain the same characters
// in any order.
//
// Example:
//   groupAnagrams(["eat","tea","tan","ate","nat","bat"])
//   → [["eat","tea","ate"], ["tan","nat"], ["bat"]]
//
// Hint: What uniquely identifies a group of anagrams?

/*
  1. Use a map, to store identifiers for an anagram as a key. Set as an empty object
  2. Loop through the array of strings, taking each string and sorting their characters.
  3. If the sorted string doesn't exist as a key in the map, store it with an empty array (to group the anagrams).
  4. If the sorted string matches an existing key, add the string to the array value for the key.
  5. Extract the key values to output the anagram groups (using Objects.values())
*/

function groupAnagrams(strs) {
  const map = {};

  for (let str of strs) {
    const sorted_str = str.split("").sort().join();
    if (!map[sorted_str]) map[sorted_str] = [];
    map[sorted_str].push(str);
  }

  return Object.values(map);
}

//console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));
//console.log(groupAnagrams([""]));
//console.log(groupAnagrams(["a"]));

// ------------------------------------------------------------
// WARM-UP 2: Two Sum
// ------------------------------------------------------------
// Classic hash map problem. If this feels easy, good — it
// should be a reflex.
//
// Given an array of integers and a target, return the indices
// of the two numbers that add up to the target.
//
// Example:
//   twoSum([2, 7, 11, 15], 9) → [0, 1]
//
// Constraint: O(n) time. One pass.

/*
  1. Use a map to store the number and its index.
  2. Loop through nums.
  3. Subtract the target from the current num, to see what num is needed ot achieve the two sum.
  4. If the map has the num that is needed, return the index of the num needed in the map, and the index of the current num in iteration.
  5. If the num is not in the map, add it to the map, continue iteration.
  6. Result will be one full or partial pass through of nums.
*/

function twoSum(nums, target) {
  const map = new Map();

  for (const [index, num] of nums.entries()) {
    let num_needed = target - num;

    if (map.has(num_needed)) return [map.get(num_needed), index];
    map.set(num, index);
  }
}

//console.log(twoSum([2, 7, 11, 15], 9));
//console.log(twoSum([3, 2, 4], 6));

// ------------------------------------------------------------
// PROBLEM 1: Session Event Deduplication
// ------------------------------------------------------------
// LogRocket captures millions of events per session. Events
// sometimes fire multiple times within a short window (e.g.,
// rapid clicks, duplicate network requests).
//
// Given an array of events (each with a `type` and `timestamp`),
// remove duplicates where the same event type fires within
// `windowMs` milliseconds of a previous occurrence.
// Keep the FIRST occurrence in each window.
//
// Example:
//   deduplicateEvents([
//     { type: "click", timestamp: 1000 },
//     { type: "click", timestamp: 1050 },  // duplicate (within 200ms)
//     { type: "scroll", timestamp: 1100 },
//     { type: "click", timestamp: 1300 },  // new window, keep it
//     { type: "scroll", timestamp: 1250 }, // duplicate (within 200ms of 1100)
//   ], 200)
//   → [
//     { type: "click", timestamp: 1000 },
//     { type: "scroll", timestamp: 1100 },
//     { type: "click", timestamp: 1300 },
//   ]
//
// Assume events are sorted by timestamp.

/*
  1. If events are assumed sorted by timestamp, then traversal is O(n).
  2. Keep the last event type timestamp in "memory" to compare with next same event type to determine if it's duplicate or new.
*/

function deduplicateEvents(events, windowMs) {
  const dedupedMap = new Map();

  // returns an array of the deduped events. Map is just the "memory" to filter out duplicates
  return events.filter((event) => {
    const prev = dedupedMap.get(event.type);
    if (prev !== undefined && event.timestamp - prev < windowMs) {
      return false;
    }
    dedupedMap.set(event.type, event.timestamp);
    return true;
  });
}

console.log(
  deduplicateEvents(
    [
      { type: "click", timestamp: 1000 },
      { type: "click", timestamp: 1050 },
      { type: "scroll", timestamp: 1100 },
      { type: "click", timestamp: 1300 },
      { type: "scroll", timestamp: 1250 },
    ],
    200,
  ),
);

// ------------------------------------------------------------
// PROBLEM 2: Most Common User Paths
// ------------------------------------------------------------
// LogRocket's JD mentions "detect most common user paths
// across millions of events." This is a realistic version.
//
// Given an array of session logs, where each session is an
// array of page URLs the user visited IN ORDER, find the
// most common path of length `k`.
//
// A "path" is k consecutive pages in a session.
//
// Example:
//   findCommonPaths([
//     ["/home", "/pricing", "/signup", "/dashboard"],
//     ["/home", "/pricing", "/signup"],
//     ["/home", "/docs", "/pricing", "/signup"],
//     ["/home", "/pricing", "/contact"],
//   ], 3)
//   → "/home → /pricing → /signup"  (appears 3 times)
//
// Return the path as a string joined by " → ".
// If there's a tie, return any of the most common.

/*
  1. Focus on each individual session to find paths of length k.
  2. Iterate through the session to get the paths from i, i + k.
  3. Slice the part of the session up to i + k, then join with " → ".
  4. Store the concatenated paths as a key in the map, with logic for storing the count based on whether there is an already existing value in the same key (0 if no value, +1 if alreay another value.)
  5. Traverse through the map to find the path with the highest count. With a tie, it will return any of the most common.

*/

function findCommonPaths(sessions, k) {
  const pathCounts = new Map();

  for (const session of sessions) {
    for (let i = 0; i <= session.length - k; i++) {
      const key = session.slice(i, i + k).join(" → ");
      pathCounts.set(key, (pathCounts.get(key) || 0) + 1);
      console.log(pathCounts);
    }
  }

  return [...pathCounts.entries()].reduce((prev, curr) =>
    curr[1] > prev[1] ? curr : prev,
  )[0];
}

console.log(
  findCommonPaths(
    [
      ["/home", "/pricing", "/signup", "/dashboard"],
      ["/home", "/pricing", "/signup"],
      ["/home", "/docs", "/pricing", "/signup"],
      ["/home", "/pricing", "/contact"],
    ],
    3,
  ),
);

// ------------------------------------------------------------
// PROBLEM 3: Error Rate Threshold Alert
// ------------------------------------------------------------
// LogRocket tracks errors in real time. Given a stream of
// log entries (each marked "ok" or "error"), determine the
// FIRST moment when the error rate within a sliding window
// of size `w` exceeds a threshold ratio.
//
// Return the index of the entry that triggers the alert,
// or -1 if the threshold is never exceeded.
//
// Example:
//   findAlertIndex(
//     ["ok","ok","error","error","ok","error","error","ok"],
//     4,      // window size
//     0.5     // threshold (more than 50% errors)
//   )
//   → 6
//   // Window at index 6: ["ok","error","error","error"] → 3/4 = 75% > 50%
//
// "Exceeds" means strictly greater than the threshold.

/*
  1. Establish the first window of size w and determine the number of error entries in it.
  2. Check if the error rate exceeds the threshold. If it does, return the index.
  3. Slide the window to the right and increment or decrement the error count before checking the ratio again.
*/

function findAlertIndex(logs, w, threshold) {
  for (let i = 0; i <= logs.length - w; i++) {
    const errorCount = logs
      .slice(i, i + w)
      .filter((log) => log === "error").length;
    const ratio = errorCount / w;
    if (ratio > threshold) return i + w - 1;
  }
  return -1;
}

console.log(
  findAlertIndex(
    ["ok", "ok", "error", "error", "ok", "error", "error", "ok"],
    4,
    0.5,
  ),
);
console.log(findAlertIndex(["ok", "ok", "ok"], 2, 0.5)); // → -1

// Note: This is O(n*w) because you review copies of the logs via slice and filter. See solution for O(n).

// ------------------------------------------------------------
// PROBLEM 4: DOM Mutation Compression
// ------------------------------------------------------------
// LogRocket records DOM mutations for session replay. A naive
// recorder captures every attribute change, but many are
// redundant (e.g., setting style="color:red" then immediately
// setting style="color:blue" — only the last one matters).
//
// Given an array of mutations in order, where each mutation is:
//   { nodeId: number, attribute: string, value: string }
//
// Compress them so that for each (nodeId, attribute) pair,
// only the LAST mutation is kept — but preserve the relative
// order of the surviving mutations (by their original position).
//
// Example:
//   compressMutations([
//     { nodeId: 1, attribute: "class", value: "hidden" },
//     { nodeId: 2, attribute: "style", value: "color:red" },
//     { nodeId: 1, attribute: "class", value: "visible" },
//     { nodeId: 2, attribute: "style", value: "color:blue" },
//     { nodeId: 1, attribute: "id", value: "main" },
//   ])
//   → [
//     { nodeId: 1, attribute: "class", value: "visible" },
//     { nodeId: 2, attribute: "style", value: "color:blue" },
//     { nodeId: 1, attribute: "id", value: "main" },
//   ]

/*
  1. Iterate through array, to store mutations in a map based on nodeId + attribute.
  2. End of iteration, return an array of the map values containing the compressed mutations.
*/

function compressMutations(mutations) {
  const compressedMutations = new Map();

  for (const mutation of mutations) {
    compressedMutations.set(
      mutation.nodeId + " " + mutation.attribute,
      mutation,
    );
  }

  return [...compressedMutations.values()];
}

console.log(
  compressMutations([
    { nodeId: 1, attribute: "class", value: "hidden" },
    { nodeId: 2, attribute: "style", value: "color:red" },
    { nodeId: 1, attribute: "class", value: "visible" },
    { nodeId: 2, attribute: "style", value: "color:blue" },
    { nodeId: 1, attribute: "id", value: "main" },
  ]),
);

// ------------------------------------------------------------
// PROBLEM 5: Longest Error-Free Session Segment
// ------------------------------------------------------------
// Given an array of timestamped events where some are errors,
// find the longest continuous time span that contains at most
// `maxErrors` errors.
//
// Return { start, end, duration } of the longest segment.
//
// This is a sliding window problem with a twist — the window
// is defined by time, but you slide by index.
//
// Example:
//   longestErrorFree([
//     { timestamp: 0, error: false },
//     { timestamp: 100, error: true },
//     { timestamp: 200, error: false },
//     { timestamp: 300, error: true },
//     { timestamp: 400, error: true },
//     { timestamp: 500, error: false },
//     { timestamp: 600, error: false },
//     { timestamp: 700, error: false },
//   ], 1)
//   → { start: 300, end: 700, duration: 400 }
//   // Window [300..700] contains 1 error (at 400), which is ≤ 1
//
// Assume events are sorted by timestamp.

/*
  1. Have 2 pointers representing the left and right window of events.
  2. Both pointers start at index 0.
  3. Each time a new event is included, check if it's an error. If so, increment error count.
  4. If the error count exceed maxErrors, move left pointer forward and decrement error count if the event dropped was an error.
  5. Check at each step if the window duration is the longest you've seen.
*/

function longestErrorFree(events, maxErrors) {
  let longestErrorFree = { start: 0, end: 0, duration: 0 };
  let left = 0;
  let right = 0;
  let errorCount = 0;
  for (const singleEvent of events) {
    if (singleEvent.error) errorCount++;
    while (errorCount > maxErrors) {
      if (events[left].error) errorCount--;
      left++;
    }
    const currentDuration = events[right].timestamp - events[left].timestamp;
    if (currentDuration > longestErrorFree.duration) {
      longestErrorFree = {
        ...longestErrorFree,
        start: events[left].timestamp,
        end: events[right].timestamp,
        duration: currentDuration,
      };
    }
    right++;
  }
  return longestErrorFree;
}

console.log(
  longestErrorFree(
    [
      { timestamp: 0, error: false },
      { timestamp: 100, error: true },
      { timestamp: 200, error: false },
      { timestamp: 300, error: true },
      { timestamp: 400, error: true },
      { timestamp: 500, error: false },
      { timestamp: 600, error: false },
      { timestamp: 700, error: false },
    ],
    1,
  ),
);

// ------------------------------------------------------------
// WARM-UP 1: Merge Two Sorted Lists
// ------------------------------------------------------------
// InterviewQuery confirms "Merge Sorted Lists" in LogRocket's
// question bank. LogRocket merges event streams from multiple
// sources (DOM mutations, network, console) into a single
// timeline sorted by timestamp.
//
// Given two sorted arrays, merge them into one sorted array.
//
// Example:
//   mergeSorted([1, 3, 5, 7], [2, 4, 6, 8])
//   → [1, 2, 3, 4, 5, 6, 7, 8]
//
// Constraint: O(n + m) time, O(n + m) space. No .sort().

/*
  1. Compare both arrays and push larger of each comparison into a new array until one array runs out.
  2. Whichever array still has elements to be reviewed will have to be concatenated to the merged array at the end. It's already sorted.
*/

function mergeSorted(a, b) {
  let aIndex = 0,
    bIndex = 0;
  let sortedArray = [];

  while (aIndex !== a.length && bIndex !== b.length) {
    if (a[aIndex] < b[bIndex]) {
      sortedArray.push(a[aIndex]);
      aIndex++;
    } else {
      sortedArray.push(b[bIndex]);
      bIndex++;
    }
  }

  return [
    ...sortedArray,
    ...a.slice(aIndex, a.length),
    ...b.slice(bIndex, b.length),
  ];
}

/*function mergeSorted(a, b) {
  return [...a, ...b].sort();
}*/

console.log(mergeSorted([1, 3, 5, 7], [2, 4, 6, 8]));
console.log(mergeSorted([], [1, 2, 3]));
console.log(mergeSorted([1], [1]));

// ------------------------------------------------------------
// WARM-UP 2: Find the Missing Number
// ------------------------------------------------------------
// Also confirmed in InterviewQuery's LogRocket bank.
// Useful pattern for detecting dropped events in a stream.
//
// Given an array containing n distinct numbers from 0 to n,
// find the one number missing from the range.
//
// Example:
//   findMissing([3, 0, 1]) → 2
//   findMissing([0, 1])    → 2
//   findMissing([9,6,4,2,3,5,7,0,1]) → 8
//
// Constraint: O(n) time, O(1) extra space.
// Hint: Gauss's formula, or XOR trick.

/*
  1. Assume only one number will be missing from the range.
  2. Based on length n, find the sum of the range of numbers.
  3. Find what number is left subtracting the given array range sum from the expected range sum.
  4. How to handle when the missing number is 0 or n, or if the array just contains 0 or 1
*/

function findMissing(nums) {
  // Not needed since the sum approach would take care of this case.
  // if (nums.length === 1) {
  //  return (nums[0] === 0) ? 1 : 0;
  // }

  // Use Gauss's formula to keep as O(1).
  // n * (n + 1) / 2
  // Where n is nums.length.
  // Then compare to the sum of nums array.


  const range = Array.from({length: nums.length + 1}, (v, i) => i);
  const sumRange = range.reduce((acc, curr) => acc + curr, 0);
  const sumNums = nums.reduce((acc, curr) => acc + curr, 0);

  return sumRange - sumNums;
}

console.log(findMissing([3, 0, 1]));
console.log(findMissing([0, 1]));
console.log(findMissing([9,6,4,2,3,5,7,0,1]));
console.log(findMissing([0]));
console.log(findMissing([1]));

// ------------------------------------------------------------
// PROBLEM 1: DOM Tree Diff — Changed Nodes
// ------------------------------------------------------------
// LogRocket captures an initial DOM snapshot (tree), then
// records mutations. Given two snapshots of a simple DOM tree
// (before and after), find all nodes whose `text` changed.
//
// Each node: { id, text, children: [] }
// IDs are stable across snapshots (same node = same id).
//
// Return an array of { id, oldText, newText } for every node
// where text differs. Order doesn't matter.
//
// Example:
//   const before = {
//     id: 1, text: "root", children: [
//       { id: 2, text: "hello", children: [] },
//       { id: 3, text: "world", children: [
//         { id: 4, text: "nested", children: [] }
//       ]}
//     ]
//   };
//   const after = {
//     id: 1, text: "root", children: [
//       { id: 2, text: "goodbye", children: [] },
//       { id: 3, text: "world", children: [
//         { id: 4, text: "changed", children: [] }
//       ]}
//     ]
//   };
//   diffTree(before, after)
//   → [
//     { id: 2, oldText: "hello", newText: "goodbye" },
//     { id: 4, oldText: "nested", newText: "changed" }
//   ]

/*
  1. Flatten the tree to allow for easy traversal of data.
  2. Use recursion to flatten the nested trees.
  3. Once flattened, do a comparison of before and after nodes, and return an array of the changes.
*/

function diffTree(before, after) {
  const mapBefore = new Map();
  const mapAfter = new Map();

  function flatten(tree, map) {
    map.set(tree.id, tree.text);
    for(const child of tree.children) flatten(child,map);
  }

  flatten(before, mapBefore);
  flatten(after, mapAfter);

  const changes = [];
  for(const [id, oldText] of mapBefore) {
    const newText = mapAfter.get(id);
    if(newText !== undefined && newText !== oldText) {
      changes.push({id, oldText, newText});
    }
  }
  return changes;
}

const before1 = {
  id: 1, text: "root", children: [
    { id: 2, text: "hello", children: [] },
    { id: 3, text: "world", children: [
      { id: 4, text: "nested", children: [] }
    ]}
  ]
};
const after1 = {
  id: 1, text: "root", children: [
    { id: 2, text: "goodbye", children: [] },
    { id: 3, text: "world", children: [
      { id: 4, text: "changed", children: [] }
    ]}
   ]
};
console.log(diffTree(before1, after1));

// ------------------------------------------------------------
// PROBLEM 2: Rate Limiter — Sliding Window Counter
// ------------------------------------------------------------
// LogRocket's SDK has circuit breakers that throttle recording
// when event volume spikes (e.g., runaway animations flooding
// DOM mutations). Build a rate limiter.
//
// Implement a class `RateLimiter` that:
//   - constructor(maxRequests, windowMs): at most `maxRequests`
//     allowed in any `windowMs` millisecond sliding window
//   - allow(timestamp): returns true if the request at this
//     timestamp is allowed, false if it should be throttled
//
// Example:
//   const limiter = new RateLimiter(3, 1000); // 3 per second
//   limiter.allow(100)  → true   (1st)
//   limiter.allow(400)  → true   (2nd)
//   limiter.allow(900)  → true   (3rd)
//   limiter.allow(950)  → false  (4th in 1000ms window → blocked)
//   limiter.allow(1100) → false  (still 3 in [100..1100] window)
//   limiter.allow(1101) → true   (window [101..1101] has 2: 400,900)
//
// Constraint: O(1) amortized per call.
// Hint: Use a queue and clean up expired entries.

/*
  1. Use a queue to add timestamps allowed in the window, but to also evict timestamps whose timestamps are more than the allowed window behind the current timestamp.
*/

class RateLimiter {
  constructor(maxRequests, windowMs) {
    this.max = maxRequests;
    this.window = windowMs;
    this.queue = [];
  }

  allow(timestamp) {
    while (this.queue.length > 0 && this.queue[0] < timestamp - this.window) {
      this.queue.shift();
    }
    if(this.queue.length < this.max) {
      this.queue.push(timestamp);
      return true;
    }
    return false;
  }
}

const limiter = new RateLimiter(3, 1000);
console.log(limiter.allow(100));   // true
console.log(limiter.allow(400));   // true
console.log(limiter.allow(900));   // true
console.log(limiter.allow(950));   // false
console.log(limiter.allow(1100));  // false
console.log(limiter.allow(1101)); // true

// ------------------------------------------------------------
// PROBLEM 3: Rage Click Detection
// ------------------------------------------------------------
// LogRocket detects "rage clicks" — when a frustrated user
// clicks the same element rapidly. Given a stream of click
// events with { element, timestamp }, detect all rage click
// sequences.
//
// A rage click = 3+ clicks on the same element within 1000ms.
// Return the element IDs that had rage clicks and the count
// of rage click incidents per element.
//
// Example:
//   detectRageClicks([
//     { element: "btn-submit", timestamp: 100 },
//     { element: "btn-submit", timestamp: 200 },
//     { element: "btn-submit", timestamp: 300 },  // rage! 3 clicks in 200ms
//     { element: "nav-link",   timestamp: 350 },
//     { element: "btn-submit", timestamp: 1500 },
//     { element: "btn-submit", timestamp: 1600 },
//     { element: "btn-submit", timestamp: 1700 },  // rage again
//     { element: "btn-submit", timestamp: 1800 },  // still in rage
//     { element: "nav-link",   timestamp: 5000 },
//     { element: "nav-link",   timestamp: 5050 },
//   ])
//   → { "btn-submit": 2 }  // 2 rage incidents, nav-link never hit 3
//
// A new rage incident starts when a qualifying click occurs
// after the previous rage sequence ended (i.e., after a gap
// of >1000ms from the last click on that element).

/*
  1. Use a map to store timestamps by element.
  2. Remove timestamps for an element if it is more than 1000ms from the current timestamp.
  3. If the number of timestamps is exactly 3, consider that a rage click and count it. Then reset the length of the stored timestamps.
*/

function detectRageClicks(events) {
  const clicks = new Map();
  const result = {};

  for (const {element, timestamp} of events) {
    if (!clicks.has(element)) clicks.set(element, []);
    const times = clicks.get(element);

    while (times.length > 0 && timestamp - times[0] > 1000) {
      times.shift();
    }
    times.push(timestamp);

    if (times.length === 3) {
      result[element] = (result[element] || 0) + 1;
      times.length = 0;
    }
  }
  return result;
}

console.log(detectRageClicks([
  { element: "btn-submit", timestamp: 100 },
  { element: "btn-submit", timestamp: 200 },
  { element: "btn-submit", timestamp: 300 },
  { element: "nav-link",   timestamp: 350 },
  { element: "btn-submit", timestamp: 1500 },
  { element: "btn-submit", timestamp: 1600 },
  { element: "btn-submit", timestamp: 1700 },
  { element: "btn-submit", timestamp: 1800 },
  { element: "nav-link",   timestamp: 5000 },
  { element: "nav-link",   timestamp: 5050 },
]));

// ------------------------------------------------------------
// PROBLEM 4: Session Replay Event Buffer
// ------------------------------------------------------------
// LogRocket's SDK buffers events in memory before sending them
// to the server in batches. The buffer has a max size (bytes)
// and a max age (ms). It flushes when EITHER limit is hit.
//
// Given an array of events (each with `timestamp` and `size`
// in bytes), and flush constraints (maxBytes, maxAgeMs),
// return the flush points — the indices at which the buffer
// would flush.
//
// The buffer starts fresh after each flush. The event that
// triggers the flush IS included in the flushed batch.
//
// Example:
//   findFlushPoints([
//     { timestamp: 0,    size: 100 },
//     { timestamp: 50,   size: 200 },
//     { timestamp: 100,  size: 150 },  // cumulative 450 bytes
//     { timestamp: 150,  size: 200 },  // cumulative 650 > 500 → flush!
//     { timestamp: 200,  size: 100 },  // new batch starts
//     { timestamp: 800,  size: 50 },
//     { timestamp: 1300, size: 50 },   // age 1100ms > 1000ms → flush!
//     { timestamp: 1350, size: 100 },
//   ], 500, 1000)
//   → [3, 6]
//
// Events are sorted by timestamp.

/*
  1. Store the first timestamp and the bytes grouped together.
  2. Have an array to store the index of flushes.
  3. If the grouped bytes exceeds maxByte or the current timestamp - first timestamp exceed maxAgeMs, flush (add index of flush to array) and reset the first timestamp and grouped bytes.
*/

function findFlushPoints(events, maxBytes, maxAgeMs) {
  let batchFirstTimestamp = null;
  let batchBytes = 0;
  const flushPoints = [];

  for (let i = 0; i < events.length; i++) {
    if (i === 0) batchFirstTimestamp = events[i].timestamp;

    if (batchFirstTimestamp === null) {
      batchFirstTimestamp = events[i].timestamp;
    }
    
    batchBytes += events[i].size;

    if (batchBytes >= maxBytes || (events[i].timestamp - batchFirstTimestamp) >= maxAgeMs) {
      flushPoints.push(i);
      batchFirstTimestamp = null;
      batchBytes = 0;
    }
  }
  return flushPoints;
}

console.log(findFlushPoints([
  { timestamp: 0,    size: 100 },
  { timestamp: 50,   size: 200 },
  { timestamp: 100,  size: 150 },
  { timestamp: 150,  size: 200 },
  { timestamp: 200,  size: 100 },
  { timestamp: 800,  size: 50 },
  { timestamp: 1300, size: 50 },
  { timestamp: 1350, size: 100 },
], 500, 1000));

// ------------------------------------------------------------
// PROBLEM 5: Funnel Drop-off Analysis
// ------------------------------------------------------------
// LogRocket does conversion funnel analysis. Given a funnel
// definition (ordered list of page URLs) and a list of user
// sessions, calculate the drop-off rate at each step.
//
// A user "completes" step i if they visit the pages in order
// (not necessarily consecutively — other pages can appear
// between funnel steps).
//
// Return an array of { step, page, entered, exited, dropOff }
// where dropOff is the percentage who entered but didn't
// continue to the next step.
//
// Example:
//   funnelAnalysis(
//     ["/home", "/pricing", "/signup", "/dashboard"],
//     [
//       ["/home", "/about", "/pricing", "/signup", "/dashboard"],  // completes all
//       ["/home", "/pricing", "/signup"],                          // drops after signup
//       ["/home", "/pricing", "/contact"],                         // drops after pricing
//       ["/home", "/docs"],                                        // drops after home
//       ["/about", "/contact"],                                    // never enters funnel
//     ]
//   )
//   → [
//     { step: 1, page: "/home",      entered: 4, exited: 1, dropOff: "25.0%" },
//     { step: 2, page: "/pricing",   entered: 3, exited: 1, dropOff: "33.3%" },
//     { step: 3, page: "/signup",    entered: 2, exited: 1, dropOff: "50.0%" },
//     { step: 4, page: "/dashboard", entered: 1, exited: 0, dropOff: "0.0%" },
//   ]
//
// "exited" = entered this step but didn't enter the next.
// For the last step, exited is always 0 (no next step).

/*
  1. Keep array tracking entry of each step in funnel.
  2. Compare each iteration in the session with each step in the funnel.
  3. Find the page in the session matching the funnel. Increment the entry count for that step, then move on to the next step in the funnel
  4. After analysis is complete, create exited array by subtracting step i from step i + 1. Last value will be 0 since there's no step after that.
  5. Form the results by including the dropOff as well.
*/

function funnelAnalysis(funnel, sessions) {
  const entered = new Array(funnel.length).fill(0);
  const exited = [];
  const result = [];

  for (const session of sessions) {
    let funnelIndex = 0;

    for (const page of session) {
      if (page === funnel[funnelIndex]) {
        entered[funnelIndex]++;
        funnelIndex++;
      }
    }
  }

  for (let i = 0; i < funnel.length; i++) {
    if (i === funnel.length - 1) {
      exited[i] = 0;
    }
    else {
      exited[i] = entered[i] - entered[i+1];
    }
    result.push({ step: i + 1, page: funnel[i], entered: entered[i], exited: exited[i], dropOff: `${(((exited[i])/entered[i]) * 100).toPrecision(3)}%`  })
  }

  return result;
}

console.log(funnelAnalysis(
  ["/home", "/pricing", "/signup", "/dashboard"],
  [
    ["/home", "/about", "/pricing", "/signup", "/dashboard"],
    ["/home", "/pricing", "/signup"],
    ["/home", "/pricing", "/contact"],
    ["/home", "/docs"],
    ["/about", "/contact"],
  ]
));