type StatisticItemProps = {
    menuItemName: string,
    menuItemPrice: number
    quantity: number,

}

function StatisticsItem({ props }: { props: StatisticItemProps }) {
    return (
        <>
            <div className="w-full flex flex-row font-semibold">
                <div className="w-1/4 px-1 py-1 border border-gray-300 border-y-gray-800">{props.menuItemName}</div>
                <div className="w-1/4 px-1 py-1 border border-gray-300 border-y-gray-800">{props.menuItemPrice.toFixed(2)} </div>
                <div className="w-1/4 px-1 py-1 border border-gray-300 border-y-gray-800">{props.quantity}</div>
                <div className="w-1/4 px-1 py-1 border border-gray-300 border-y-gray-800">{(props.quantity * props.menuItemPrice).toFixed(2)}</div>
            </div>
            
        </>
    );
}

export default StatisticsItem;