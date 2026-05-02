// ============================================================
// LogRocket Technical Interview — Practice Problems (JavaScript)
// ============================================================
// Patterns: hash maps, string manipulation, sliding window,
//           event stream processing, frequency counting
//
// Work through these in order. Each builds on fundamentals
// that the next one needs. Talk out loud as you solve —
// that's what Isaac will evaluate.
//
// Tips for CoderPad:
//   - Talk through your approach BEFORE writing code
//   - Start brute force, then optimize
//   - Use console.log() to verify incrementally
//   - Ask clarifying questions about edge cases
// ============================================================


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

function groupAnagrams(strs) {
  // Your solution here
}

// console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));
// console.log(groupAnagrams([""]));
// console.log(groupAnagrams(["a"]));


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

function twoSum(nums, target) {
  // Your solution here
}

// console.log(twoSum([2, 7, 11, 15], 9));
// console.log(twoSum([3, 2, 4], 6));


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

function deduplicateEvents(events, windowMs) {
  // Your solution here
}

// console.log(deduplicateEvents([
//   { type: "click", timestamp: 1000 },
//   { type: "click", timestamp: 1050 },
//   { type: "scroll", timestamp: 1100 },
//   { type: "click", timestamp: 1300 },
//   { type: "scroll", timestamp: 1250 },
// ], 200));


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

function findCommonPaths(sessions, k) {
  // Your solution here
}

// console.log(findCommonPaths([
//   ["/home", "/pricing", "/signup", "/dashboard"],
//   ["/home", "/pricing", "/signup"],
//   ["/home", "/docs", "/pricing", "/signup"],
//   ["/home", "/pricing", "/contact"],
// ], 3));


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

function findAlertIndex(logs, w, threshold) {
  // Your solution here
}

// console.log(findAlertIndex(
//   ["ok","ok","error","error","ok","error","error","ok"],
//   4,
//   0.5
// ));
// console.log(findAlertIndex(["ok","ok","ok"], 2, 0.5)); // → -1


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

function compressMutations(mutations) {
  // Your solution here
}

// console.log(compressMutations([
//   { nodeId: 1, attribute: "class", value: "hidden" },
//   { nodeId: 2, attribute: "style", value: "color:red" },
//   { nodeId: 1, attribute: "class", value: "visible" },
//   { nodeId: 2, attribute: "style", value: "color:blue" },
//   { nodeId: 1, attribute: "id", value: "main" },
// ]));


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

function longestErrorFree(events, maxErrors) {
  // Your solution here
}

// console.log(longestErrorFree([
//   { timestamp: 0, error: false },
//   { timestamp: 100, error: true },
//   { timestamp: 200, error: false },
//   { timestamp: 300, error: true },
//   { timestamp: 400, error: true },
//   { timestamp: 500, error: false },
//   { timestamp: 600, error: false },
//   { timestamp: 700, error: false },
// ], 1));


// ============================================================
// SOLUTION KEY — Try each problem first, then check below
// ============================================================
// Scroll down when ready...
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// --- SOLUTION: Group Anagrams ---
// Key insight: sort each string's chars → use as hash map key
// Time: O(n * k log k) where k = max string length
function groupAnagramsSolution(strs) {
  const map = new Map();
  for (const str of strs) {
    const key = str.split("").sort().join("");
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(str);
  }
  return [...map.values()];
}

// --- SOLUTION: Two Sum ---
// Key insight: store complement in hash map as you iterate
// Time: O(n), Space: O(n)
function twoSumSolution(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
  return [];
}

// --- SOLUTION: Session Event Deduplication ---
// Key insight: hash map tracks last seen timestamp per event type
// Time: O(n), Space: O(unique types)
function deduplicateEventsSolution(events, windowMs) {
  const lastSeen = new Map();
  return events.filter((event) => {
    const prev = lastSeen.get(event.type);
    if (prev !== undefined && event.timestamp - prev < windowMs) {
      return false;
    }
    lastSeen.set(event.type, event.timestamp);
    return true;
  });
}

// --- SOLUTION: Most Common User Paths ---
// Key insight: sliding window of size k over each session,
// join as string key, count frequencies
// Time: O(total_pages * k), Space: O(unique paths)
function findCommonPathsSolution(sessions, k) {
  const freq = new Map();
  for (const session of sessions) {
    for (let i = 0; i <= session.length - k; i++) {
      const path = session.slice(i, i + k).join(" → ");
      freq.set(path, (freq.get(path) || 0) + 1);
    }
  }
  let maxPath = "";
  let maxCount = 0;
  for (const [path, count] of freq) {
    if (count > maxCount) {
      maxCount = count;
      maxPath = path;
    }
  }
  return maxPath;
}

// --- SOLUTION: Error Rate Threshold Alert ---
// Key insight: sliding window, track error count in window
// Time: O(n), Space: O(1)
function findAlertIndexSolution(logs, w, threshold) {
  let errors = 0;
  for (let i = 0; i < logs.length; i++) {
    if (logs[i] === "error") errors++;
    if (i >= w) {
      if (logs[i - w] === "error") errors--;
    }
    if (i >= w - 1 && errors / w > threshold) {
      return i;
    }
  }
  return -1;
}

// --- SOLUTION: DOM Mutation Compression ---
// Key insight: traverse backwards — first time you see a
// (nodeId, attribute) pair is the last mutation. Then reverse.
// Time: O(n), Space: O(n)
function compressMutationsSolution(mutations) {
  const seen = new Set();
  const result = [];
  for (let i = mutations.length - 1; i >= 0; i--) {
    const key = `${mutations[i].nodeId}:${mutations[i].attribute}`;
    if (!seen.has(key)) {
      seen.add(key);
      result.push(mutations[i]);
    }
  }
  return result.reverse();
}

// --- SOLUTION: Longest Error-Free Session Segment ---
// Key insight: classic two-pointer / sliding window
// Expand right, shrink left when errors exceed max
// Time: O(n), Space: O(1)
function longestErrorFreeSolution(events, maxErrors) {
  let left = 0;
  let errors = 0;
  let best = { start: events[0].timestamp, end: events[0].timestamp, duration: 0 };

  for (let right = 0; right < events.length; right++) {
    if (events[right].error) errors++;
    while (errors > maxErrors) {
      if (events[left].error) errors--;
      left++;
    }
    const duration = events[right].timestamp - events[left].timestamp;
    if (duration > best.duration) {
      best = { start: events[left].timestamp, end: events[right].timestamp, duration };
    }
  }
  return best;
}
