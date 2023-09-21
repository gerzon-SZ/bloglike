import { rest } from "msw";

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

export const test = [ 
  rest.get("http://localhost:3000/test", (req, res, ctx) => {
    console.log(req, "req here")
    return res(
      ctx.delay(randomIntFromInterval(100, 1000)),
      ctx.status(200),
      ctx.json({ data: [1, 2, 3, 4, 5], total: 5 })
    );
  }),
];
