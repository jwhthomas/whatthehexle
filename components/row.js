export default function Row({ rowNum }){
    return (
        <div className="flex select-none my-1" id={"row"+rowNum}>
            <div className="h-10 w-10 bg-slate-300 rounded text-xl flex items-center justify-center m-1 mr-4">#</div>

            <div className="h-10 w-10 bg-white rounded text-xl flex items-center justify-center m-1" id={"row"+rowNum+"box0"}></div>
            <div className="h-10 w-10 bg-white rounded text-xl flex items-center justify-center m-1" id={"row"+rowNum+"box1"}></div>
            <div className="h-10 w-10 bg-white rounded text-xl flex items-center justify-center m-1" id={"row"+rowNum+"box2"}></div>
            <div className="h-10 w-10 bg-white rounded text-xl flex items-center justify-center m-1" id={"row"+rowNum+"box3"}></div>
            <div className="h-10 w-10 bg-white rounded text-xl flex items-center justify-center m-1" id={"row"+rowNum+"box4"}></div>
            <div className="h-10 w-10 bg-white rounded text-xl flex items-center justify-center m-1" id={"row"+rowNum+"box5"}></div>
        </div>
    )
}