import { useState, useEffect } from "react";
import StatisticsItem from "./StatisticsItem";

type StatisticItemProps = {
    menuItemName: string,
    menuItemPrice: number
    quantity: number,

}

function Statistics() {
    const [statistics, setStatistics] = useState([]);

    const getStatistics = () => {
        fetch("https://localhost:7167/order/admin/statistics")
            .then(response => response.json())
            .then(data => setStatistics(data))
            .catch(error => console.error('Error:', error));
    }

    useEffect(() => {
        getStatistics();
    }, [])

    useEffect(() => {
        console.log(statistics)
    }, [statistics])

    const sortHighestTotalProfit = () => {        
        const highestTotalProfitArr = [...statistics].sort((a: StatisticItemProps, b: StatisticItemProps) => (b.menuItemPrice * b.quantity) - (a.menuItemPrice * a.quantity));
        setStatistics(highestTotalProfitArr);
    }    

    const sortHighestTotalItemsSold = () => {
        const highestTotalItemsSoldArr = [...statistics].sort((a: StatisticItemProps, b: StatisticItemProps) =>
            b.quantity - a.quantity
        );
        setStatistics(highestTotalItemsSoldArr);
    }

    const reset = () => {
        getStatistics();
    }
    return (
        <>
            <div className="flex w-full h-screen bg-slate-200 justify-center">
                <div className=" bg-slate-100 border border-gray-300 h-full w-1/2">
                    <div className="text-black mt-16 py-5 pl-2 text-3xl font-bold bg-slate-400 border-b-2 border-black">
                        Total item sales:
                    </div>
                    <div className="flex flex-row text-black font-bold justify-between border bg-slate-300">
                        <div className="w-1/4 px-1 border-x ">Name:</div>
                        <div className="w-1/4 px-1 border-x ">Price:</div>
                        <div className="w-1/4 px-1 border-x ">Total sold:</div>
                        <div className="w-1/4 px-1 border-x ">Total profit:</div>
                    </div>
                    <div className="flex flex-col text-black justify-between">
                        {statistics.map((stat) => (
                            <StatisticsItem props={stat} />

                        ))}
                    </div>

                    <div className="text-black pt-10 px-4 font-semibold text-md">Sort:</div>
                    <div className="text-black px-4 py-2 flex flex-row bg-gray-400">
                        <button onClick={() => {sortHighestTotalProfit()}} className="bg-white p-2 mx-1 border-gray-300">Total profit</button>
                        <button onClick={sortHighestTotalItemsSold} className="bg-white p-2 mx-1 border-gray-300">Total sold</button>
                        <button onClick={reset} className="bg-blue-500 p-2 mx-1 border-gray-300">Reset</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Statistics;