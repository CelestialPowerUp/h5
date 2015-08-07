yangaiche(sys.local_storage).set('a', 'a is bbbb.');
console.log(yangaiche(sys.local_storage).get('a'));

function isObject(value) {
    return value === Object(value);
}

console.log(isObject());
console.log(isObject(null));
console.log(isObject(undefined));
console.log(isObject(1));
console.log(isObject('1'));
console.log(isObject(true));
console.log(isObject({}));
console.log(isObject([]));
console.log(isObject(function() {}));

function isObject2(value) {
    if (value === undefined || value === null) {
        return false;
    }

    if (typeof value === "object") {
        return true;
    }
    return false;
}

console.log('------------------------------');
console.log(isObject2());
console.log(isObject2(null));
console.log(isObject2(undefined));
console.log(isObject2(1));
console.log(isObject2('1'));
console.log(isObject2(true));
console.log(isObject2({}));
console.log(isObject2([]));
console.log(isObject2(function() {}));