// ============================================================
// LogRocket Technical Interview — Practice Problems Set 2
// ============================================================
// Patterns: tree traversal, merging, rate limiting, tries,
//           serialization, graph paths, queue design
//
// These cover patterns NOT in Set 1 — specifically:
//   - DOM tree operations (LogRocket's core data structure)
//   - Merge sorted streams (confirmed InterviewQuery bank)
//   - Rate limiting (SDK circuit breaker logic)
//   - Event buffering (main thread → worker architecture)
//
// Same rules: talk out loud, start brute force, optimize.
// ============================================================

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

function mergeSorted(a, b) {
  // Your solution here
}

// console.log(mergeSorted([1, 3, 5, 7], [2, 4, 6, 8]));
// console.log(mergeSorted([], [1, 2, 3]));
// console.log(mergeSorted([1], [1]));

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

function findMissing(nums) {
  // Your solution here
}

// console.log(findMissing([3, 0, 1]));
// console.log(findMissing([0, 1]));
// console.log(findMissing([9,6,4,2,3,5,7,0,1]));

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

function diffTree(before, after) {
  // Your solution here
}

// const before1 = {
//   id: 1, text: "root", children: [
//     { id: 2, text: "hello", children: [] },
//     { id: 3, text: "world", children: [
//       { id: 4, text: "nested", children: [] }
//     ]}
//   ]
// };
// const after1 = {
//   id: 1, text: "root", children: [
//     { id: 2, text: "goodbye", children: [] },
//     { id: 3, text: "world", children: [
//       { id: 4, text: "changed", children: [] }
//     ]}
//   ]
// };
// console.log(diffTree(before1, after1));

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

class RateLimiter {
  constructor(maxRequests, windowMs) {
    // Your solution here
  }

  allow(timestamp) {
    // Your solution here
  }
}

// const limiter = new RateLimiter(3, 1000);
// console.log(limiter.allow(100));   // true
// console.log(limiter.allow(400));   // true
// console.log(limiter.allow(900));   // true
// console.log(limiter.allow(950));   // false
// console.log(limiter.allow(1100));  // false
// console.log(limiter.allow(1101)); // true

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

function detectRageClicks(events) {
  // Your solution here
}

// console.log(detectRageClicks([
//   { element: "btn-submit", timestamp: 100 },
//   { element: "btn-submit", timestamp: 200 },
//   { element: "btn-submit", timestamp: 300 },
//   { element: "nav-link",   timestamp: 350 },
//   { element: "btn-submit", timestamp: 1500 },
//   { element: "btn-submit", timestamp: 1600 },
//   { element: "btn-submit", timestamp: 1700 },
//   { element: "btn-submit", timestamp: 1800 },
//   { element: "nav-link",   timestamp: 5000 },
//   { element: "nav-link",   timestamp: 5050 },
// ]));

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

function findFlushPoints(events, maxBytes, maxAgeMs) {
  // Your solution here
}

// console.log(findFlushPoints([
//   { timestamp: 0,    size: 100 },
//   { timestamp: 50,   size: 200 },
//   { timestamp: 100,  size: 150 },
//   { timestamp: 150,  size: 200 },
//   { timestamp: 200,  size: 100 },
//   { timestamp: 800,  size: 50 },
//   { timestamp: 1300, size: 50 },
//   { timestamp: 1350, size: 100 },
// ], 500, 1000));

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

function funnelAnalysis(funnel, sessions) {
  // Your solution here
}

// console.log(funnelAnalysis(
//   ["/home", "/pricing", "/signup", "/dashboard"],
//   [
//     ["/home", "/about", "/pricing", "/signup", "/dashboard"],
//     ["/home", "/pricing", "/signup"],
//     ["/home", "/pricing", "/contact"],
//     ["/home", "/docs"],
//     ["/about", "/contact"],
//   ]
// ));

