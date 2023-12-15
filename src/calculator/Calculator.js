import React, {useEffect, useState} from 'react';
const Calculator = () => {
    const[info, setInfo] = useState({
       coins: [],
       selected: "",
       dollar: 0,
       convertedAmount: null,
       selectedCoinSymbol: null
    });

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
        .then((resp) => resp.json())
        .then((json) => {
            setInfo({...info, coins : json});
            setLoading(true);
        });
    }, []);
    useEffect(() => {   // selected의 디폴트 값을 선택되도록 해줘야 한다. 이걸 해주지 않으면, 초기에 맨 위에 선택되어 있는 BTC를 인식하지 못한다...
        if(info.coins.length > 0) {
            setInfo({...info, selected : info.coins[0].symbol});
            // setCoinSymbol(coins[0].symbol);
        }
    }, [info.coins]);

    const handleSelect = (e) => {
        setInfo({...info, selected : e.target.value});
    };
    const onChange = (e) => {
        setInfo({...info, dollar : e.target.value});
    }
    const onClick = () => {
        const selectedCoin = info.coins.find((coin) => coin.symbol === info.selected);
        if(selectedCoin) {
            const conversionRate = selectedCoin.quotes.USD.price;
            const convertedValue = info.dollar / conversionRate;
            console.log(convertedValue);
            setInfo({...info, convertedAmount : convertedValue, selectedCoinSymbol: selectedCoin.symbol});
        }
    }

    return (
            <div>
                <h2>Change USD to BTC</h2>
                <input
                        onChange={onChange}
                        value={info.dollar}
                        placeholder={"Write how much you have"}
                        type="text"/>
                <div>
                    <select onChange={handleSelect} value={info.selected}>
                        {info.coins.map((coin, index) => <option key={index} value={coin.symbol}>{coin.name} ({coin.symbol}, price : {coin.quotes.USD.price}) </option>)}
                    </select>
                </div>
                <div>
                    <button onClick={onClick}>Convert!</button>
                </div>
                <h2>{loading ? null : "Loading ..."}</h2>
                <h3>You have : {info.convertedAmount} {info.selectedCoinSymbol}</h3>
            </div>
    );
}
export default Calculator;