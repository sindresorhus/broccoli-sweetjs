var x$299 = $y(function (fac$300) {
        return function (n$301) {
            if (n$301 == 1)
                return 1;
            return n$301 * fac$300(n$301 - 1);
        };
    });
console.log(x$299(5));