var ProductOfNumbers = function() {
    this.prefix = [1];
};

ProductOfNumbers.prototype.add = function(num) {
    if (num === 0) this.prefix = [1];
     else this.prefix.push(this.prefix[this.prefix.length - 1] * num);
}

ProductOfNumbers.prototype.getProduct = function(k) {
    const n = this.prefix.length - 1;

    if (k > n) return 0;

    return this.prefix[n] / this.prefix[n - k];
};