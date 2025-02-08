
const Appbar = () => {
  return (
    <div className="shadow-xl h-16 flex justify-between rounded-lg bg-cyan-300">
       <div className="flex flex-col justify-center h-full mr-4 font-bold mx-2 p-2">
          PayTM App
       </div>
       <div className="flex p-3">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-2xl cursor-pointer hover:bg-slate-950 text-white font-bold px-2 bg-slate-500 flex justify-center items-center">
                Balu
            </div>
       </div>
    </div>
  )
}

export default Appbar;