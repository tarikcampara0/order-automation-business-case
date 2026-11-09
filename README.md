# Order Automation Business Case

A browser-based discovery workshop for a sales engineer and an operations buyer. Northline Supply, a fictional distributor, wants to automate order entry. The buyer needs to distinguish hours the team can redeploy from expenses finance can remove.

## Run the workshop

Download the repository, extract it, and open **index.html** in a browser. Keep the two JavaScript files beside it. Everything runs locally. The **Print business case** button opens the browser print dialog so the buyer can save the current assumptions and results as a PDF.

## Three-minute demo

1. Ask operations how many orders arrive monthly and how many minutes automation can remove from each order. The example starts with 6,000 orders and six minutes.
2. Read across the 35%, 65%, and 85% adoption scenarios. The base case releases **390 hours per month**. At $38 per hour and 40% cash conversion, that produces **$5,928 per month** in modeled cash savings.
3. Include the $2,200 monthly platform fee and $12,000 setup cost. The base case produces **$32,736 first-year net** and pays back in about **3.2 months**.
4. Set cash conversion to zero. The base case still releases 390 hours. First-year net falls to **−$38,400**. Ask finance which spend category would actually fall before presenting savings to an executive.

## How to use the result

Adoption is constant over the year. The model excludes ramp time, discounting, taxes, and changes in volume. Use time studies to validate minutes saved and budget records to validate cash conversion. All starting inputs are illustrative.

The arithmetic lives in `model.js`. The form and scenario table live in `workshop.js`.

## Check the model

Run `node --test model.test.js` with Node.js 18 or newer. The tests cover the example, zero cash conversion, zero adoption, recurring break-even, and immediate payback when setup costs are zero.
