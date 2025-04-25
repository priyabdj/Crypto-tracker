import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const formatCompact = (num) =>
  Intl.NumberFormat('en', { notation: 'compact' }).format(num);

const CryptoRow = ({ asset, index }) => {
  const getChangeElement = (value) => {
    const isPositive = value >= 0;
    const Icon = isPositive ? ArrowUpRight : ArrowDownRight;
    return (
      <span className={`flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        <Icon className="w-4 h-4" />
        {Math.abs(value).toFixed(2)}%
      </span>
    );
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="py-6 px-3">{index + 1}</td>
      <td className="flex items-center justify-center gap-2 px-2 py-4 whitespace-nowrap">
        <img src={asset.logo} alt={asset.symbol} className="w-6 h-6" />
        <div>
          <div className="font-medium">{asset.name}</div>
          <div className="text-sm text-gray-800">{asset.symbol}</div>
        </div>
      </td>
      <td className="text-right px-2">${asset.price.toFixed(2)}</td>
      <td className="text-right px-2">{getChangeElement(asset.change1h)}</td>
      <td className="text-right px-2">{getChangeElement(asset.change24h)}</td>
      <td className="text-right px-2">{getChangeElement(asset.change7d)}</td>
      <td className="text-right px-2">${formatCompact(asset.marketCap)}</td>
      <td className="text-right px-2">
        ${formatCompact(asset.volume24h)}
        <div className="text-xs text-gray-500">{formatCompact(asset.volume24h / asset.price)} {asset.symbol}</div>
      </td>
      <td className="text-right px-2">
        {formatCompact(asset.circulatingSupply)} {asset.symbol}
      </td>
      <td className="px-2">
        <img src="/chart.svg" alt="7D Chart" className="w-24 h-8" />
      </td>
    </tr>
  );
};

export default CryptoRow;