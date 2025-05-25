// import express, { json } from "express";
// import cors from "cors";

// let time = 0;
// const coins = [];
// const inventory = [];

// export const resetData = () => {
//   time = 0;
//   coins.length = 0;
//   coins.push(
//     { id: 1, name: "USD", price: 1 },
//     { id: 2, name: "CoinA", price: 100 },
//     { id: 3, name: "CoinB", price: 100 },
//     { id: 4, name: "CoinC", price: 100 },
//     { id: 5, name: "CoinD", price: 100 }
//   );
//   inventory.length = 0;
//   inventory.push(
//     { coinId: 1, amountOwned: 1000 },
//     { coinId: 2, amountOwned: 0 },
//     { coinId: 3, amountOwned: 0 },
//     { coinId: 4, amountOwned: 0 },
//     { coinId: 5, amountOwned: 0 }
//   );
// };

// const getAllData = () => JSON.stringify({ coins, inventory, time });

// const updateCoins = () => {
//   time++;
//   coins[1].price += Math.round(Math.random() * 10 - 5);
//   coins[2].price += 1;
//   coins[3].price += coins[3].price < 200 ? 10 : -100;
//   coins[4].price = Math.round(
//     coins[4].price * (inventory[4].amountOwned % 2 === 0 ? 2 : 0.5)
//   );
// };

// const app = express();
// app.use(cors());
// app.use(json());

// app.get("/get-coins", (_, res) => res.json(coins));
// app.get("/get-inventory", (_, res) => res.json(inventory));

// app.post("/purchase-coin", (req, res) => {
//   const { coinId, amount } = req.body;
//   const coin = coins.find((c) => c.id === coinId);
//   if (!coin) return res.status(404).json({ error: "Coin not found" });

//   const totalPrice = coin.price * amount;
//   const userBalance = inventory.find((c) => c.coinId === 1)?.amountOwned || 0;
//   if (totalPrice > userBalance)
//     return res.status(400).json({ error: "Insufficient balance" });

//   if (
//     amount < 0 &&
//     inventory.find((c) => c.coinId === coinId).amountOwned < Math.abs(amount)
//   ) {
//     return res.status(400).json({ error: "Not enough coins to sell" });
//   }

//   inventory.find((c) => c.coinId === 1).amountOwned -= totalPrice;
//   const existingCoin = inventory.find((c) => c.coinId === coinId);
//   if (existingCoin) {
//     existingCoin.amountOwned += amount;
//   } else {
//     inventory.push({ coinId, amountOwned: amount });
//   }

//   res.json({ success: true, inventory });
// });

// app.get("/", (_, res) => res.send("Start the client to view SDET Test"));

// export { app, getAllData, updateCoins };
