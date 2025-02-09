

const InputBox = ({placeholder ,label, onChange}) => {

  return (
    <div className="flex flex-col">
      <label className="flex mb-1 font-medium">{label}</label>
      <input onChange={onChange} className="border border-black p-2 rounded-lg" placeholder={placeholder} type="text" required/>
    </div>
  )
}

export default InputBox