"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { evaluateCase } = require("./model.js");

const baseline = { volume: 6000, minutes: 6, rate: 38, cashShare: 40, fee: 2200, setup: 12000 };

test("base case distinguishes capacity from realizable cash", () => {
  const result = evaluateCase(baseline, 0.65);
  assert.equal(result.hours, 390);
  assert.equal(result.cash, 5928);
  assert.equal(result.monthlyNet, 3728);
  assert.equal(result.yearOne, 32736);
  assert.equal(result.payback.toFixed(1), "3.2");
});

test("eliminating cash conversion retains released capacity", () => {
  const result = evaluateCase({ ...baseline, cashShare: 0 }, 0.65);
  assert.equal(result.hours, 390);
  assert.equal(result.yearOne, -38400);
  assert.equal(result.payback, null);
});

test("break-even recurring cash cannot recover a positive setup cost", () => {
  const result = evaluateCase({ ...baseline, fee: 5928 }, 0.65);
  assert.equal(result.monthlyNet, 0);
  assert.equal(result.payback, null);
});

test("zero adoption charges the platform and setup only", () => {
  assert.equal(evaluateCase(baseline, 0).yearOne, -38400);
});

test("zero setup with positive recurring benefit pays back immediately", () => {
  assert.equal(evaluateCase({ ...baseline, setup: 0 }, 0.65).payback, 0);
});
