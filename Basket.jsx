export const BasketItem = ({title,price, count, id, onAdd, onDown, onDelete}) =>{

    return <tr>
        <td>{title}</td>
        <td>{price}</td>
        <td>{count}</td>
        <td>{price*count}</td>
        <td>
            <button onClick = {()=>onAdd(id)}> + </button>
            <button onClick = {()=>onDown(id)}> - </button>
            <button onClick = {()=>onDelete(id)}> X </button>
        </td>
    </tr>

}