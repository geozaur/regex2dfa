function shuntingYard(tokens, symbols, operators) {
    output = [];
    ops = [];

    tokens.forEach(token => {
        if (symbols.indexOf(token) >= 0) {
            output.push(token);
        } else if (token == '(') {
            ops.push(token);
        } else if (token == ')') {
            while (ops.length > 0 && ops[ops.length - 1] != '(') {
                output.push(ops.pop());
            }
            ops.pop();
        } else if (token in operators) {
            while (ops.length > 0 &&
                ops[ops.length - 1] != '(' &&
                operators[ops[ops.length - 1]] >= operators[token]) {
                output.push(ops.pop());
            }
            ops.push(token);
        }
    });

    while (ops.length > 0) {
        let token = ops.pop();

        if (token == '(' || token == ')') {
            throw Error('Expression is not well-formed!');
        }

        output.push(token);
    }

    return output;
}

// let stack = shuntingYard(['(', '3', '+', '4', ')', '*', '2'], ['1', '2', '3', '4'], {
//     '+': 0,
//     '-': 0,
//     '*': 1,
//     '(': -1,
//     ')': -1
// });

// stack.forEach(elem => console.log(elem));