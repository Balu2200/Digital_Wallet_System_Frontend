
import {Button} from "./Button";


const User = () => {
  return (
    <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    B
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    Balu pasumarthi
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button label={"Send Money"} />
        </div>
    </div>
  )
}

export default User;