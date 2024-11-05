import sys

day_input = sys.stdin.read().strip()


def rle_encode(s: str) -> str:
    res = ""
    cnt, prev = None, None
    for ch in s:
        if not cnt and not prev:
            prev = ch
            cnt = 1
        elif ch != prev:
            res += f"{cnt}{prev}"
            prev = ch
            cnt = 1
        else:
            cnt += 1
    if cnt > 0:
        res += f"{cnt}{prev}"
    return res


# Part 1
part_1 = day_input
i = 0
while i < 40:
    part_1 = rle_encode(part_1)
    i += 1

# Part 2
part_2 = day_input
i = 0
while i < 50:
    part_2 = rle_encode(part_2)
    i += 1

print("Part 1:", len(part_1))
print("Part 2:", len(part_2))
