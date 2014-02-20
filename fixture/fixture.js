var x = $y(function(fac){ return function(n){ if(n == 1) return 1; return n * fac(n-1); }});console.log(x(5));
