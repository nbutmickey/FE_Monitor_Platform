function createRandomId() {
    return (Math.random() * 10000000).toString(26).substr(0, 5) + '-' + (new Date()).getTime().toString(36) + '-' + Math.random().toString(15).substr(2, 8);
}

console.log(createRandomId());    