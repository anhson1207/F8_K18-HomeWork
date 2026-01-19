//product
// {
//   id: number,
//   name: string,
//   price: number,
//   remaining: number
// }
// ví dụ
const products = [
  { id: 1, name: "Gạo ST25 (5kg)", price: 180000, remaining: 20 },
  { id: 2, name: "Dầu ăn Simply (1L)", price: 65000, remaining: 15 },
  { id: 3, name: "Nước mắm Nam Ngư (750ml)", price: 45000, remaining: 30 },
  { id: 4, name: "Sữa tươi Vinamilk (1L)", price: 38000, remaining: 25 },
  { id: 5, name: "Trứng gà (10 quả)", price: 42000, remaining: 18 }
];
//order
// {
//   id: number,
//   productId: number,
//   quantity: number
// }
let orderId=1
const orders=[]
const createOrder=(productId, orderQuantity)=>{
    if (productId === null || orderQuantity === null) {
        return "Input cannot be null"
    }
    if (typeof productId !== "number" || typeof orderQuantity !== "number") {
        return "Input must be a number"
    }
    let item={}
    for(const product of products){
        if(product.id===productId){
            item=product
            break
        }
    }
    if(!item.id){
        return "Product not found"
    }
    if (item.remaining < orderQuantity) {
        return "Not enough product"
    }
    item.remaining -= orderQuantity
    const order = {
        id: orderId++,
        productId,
        quantity: orderQuantity
    };
    orders.push(order)
    return order

}
console.log(createOrder(4, 5));
console.log(createOrder(2, 2));
console.log(createOrder(3, 2));
const updateOrder=(orderId,quantity)=>{
    let productId=null
for(const order of orders){
    if(order.id === orderId){
        productId=order.productId
        break
    }
}
let diffRemaining=0
for(const product of products){
    if(product.id===productId){
        for(const order of orders){
            if(order.id===orderId){
                diffRemaining=quantity-order.quantity
                if (diffRemaining > 0 && diffRemaining > product.remaining) {
                    return "Out of stock";
                }
                order.quantity=quantity
                product.remaining-=diffRemaining
                break
            }
        }
        break
    }
}

return orders
}
console.log(updateOrder(2, 5));
const deleteOrder=(orderId)=>{
    if(typeof orderId !== "number"){
        return "OrderId must be a number"
    }
    let flag=false
    for(const order of orders){
        if(order.id===orderId){
            for(const product of products){
                if(product.id===order.productId){
                    product.remaining+=order.quantity
                    break
                }
            }
            orders.splice(orders.indexOf(order),1)
            flag=true
            break
        }
    }
    if(!flag){
        return " Not found"
    }
return orders
}
console.log(deleteOrder(1));
console.log(products);
