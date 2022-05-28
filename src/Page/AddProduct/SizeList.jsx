
import "./SizeList.css"
const SizeList = ({handleSize}) => {

  // mảng size
  function range(start, end, step = 1) {
    const len = Math.floor((end - start) / step) + 1
    return Array(len).fill().map((_, idx) => start + (idx * step))
  }

  var result = range(35, 45, 0.5);

  return (
    <div className="category-size">
      <div className="size-list d-flex flex-wrap justify-content-start">
        {
          result.map(item=>{
            return(
            <span key= {item}>
              <input type="checkbox" name='item' key={item} id={`${item}-category`} value={item} className="d-none" onChange={(e) => handleSize(e)}/>
              <label htmlFor= {`${item}-category`} className="btn-size">{item}</label>
            </span>
              )})
          }
      </div>
    </div>

  )

}

export default SizeList;