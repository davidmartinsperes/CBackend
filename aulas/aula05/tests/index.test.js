const calculadora = require("../src/index.js");

describe("Teste da Calculadora", () => {
    
  test("2 + 2 = 4", () => {
    expect(calculadora.soma).toBeDefined();
    expect(calculadora.soma(2, 2)).toBe(4);
  });

  test("2 + 0 = 2", () => {
    expect(calculadora.soma(2, 0)).toBe(2);
  });

  test("-2 + -2 = -4", () => {
    expect(calculadora.soma(-2, -2)).toBe(-4);
  });

  test("20 - -2 = 0", () => {
    expect(calculadora.sub(20, -2)).toBe(22);
  });

  test("4 - 2 = 2", () => {
    expect(calculadora.sub(4, 2)).toBe(2);
  });

  test("se a >= b entao a - b >= 0", () => {
    expect(calculadora.sub).toBeDefined();
    expect(calculadora.sub(2, 1)).toBeGreaterThanOrEqual(0);
    expect(calculadora.sub(2, 2)).toBeGreaterThanOrEqual(0);
    expect(calculadora.sub(2, -2)).toBeGreaterThanOrEqual(0);
    expect(calculadora.sub(-2, -4)).toBeGreaterThanOrEqual(0);
  });

  test("se a < b entao a - b < 0", () => {
    expect(calculadora.sub(1, 2)).toBeLessThan(0);
    expect(calculadora.sub(-2, 1)).toBeLessThan(0);
    expect(calculadora.sub(-2, 1)).toBeLessThan(0);
  });

  test("se a e b < 0 e a e b > 0 entao a * b > 0 ", () => {
    expect(calculadora.mult).toBeDefined();
    expect(calculadora.mult(10, 2)).toBeGreaterThanOrEqual(0);

    expect(calculadora.mult(5, 5)).toBeGreaterThanOrEqual(0);
    expect(calculadora.mult(-2, -2)).toBeGreaterThanOrEqual(0);
  });

  test("se a < 0 ou b < 0 entao a * b < 0 ", () => {
    expect(calculadora.mult(-5, 6)).toBeLessThan(0);
    expect(calculadora.mult(2, -4)).toBeLessThan(0);
  });

  test("se a = 0 ou b = 0 a * b = 0", () => {
    expect(calculadora.mult(20, 0)).toBe(0);

    expect(calculadora.mult(5, 0)).toBe(0);
    expect(calculadora.mult(-2, 0)).toBe(-0);
  });

  test("se b = 0 entao Divisão por ZERO", () => {
    expect(calculadora.div).toBeDefined();

    expect(() => calculadora.div(2, 0)).toThrow("Divisão por ZERO");
  });
});
