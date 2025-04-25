import React from 'react';
import { useSelector } from 'react-redux';
import CryptoRow from './CryptoRow';

const CryptoTable = () => {
  const assets = useSelector((state) => state.crypto.assets);

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-[1000px] w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase text-gray-500 bg-gray-100">
            <th className="px-2 py-2">#</th>
            <th className="px-2 py-2">Name</th>
            <th className="px-2 py-2 text-right">Price</th>
            <th className="px-2 py-2 text-right">1h %</th>
            <th className="px-2 py-2 text-right">24h %</th>
            <th className="px-2 py-2 text-right">7d %</th>
            <th className="px-2 py-2 text-right">Market Cap</th>
            <th className="px-2 py-2 text-right">Volume(24h)</th>
            <th className="px-2 py-2 text-right">Circulating Supply</th>
            <th className="px-2 py-2">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => (
            <CryptoRow key={asset.id} asset={asset} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;