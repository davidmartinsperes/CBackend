const { calcularMediaAluno } = require('../src/calcularMediaAluno');

test("a1 ou a2 indefinidos", () => {
    expect(calcularMediaAluno).toBeDefined();
    expect(() => calcularMediaAluno(undefined, 3)).toThrow("Notas a1 ou a2 não informadas");
});

test("a1 ou a2 são negativos", () => {
    expect(() => calcularMediaAluno(-3, 3)).toThrow("Notas a1 ou a2 não podem ser negativas");
    expect(() => calcularMediaAluno(2, -3)).toThrow("Notas a1 ou a2 não podem ser negativas");
    expect(() => calcularMediaAluno(-6, -9)).toThrow("Notas a1 ou a2 não podem ser negativas");
});

test("a3 indefinido", () => {
    expect(calcularMediaAluno(2, 3)).toBeCloseTo(2.60);
});

test("a3 é negativo", () => {
    expect(() => calcularMediaAluno(9, 3, -8)).toThrow("Nota a3 não pode ser negativa");
});

test("Melhor combinação é a1 com a3", () => {
    expect(calcularMediaAluno(7, 3, 6)).toBeCloseTo(6.40);
    expect(calcularMediaAluno(1, 5, 6)).toBeCloseTo(5.40);
});