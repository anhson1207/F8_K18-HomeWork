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
    { id: 5, name: "Trứng gà (10 quả)", price: 42000, remaining: 18 },
];
//order
// {
//   id: number,
//   productId: number,
//   quantity: number
// }
let orderId = 1;
const orders = [];
const createOrder = (productId, orderQuantity) => {
    //check input
    if (productId === null || orderQuantity === null) {
        return "Input cannot be null";
    }
    if(typeof productId !== "number" || typeof orderQuantity !== "number"){
        return "Input must be number"
    }
    //get product from products
    const product = products.find((p) => p.id === productId);
    if (!product) {
        return "Product not found";
    }
    if (product.remaining < orderQuantity) {
        return "out of stock";
    }
    //update product.remaining
    product.remaining -= orderQuantity;
    const order = {
        id: orderId++,
        productId,
        quantity: orderQuantity,
    };
    //push order in orders
    orders.push(order);
    return order;
};
console.log(createOrder(1, 5));
console.log(createOrder(2, 8));
console.log(createOrder(3, 6));

const updateOrder = (orderId, quantity) => {
    //check quantity
    if(quantity<=0){
        return "Quantity must be greater than 0"
    }
    //get order from orders
    const order = orders.find((o) => o.id === orderId);
    //check if order not exist
    if (!order) {
        return "Not found";
    }
    //get product from products
    const product = products.find((p) => p.id === order.productId);
    //check if order not exist

    if (!product) {
        return "Not found";
    }
    //calculate diff
    const diff = quantity - order.quantity;
    if (diff > 0 && product.remaining < diff) {
        return "out of stock";
    }
    //update product.remaining
    product.remaining -= diff;
    order.quantity = quantity;
    return order;
};
console.log(updateOrder(1, 8));
console.log(orders);
const deleteOrder = (orderId) => {
    //get order from orders
    const order = orders.find((o) => o.id === orderId);
    //check if order not exist
    if (!order) {
        return "Not found";
    }
    //get product from products
    const product = products.find((p) => p.id === order.productId);
    //update product.remaining
    product.remaining += order.quantity;
    //delete order
    orders.splice(orders.indexOf(order), 1);
    return orders;
};
console.log(deleteOrder(1));
