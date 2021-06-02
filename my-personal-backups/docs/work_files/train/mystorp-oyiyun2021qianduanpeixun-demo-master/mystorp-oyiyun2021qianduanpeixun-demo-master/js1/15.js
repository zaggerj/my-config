function run(expr){
    let [, n1, op, n2] = /^(\d+)([-\+\*\/])(\d+)$/.exec(expr);
    let value;
    switch(op) {
        case "+":
            value = n1 * 1 + n2 * 1;
            break;
        case "-":
            value = n1 - n2;
            break;
        case "*":
            value = n1 * n2;
            break;
        case "/":
            value = n1 / n2;
            break;
    }
    return value;
}
