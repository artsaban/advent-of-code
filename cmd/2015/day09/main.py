import sys
import re
import itertools
from collections import defaultdict

line_regex = re.compile(r"(\w+) to (\w+) = (\d+)")
graph = defaultdict(dict)
cities = set()

for line in sys.stdin:
    m = line_regex.match(line)
    if m:
        from_city, to_city, distance = m[1], m[2], int(m[3])
        cities.add(from_city)
        cities.add(to_city)
        graph[from_city][to_city] = distance
        graph[to_city][from_city] = distance

cur_min = float('inf')
cur_max = float('-inf')
permutations = itertools.permutations(cities)

for permutation in permutations:
    path_len = 0
    for i in range(len(permutation)-1):
        path_len += graph[permutation[i]][permutation[i+1]]
    cur_min = min(path_len, cur_min)
    cur_max = max(path_len, cur_max)

print("Part 1:", cur_min)
print("Part 2:", cur_max)
