import { PressEvent } from "@react-aria/interactions";

export const handleTrackedCoin = (e: PressEvent, setTrackedCoins) => {
  const coinId = e.target.id;
  const trackedCoinsJSON = localStorage.getItem("trackedCoins");

  const toggleCoinTracking = (coins: { id: string }[], coinId: string) => {
    const coinExists = coins.some((coin) => coin.id === coinId);

    if (coinExists) {
      return coins.filter((coin) => coin.id !== coinId);
    } else {
      return [...coins, { id: coinId }];
    }
  };

  let trackedCoins = [];

  if (trackedCoinsJSON) {
    trackedCoins = JSON.parse(trackedCoinsJSON);
    console.log(trackedCoins);
  }

  const updatedTrackedCoins = toggleCoinTracking(trackedCoins, coinId);
  localStorage.setItem("trackedCoins", JSON.stringify(updatedTrackedCoins));
  setTrackedCoins(updatedTrackedCoins);
};
