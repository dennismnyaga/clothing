import React from 'react'


interface Curency {
    amount: number | string;
    currencySymbol: string;
    asString: boolean;
}

const CurrencyFormatter: React.FC<Curency> = ({ amount, currencySymbol, asString = false }) => {

    const formattedAmount = amount.toLocaleString();
    if (asString) {
        return `${currencySymbol} ${formattedAmount}`;
      }

  return (
    <span className=''>
        {currencySymbol} {formattedAmount}
    </span>
  )
}

export default CurrencyFormatter