// ------------------------------------------------------------
// PROBLEM 6: Network Waterfall — Critical Path
// ------------------------------------------------------------
// LogRocket captures network requests for performance analysis.
// Given a set of network requests with start time, duration,
// and dependencies (request B depends on response from A),
// find the critical path — the longest chain of sequential
// requests that determines total page load time.
//
// Each request: { id, start, duration, dependsOn: [ids] }
// A request can only start after ALL its dependencies finish.
//
// Return { path: [ids], totalTime } of the critical path.
//
// Example:
//   criticalPath([
//     { id: "html",   start: 0,   duration: 100, dependsOn: [] },
//     { id: "css",    start: 100, duration: 50,  dependsOn: ["html"] },
//     { id: "js",     start: 100, duration: 200, dependsOn: ["html"] },
//     { id: "api",    start: 300, duration: 150, dependsOn: ["js"] },
//     { id: "img",    start: 150, duration: 80,  dependsOn: ["css"] },
//     { id: "render", start: 450, duration: 50,  dependsOn: ["api", "css"] },
//   ])
//   → { path: ["html", "js", "api", "render"], totalTime: 500 }
//   // html(100) + js(200) + api(150) + render(50) = 500
//   // The css→img path is shorter, so it's not critical
//
// Hint: This is a DAG longest path problem. Topological sort
// + dynamic programming.

function criticalPath(requests) {
  // Your solution here
}

// console.log(criticalPath([
//   { id: "html",   start: 0,   duration: 100, dependsOn: [] },
//   { id: "css",    start: 100, duration: 50,  dependsOn: ["html"] },
//   { id: "js",     start: 100, duration: 200, dependsOn: ["html"] },
//   { id: "api",    start: 300, duration: 150, dependsOn: ["js"] },
//   { id: "img",    start: 150, duration: 80,  dependsOn: ["css"] },
//   { id: "render", start: 450, duration: 50,  dependsOn: ["api", "css"] },
// ]));

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

// --- SOLUTION: Merge Sorted ---
// Key insight: two pointers, advance the smaller one
// Time: O(n + m), Space: O(n + m)
function mergeSortedSolution(a, b) {
  const result = [];
  let i = 0,
    j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) result.push(a[i++]);
    else result.push(b[j++]);
  }
  while (i < a.length) result.push(a[i++]);
  while (j < b.length) result.push(b[j++]);
  return result;
}

// --- SOLUTION: Find Missing ---
// Key insight: sum of 0..n minus sum of array = missing
// Time: O(n), Space: O(1)
function findMissingSolution(nums) {
  const n = nums.length;
  const expected = (n * (n + 1)) / 2;
  const actual = nums.reduce((sum, x) => sum + x, 0);
  return expected - actual;
}

// --- SOLUTION: DOM Tree Diff ---
// Key insight: flatten both trees into id→text maps, compare
// Time: O(n), Space: O(n)
function diffTreeSolution(before, after) {
  const mapBefore = new Map();
  const mapAfter = new Map();

  function collect(node, map) {
    map.set(node.id, node.text);
    for (const child of node.children) collect(child, map);
  }

  collect(before, mapBefore);
  collect(after, mapAfter);

  const changes = [];
  for (const [id, oldText] of mapBefore) {
    const newText = mapAfter.get(id);
    if (newText !== undefined && newText !== oldText) {
      changes.push({ id, oldText, newText });
    }
  }
  return changes;
}

// --- SOLUTION: Rate Limiter ---
// Key insight: queue of timestamps, evict expired on each call
// Time: O(1) amortized, Space: O(maxRequests)
class RateLimiterSolution {
  constructor(maxRequests, windowMs) {
    this.max = maxRequests;
    this.window = windowMs;
    this.queue = [];
  }

  allow(timestamp) {
    // Evict timestamps outside the window
    while (this.queue.length > 0 && this.queue[0] <= timestamp - this.window) {
      this.queue.shift();
    }
    if (this.queue.length < this.max) {
      this.queue.push(timestamp);
      return true;
    }
    return false;
  }
}

