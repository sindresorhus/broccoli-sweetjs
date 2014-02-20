// y-combinator
macro $y {
    rule {( $var )} => {
        function(){
            return function (f){
                return f(f)
            }(function(f){
                return $var(function(x){
                    return f(f)(x);
                })
            });
        }()
    }
    rule {( function $pars $body )} => {
        function(){
            return function(f){
                return f(f)
            }(function(f){
                return function $pars $body(function(x){
                    return f(f)(x);
                })
            });
        }()
    }
}
