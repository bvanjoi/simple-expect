interface TestMethods {
  equal(expected: any): void,
  is(expected: any): void,
}

interface Assertion extends TestMethods {
  not: Assertion;
}

interface Context {
  not: boolean,
}

function equal(actual: any, expected: any): boolean {
  if (typeof actual !== typeof expected) {
    return false;
  }
  switch (typeof actual) {
    case "bigint":
      return actual === expected;
    default:
      // TODO: map, set....
      return JSON.stringify(actual) === JSON.stringify(expected);
  }
}

function is(actual: any, expected: any): boolean {
  return actual === expected;
}

function stringify(arg: any): string {
  switch (typeof arg) {
    case "bigint":
    case "function":
      return arg.toString();
    default:
    // TODO: map, set....
    return JSON.stringify(arg);
  }
}

function reset() {
  return '\x1b[0m';
}

function red(arg: any): string {
  return "\x1b[31m" + stringify(arg) + reset();
}

function green(arg: any) {
  return "\x1b[32m" + stringify(arg) + reset();
}


function innerExpect(actual: any, context: Context): Assertion {
  return {
    equal(expected: any) {
      const isEqual = equal(actual, expected);
      if (isEqual !== context.not) {
        return;
      }
      throw Error('actual:\n' + red(actual) + "\nright:\n" + green(expected))
    },
    is(expected: any) {
      const isSame = is(actual, expected);
      if (isSame !== context.not) {
        return;
      }
      throw Error('actual:\n' + red(actual) + "\nright:\n" + green(expected))
    },
    get not() {
      return innerExpect(actual, {
        not: !context.not
      })
    }
  }
}

function expect(actual: any): Assertion {
  const context: Context = { not: false };
  return innerExpect(actual, context);
}

export { expect };
