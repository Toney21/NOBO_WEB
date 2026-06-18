function baseClone(src, circulars, clones) {
    if (!src || typeof src !== 'object' || typeof src === 'function') {
        return src
    }

    if (src.nodeType && 'cloneNode' in src) {
        return src.cloneNode(true)
    }

    if (src instanceof Date) {
        return new Date(src.getTime())
    }

    if (src instanceof RegExp) {
        return new RegExp(src)
    }

    if (Array.isArray(src)) {
        return src.map((item) => clone(item))
    }

    if (typeof Map !== 'undefined' && src instanceof Map) {
        return new Map(Array.from(src.entries()))
    }

    if (typeof Set !== 'undefined' && src instanceof Set) {
        return new Set(Array.from(src.values()))
    }

    if (src instanceof Object) {
        circulars.push(src)
        const obj = Object.create(Object.getPrototypeOf(src))
        clones.push(obj)

        Object.keys(src).forEach((key) => {
            const idx = circulars.findIndex((item) => item === src[key])
            obj[key] = idx > -1 ? clones[idx] : baseClone(src[key], circulars, clones)
        })

        return obj
    }

    return src
}

function clone(src) {
    return baseClone(src, [], [])
}

module.exports = clone
module.exports.default = clone
