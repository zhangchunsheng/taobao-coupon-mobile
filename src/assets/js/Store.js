export function saveToLocal (id, key, value) {
    let lmsq = window.localStorage.__lmsq__
    if (!lmsq) {
        lmsq = {}
        lmsq[key] = {}
        lmsq[key][id] = value
    } else {
        lmsq = JSON.parse(lmsq)
        if (!lmsq[key]) {
            lmsq[key] = {}
        }
    }
    lmsq[key][id] = value
    window.localStorage.__lmsq__ = JSON.stringify(lmsq)
}
export function deleteToLocal (id, key, def) {
    let lmsq = window.localStorage.__lmsq__
    if (!lmsq) {
        return def
    }
    lmsq = JSON.parse(lmsq)
    if (!lmsq[key]) {
        return def
    }
    let obj = {}
    for (let k in lmsq[key]) {
        if (id !== k) {
            obj[k] = lmsq[key][k]
        }
    }
    lmsq[key] = obj
    window.localStorage.__lmsq__ = JSON.stringify(lmsq)
}
export function loadFromLocal (id, key, def) {
    let lmsq = window.localStorage.__lmsq__
    if (!lmsq) {
        return def
    }
    lmsq = JSON.parse(lmsq)[key]
    if (!lmsq) {
        return def
    }
    let ret
    if (id) {
        ret = lmsq[id]
    } else {
        ret = lmsq
    }
    return ret || def
}

export function saveKeyToLocal (key, value) {
    let lmsq = window.localStorage.__lmsq__
    if (!lmsq) {
        lmsq = {}
        lmsq[key] = []
        lmsq[key] = [value]
    } else {
        lmsq = JSON.parse(lmsq)
        if (!lmsq[key]) {
            lmsq[key] = []
        }
        if (lmsq[key].indexOf(value) === -1) {
            if (lmsq[key].length > 19) {
                lmsq[key].pop()
            }
            lmsq[key].unshift(value)
        } else {
            return 
        }
    }
    window.localStorage.__lmsq__ = JSON.stringify(lmsq)
}

export function loadKeyFromLocal (key, def) {
    let lmsq = window.localStorage.__lmsq__
    if (!lmsq) {
        return def
    }
    lmsq = JSON.parse(lmsq)[key]
    if (!lmsq) {
        return def
    }
    let ret = lmsq
    return ret || def
}
export function clearKeyToLocal (key, def) {
    let lmsq = window.localStorage.__lmsq__
    if (!lmsq) {
        lmsq = {}
        lmsq[key] = []
        return def
    }
    lmsq = JSON.parse(lmsq)
    lmsq[key] = []
    window.localStorage.__lmsq__ = JSON.stringify(lmsq)
}
