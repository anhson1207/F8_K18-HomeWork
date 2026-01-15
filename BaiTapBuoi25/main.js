//Assignment 25
const products = [
    { id: 1, name: "iPhone", price: 2000 },
    { id: 2, name: "Samsung", price: 15000 },
    { id: 3, name: "Xiaomi", price: 1000 },
    { id: 4, name: "Oppo", price: 1200 },
];

const orders = [
    {
        id: 1,
        items: [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 1 },
        ],
    },
    {
        id: 2,
        items: [
            { productId: 1, quantity: 1 },
            { productId: 3, quantity: 3 },
        ],
    },
    {
        id: 3,
        items: [
            { productId: 2, quantity: 2 },
            { productId: 4, quantity: 1 },
        ],
    },
];
const findById=(arr,id)=>{
    for(const item of arr){
        if(item.id===id){
            return item
        }
    }
}
const priceMap={}
    
for(const order of orders){
    for(const item of order.items){
        let totalPrice = 0;
        const product=findById(products, item.productId)
        if(product){
            totalPrice=product.price * item.quantity
            if(priceMap[product.name]){
                priceMap[product.name]+=totalPrice
            }else{
                priceMap[product.name]=totalPrice
            }
            product["revenue"] = priceMap[product.name];
        }

    }
}
const findProductMaxRevenue=(arr)=>{
    let productMaxRevenue=arr[0]
    for(let i=1;i<arr.length;i++){
        if (arr[i].revenue > productMaxRevenue.revenue) {
            productMaxRevenue=arr[i]
        }
    }
    return productMaxRevenue
}
// console.log(products);
console.log(findProductMaxRevenue(products));


