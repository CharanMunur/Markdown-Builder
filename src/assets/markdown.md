# LeetCode 14 — Longest Common Prefix

## Pattern: Horizontal Scanning

### Approach
- Take the **first string** as the initial prefix.
- Compare it with each remaining string.
- **Shrink the prefix from the right** until it is a valid prefix of the current string.
- If the prefix becomes empty, return `""`.

---

### Invariant
After processing index `i`:
> `pref` is the **longest common prefix** of `strs[0..i]`

---

### Code
```java
class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) return "";

        String pref = strs[0];
        int prefLen = pref.length();

        for (int i = 1; i < strs.length; i++) {
            String tempPref = strs[i];

            while (prefLen > tempPref.length() || !tempPref.startsWith(pref)) {
                prefLen--;
                pref = pref.substring(0, prefLen);
                if (prefLen == 0) return "";
            }
        }
        return pref;
    }
}
```

---

### Dry Run

#### Input
```
["flower", "flow", "flight"]
```

#### Initialization
```
pref = "flower"
prefLen = 6
```

#### i = 1 → "flow"

| pref | prefLen | Condition | Action |
|------|---------|-----------|--------|
| flower | 6 | 6 > 4 | shrink |
| flowe | 5 | 5 > 4 | shrink |
| flow | 4 | startsWith ✔ | stop |

**Result:**
```
pref = "flow"
```

#### i = 2 → "flight"

| pref | prefLen | Condition | Action |
|------|---------|-----------|--------|
| flow | 4 | startsWith ✖ | shrink |
| flo | 3 | startsWith ✖ | shrink |
| fl | 2 | startsWith ✔ | stop |

#### Final Output
```
"fl"
```

---

### Complexity
- **Time**: O(N × M)
  - N = number of strings
  - M = length of shortest string (worst case)
- **Space**: O(1) (excluding output)