import { BasketItem } from "./Basket"

export const BasketList = ({items, onAdd, onDown, onDelete, onSale, setSaleApplied}) =>{
    return (
    <div>

        { !setSaleApplied && (
                <button onClick={() => onSale()}>Sale</button>
            )}
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Count</th>
                        <th>Subtotal</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map(elm => <BasketItem key={elm.id} {...elm} onAdd = {onAdd} onDown={onDown} onDelete={onDelete}/>)
                    }
                </tbody>
            </table>
    </div>
    )
}