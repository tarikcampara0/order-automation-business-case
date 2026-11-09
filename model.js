"use strict";

function evaluateCase(inputs, adoption) {
  const { volume, minutes, rate, cashShare, fee, setup } = inputs;
  const hours = volume * adoption * minutes / 60;
  const cash = hours * rate * cashShare / 100;
  const monthlyNet = cash - fee;
  return {
    hours, cash, monthlyNet,
    yearOne: 12 * monthlyNet - setup,
    payback: monthlyNet > 0 ? setup / monthlyNet : null
  };
}

if (typeof module !== "undefined") module.exports = { evaluateCase };
