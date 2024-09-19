import Navbar from "./Navbar";

function Index() {
    return (
        <>
            <div className="flex flex-col w-full h-screen bg-[#F4F97A]">  
                <div className="h-3/4 mx-96 flex items-center text-black text-xl">
                    Frietzaak 90000000000000
                </div>

                <div className="flex flex-row h-1/3 bg-gray-200 justify-evenly items-center border-t-2 border-gray-500">
                    <div className="h-3/4 w-1/5 bg-slate-100 border-rounded rounded-xl shadow-xl text-black">Menu preview one</div>
                    <div className="h-3/4 w-1/5 bg-slate-100 border-rounded rounded-xl shadow-xl text-black">Menu preview one</div>
                    <div className="h-3/4 w-1/5 bg-slate-100 border-rounded rounded-xl shadow-xl text-black">Menu preview one</div>
                </div>
            </div>
        </>
    );
}

export default Index;