// --- SOLUTION: Rage Click Detection ---
// Key insight: per-element sliding window of click timestamps
// When window has 3+ clicks within 1000ms, it's a rage click.
// Track sequences to count distinct incidents.
// Time: O(n), Space: O(unique elements)
function detectRageClicksSolution(events) {
  const clicks = new Map(); // element → [timestamps]
  const result = {};

  for (const { element, timestamp } of events) {
    if (!clicks.has(element)) clicks.set(element, []);
    const times = clicks.get(element);

    // Remove clicks outside the 1000ms window
    while (times.length > 0 && timestamp - times[0] > 1000) {
      times.shift();
    }
    times.push(timestamp);

    // Check if this is a new rage click (exactly hitting 3)
    if (times.length === 3) {
      result[element] = (result[element] || 0) + 1;
      // Reset window to start fresh rage detection
      times.length = 0;
    }
  }
  return result;
}

// --- SOLUTION: Session Replay Event Buffer ---
// Key insight: linear scan tracking cumulative bytes and
// batch start time; reset both on flush
// Time: O(n), Space: O(1) aside from output
function findFlushPointsSolution(events, maxBytes, maxAgeMs) {
  const flushPoints = [];
  let batchBytes = 0;
  let batchStart = events[0]?.timestamp ?? 0;

  for (let i = 0; i < events.length; i++) {
    batchBytes += events[i].size;
    const age = events[i].timestamp - batchStart;

    if (batchBytes > maxBytes || age > maxAgeMs) {
      flushPoints.push(i);
      batchBytes = 0;
      batchStart = events[i + 1]?.timestamp ?? 0;
    }
  }
  return flushPoints;
}

// --- SOLUTION: Funnel Drop-off Analysis ---
// Key insight: for each session, greedily match funnel steps
// in order (subsequence matching). Count how many sessions
// reach each step.
// Time: O(sessions * max(session_length, funnel_length))
function funnelAnalysisSolution(funnel, sessions) {
  const reached = new Array(funnel.length).fill(0);

  for (const session of sessions) {
    let funnelIdx = 0;
    for (const page of session) {
      if (funnelIdx < funnel.length && page === funnel[funnelIdx]) {
        reached[funnelIdx]++;
        funnelIdx++;
      }
    }
  }

  return funnel.map((page, i) => ({
    step: i + 1,
    page,
    entered: reached[i],
    exited: i < funnel.length - 1 ? reached[i] - reached[i + 1] : 0,
    dropOff:
      i < funnel.length - 1
        ? (((reached[i] - reached[i + 1]) / reached[i]) * 100).toFixed(1) + "%"
        : "0.0%",
  }));
}

// --- SOLUTION: Network Waterfall — Critical Path ---
// Key insight: DAG longest path via topological sort + DP.
// For each node, compute earliest finish time = max(dependency
// finish times) + own duration. Track predecessors to
// reconstruct the path.
// Time: O(V + E), Space: O(V)
function criticalPathSolution(requests) {
  const byId = new Map();
  for (const req of requests) byId.set(req.id, req);

  // Compute earliest finish time for each request (memoized DFS)
  const finish = new Map(); // id → earliest finish time
  const prev = new Map(); // id → predecessor on critical path

  function computeFinish(id) {
    if (finish.has(id)) return finish.get(id);
    const req = byId.get(id);
    let earliestStart = 0;
    let pred = null;

    for (const depId of req.dependsOn) {
      const depFinish = computeFinish(depId);
      if (depFinish > earliestStart) {
        earliestStart = depFinish;
        pred = depId;
      }
    }

    finish.set(id, earliestStart + req.duration);
    prev.set(id, pred);
    return finish.get(id);
  }

  // Compute all finish times
  for (const req of requests) computeFinish(req.id);

  // Find the request with the latest finish time
  let lastId = null;
  let maxFinish = 0;
  for (const [id, t] of finish) {
    if (t > maxFinish) {
      maxFinish = t;
      lastId = id;
    }
  }

  // Reconstruct path
  const path = [];
  let current = lastId;
  while (current !== null) {
    path.push(current);
    current = prev.get(current);
  }
  path.reverse();

  return { path, totalTime: maxFinish };
}
