import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCoins } from './redux/cryptoSlice';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function App() {
  const dispatch = useDispatch();
  const coins = useSelector((state) => state.crypto.coins);
  const status = useSelector((state) => state.crypto.status);

  useEffect(() => {
    dispatch(fetchCoins());
    const interval = setInterval(() => {
      dispatch(fetchCoins());
    }, 60000);
    return () => clearInterval(interval);
  }, [dispatch]);

  if (status === 'loading') return <div className="text-center mt-10">Loading...</div>;
  if (status === 'failed') return <div className="text-center mt-10 text-red-500">Error fetching data.</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Crypto Price Tracker</h1>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-[1000px] w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-xs uppercase text-gray-600">
              <th className="px-4 py-3">Logo</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-right">1h %</th>
              <th className="px-4 py-3 text-right">24h %</th>
              <th className="px-4 py-3 text-right">7d %</th>
              <th className="px-4 py-3 text-right">Market Cap</th>
              <th className="px-4 py-3 text-right">24h Volume</th>
              <th className="px-4 py-3 text-right">Circulating Supply</th>
              <th className="px-4 py-3 text-center">7D Chart</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr key={coin.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-3">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                </td>
                <td className="px-4 py-3 font-medium">
                  {coin.name} <span className="text-gray-500 uppercase text-xs">{coin.symbol}</span>
                </td>
                <td className="px-4 py-3 text-right font-semibold">${coin.current_price.toLocaleString()}</td>
                <td
                  className={`px-4 py-3 text-right font-medium ${
                    coin.price_change_percentage_1h_in_currency >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {coin.price_change_percentage_1h_in_currency?.toFixed(2)}%
                </td>
                <td
                  className={`px-4 py-3 text-right font-medium ${
                    coin.price_change_percentage_24h_in_currency >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {coin.price_change_percentage_24h_in_currency?.toFixed(2)}%
                </td>
                <td
                  className={`px-4 py-3 text-right font-medium ${
                    coin.price_change_percentage_7d_in_currency >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
                </td>
                <td className="px-4 py-3 text-right">${coin.market_cap.toLocaleString()}</td>
                <td className="px-4 py-3 text-right">${coin.total_volume.toLocaleString()}</td>
                <td className="px-4 py-3 text-right">{coin.circulating_supply.toLocaleString()}</td>
                <td className="px-4 py-3 w-[100px] h-[50px]">
                  <ResponsiveContainer width="100%" height={50}>
                    <LineChart
                      data={coin.sparkline_in_7d.price.map((p, index) => ({ index, price: p }))}
                    >
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#16a34a"
                        strokeWidth={2}
                        dot={false}
                      />
                      <XAxis dataKey="index" hide />
                      <YAxis domain={['auto', 'auto']} hide />
                      <Tooltip contentStyle={{ fontSize: '0.75rem' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
