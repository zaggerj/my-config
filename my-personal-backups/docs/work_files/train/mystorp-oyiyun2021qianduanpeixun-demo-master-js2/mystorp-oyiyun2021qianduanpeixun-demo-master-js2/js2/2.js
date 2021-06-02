/**
 * @param {String} expr 四则运算表达式
 * @returns {Number}
 */
function run(expr){
    // 这里不考虑嵌套括号
    let quoteStart = expr.indexOf("(");
    let quoteEnd = expr.indexOf(")");
    let tokens, tokenIndex, num1, op, num2, hit;
    if(quoteStart > -1 && quoteEnd > -1) {
        let subValue = run(expr.substring(quoteStart + 1, quoteEnd));
        tokens = getTokens(expr.substring(0, quoteStart)).concat(subValue).concat(getTokens(expr.substring(quoteEnd + 1)));
    } else {
        tokens = getTokens(expr);
    }
    while(tokens.length > 1) {
        tokenIndex = 0;
        hit = false;
        while(tokenIndex < tokens.length) {
            num1 = tokens[tokenIndex - 1];
            op = tokens[tokenIndex];
            num2 = tokens[tokenIndex + 1];
            if(tokens[tokenIndex] === "*") {
                tokens.splice(tokenIndex - 1, 3, evaluate(num1, op, num2));
                hit = true;
                break;
            } else if(tokens[tokenIndex] === "/") {
                tokens.splice(tokenIndex - 1, 3, evaluate(num1, op, num2));
                hit = true;
                break;
            }
            tokenIndex++;
        }
        if(hit) { continue; }
        tokenIndex = 0;
        while(tokenIndex < tokens.length) {
            num1 = tokens[tokenIndex - 1];
            op = tokens[tokenIndex];
            num2 = tokens[tokenIndex + 1];
            if(tokens[tokenIndex] === "-") {
                tokens.splice(tokenIndex - 1, 3, evaluate(num1, op, num2));
                hit = true;
                break;
            } else if(tokens[tokenIndex] === "+") {
                tokens.splice(tokenIndex - 1, 3, evaluate(num1, op, num2));
                hit = true;
                break;
            }
            tokenIndex++;
        }
        if(hit) { continue; }
        break;
    }
    return tokens[0];
}

/**
 * @param {Number} num1 操作数1
 * @param { "+" | "-" | "*" | "/" } op 操作符
 * @param {Number} num2 操作数2
 * @returns {Number}
 */
function evaluate(num1, op, num2) {
    if(isNaN(num1) || isNaN(num2)) {
        throw new Error("token error, number expected!");
    }
    let value = 0;
    switch(op) {
        case "+":
            value = num1 + num2;
            break;
        case "-":
            value = num1 - num2;
            break;
        case "*":
            value = num1 * num2;
            break;
        case "/":
            if(num2 === 0) {
                throw new Error("divide by zero!");
            }
            value = Math.floor(num1 / num2);
            break;
        default:
            throw new Error("operator error: " + op);
    }
    return value;
}

function getTokens(expr){
    let tokens = [], i = 0, len = expr.length, c;
    let buf = [];
    const digits = "0123456789";
    const operators = "+-*/";
    for(; i < len; i++) {
        c = expr.charAt(i);
        if(digits.indexOf(c) > -1) {
            buf.push(c);
        } else if(operators.indexOf(c) > -1) {
            if(buf.length > 0) {
                tokens.push(buf.join("") * 1);
                buf = [];
            }
            tokens.push(c);
        } else {
            throw new Error("unexpected character: " + c + " (1:" + i + ")");
        }
    }
    if(buf.length > 0) {
        tokens.push(buf.join("") * 1);
    }
    return tokens;
}
