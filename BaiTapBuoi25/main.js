//Assignment 25
const products = [
    { id: 1, name: "iPhone", price: 2000 },
    { id: 2, name: "Samsung", price: 1500 },
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
            if(priceMap[product.id]){
                priceMap[product.id]+=totalPrice
            }else{
                priceMap[product.id]=totalPrice
            }
            product["revenue"] = priceMap[product.id];
        }

    }
}
const findProductMaxRevenue=(arr)=>{
    let maxRevenue=-Infinity
    let maxKey=null
    for(let i=0;i<arr.length;i++){
        if (arr[i].revenue >maxRevenue) {
            maxRevenue=arr[i].revenue
            maxKey=i
        }
    }
    return arr[maxKey]
}
console.log(products);
console.log(findProductMaxRevenue(products));


