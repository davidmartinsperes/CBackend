import { soma, sub, mult, div } from "./index.js";

console.log("Testes da função soma");
if (soma(2, 2) === 4) console.log("Passou 1º");
else console.log("Falhou 1º");

if (soma(-1, 2) === 1) console.log("Passou 2º");
else console.log("Falhou 2º");

if (soma(2, 0) === 2) console.log("Passou 3º");
else console.log("Falhou 3º");

console.log("Teste da função substração");

if (sub(2, 2) === 0) console.log("Passou 4º");
else console.log("Falhou 4º");

if (sub(-1, 2) === -3) console.log("Passou 5º");
else console.log("Falhou 5º");

if (sub(2, 0) === 2) console.log("Passou 6º");
else console.log("Falhou 6º");

console.log("Teste da função divisão");

if (div(10, 2) === 5) console.log("Passou 7º");
else console.log("Falhou 7º");

if (div(20, 2) === 10) console.log("Passou 8º");
else console.log("Falhou 8º");

if (div(100, 2) === 50) console.log("Passou 9º");
else console.log("Falhou 9º");

if (div(10, 0) === 1) console.log("Passou 10º");
else console.log("Falhou 10º");

console.log("Teste da função multiplicação");

if (mult(10, 2) === 20) console.log("Passou 11º");
else console.log("Falhou 11º");
if (mult(25, 2) === 50) console.log("Passou 12º");
else console.log("Falhou 12º");
