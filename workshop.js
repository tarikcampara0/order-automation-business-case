"use strict";

const fields = [
  ["volume", "Orders per month", 6000, 10000000, 1],
  ["minutes", "Minutes saved per order", 6, 1440, 0.1],
  ["rate", "Loaded hourly cost ($)", 38, 10000, 0.01],
  ["cashShare", "Cash conversion (%)", 40, 100, 0.1],
  ["fee", "Monthly platform cost ($)", 2200, 100000000, 0.01],
  ["setup", "One-time setup ($)", 12000, 100000000, 0.01]
];
const form = document.querySelector("#inputs");
for (const [id, title, value, max, step] of fields) {
  const label = document.createElement("label");
  label.textContent = title;
  const input = document.createElement("input");
  Object.assign(input, { type: "number", id, name: id, value, max, step, min: 0, required: true });
  label.append(input);
  form.append(label);
}

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });
function refresh() {
  const body = document.querySelector("#rows");
  const summary = document.querySelector("#summary");
  body.replaceChildren();
  if (!form.checkValidity()) {
    summary.textContent = "Enter a valid number in each highlighted field to calculate the business case.";
    return;
  }
  const inputs = Object.fromEntries(fields.map(([id]) => [id, form.elements[id].valueAsNumber]));
  const adoption = [0.35, 0.65, 0.85];
  const cases = adoption.map(share => evaluateCase(inputs, share));
  const metrics = [
    ["Adoption", adoption.map(n => (n * 100).toFixed(0) + "%")],
    ["Hours released / mo", cases.map(c => number.format(c.hours))],
    ["Cash savings / mo", cases.map(c => usd.format(c.cash))],
    ["Net cash / mo", cases.map(c => usd.format(c.monthlyNet))],
    ["Year-one net", cases.map(c => usd.format(c.yearOne))],
    ["Payback (months)", cases.map(c => c.payback === null ? "Unreached" : number.format(c.payback))]
  ];
  for (const [name, values] of metrics) {
    const row = body.insertRow();
    const header = document.createElement("th");
    header.scope = "row";
    header.textContent = name;
    row.append(header);
    for (const value of values) row.insertCell().textContent = value;
  }
  const base = cases[1];
  summary.textContent = base.yearOne > 0
    ? "The base case recovers the setup and platform costs in year one. Validate the cash conversion rate with finance."
    : "The base case has no positive first-year net cash benefit. Revisit the cost or validate a larger eligible order volume.";
}
form.addEventListener("input", refresh);
form.addEventListener("submit", e => e.preventDefault());
refresh();
