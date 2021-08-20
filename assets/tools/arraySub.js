export default function arrSubtraction(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
        return a.filter((i) => !b.includes(i));
    }
    throw new new TypeError("arguments must be array")();
}

