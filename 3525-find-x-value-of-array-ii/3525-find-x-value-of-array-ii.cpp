class Solution {
public:
    struct Node {
        int prod = 1;
        array<int, 5> cnt{0, 0, 0, 0, 0};
    };

    int k;

    Node mergeNode(const Node& a, const Node& b) {
        Node res;
        res.prod = (a.prod * b.prod) % k;

        for (int r = 0; r < k; r++) {
            res.cnt[r] += a.cnt[r];
        }

        for (int r = 0; r < k; r++) {
            int nr = (a.prod * r) % k;
            res.cnt[nr] += b.cnt[r];
        }

        return res;
    }

    vector<int> resultArray(vector<int>& nums, int K, vector<vector<int>>& queries) {
        k = K;
        int n = nums.size();

        int size = 1;
        while (size < n) size <<= 1;

        vector<Node> seg(2 * size);

        for (int i = 0; i < n; i++) {
            int v = nums[i] % k;
            seg[size + i].prod = v;
            seg[size + i].cnt[v] = 1;
        }

        for (int i = size - 1; i >= 1; i--) {
            seg[i] = mergeNode(seg[i << 1], seg[i << 1 | 1]);
        }

        auto update = [&](int pos, int val) {
            int p = size + pos;

            val %= k;

            seg[p].prod = val;
            seg[p].cnt = {0, 0, 0, 0, 0};
            seg[p].cnt[val] = 1;

            p >>= 1;

            while (p) {
                seg[p] = mergeNode(seg[p << 1], seg[p << 1 | 1]);
                p >>= 1;
            }
        };

        auto query = [&](int l, int r) {
            Node left, right;

            l += size;
            r += size + 1;

            while (l < r) {
                if (l & 1)
                    left = mergeNode(left, seg[l++]);

                if (r & 1)
                    right = mergeNode(seg[--r], right);

                l >>= 1;
                r >>= 1;
            }

            return mergeNode(left, right);
        };

        vector<int> ans;
        ans.reserve(queries.size());

        for (auto& q : queries) {
            int index = q[0];
            int value = q[1];
            int start = q[2];
            int x = q[3];

            update(index, value);

            Node res = query(start, n - 1);

            ans.push_back(res.cnt[x]);
        }

        return ans;
    }
};