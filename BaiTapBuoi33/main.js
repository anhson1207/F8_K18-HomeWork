// assignment 1
function login (username,password){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(username === "admin" && password ==="123456"){
                resolve({
                    id: 1,
                    username: "admin",
                    role: "ADMIN",
                });
            }else{
                reject("Sai tài khoản hoặc mật khẩu");
            }
        },2000)
    })
}
console.log("Đang gửi request đăng nhập...");
login("admin1","123456")
    .then((user)=>{
        console.log("Đăng nhập thành công");
        console.log("User:",user);
    }).catch((error)=>{
        console.log("Đăng nhập thất bại");
        console.log("Lỗi:",error);
    });

// assignment 2
function getProduct(productId) {
    return new Promise((resolve, reject) => {
        console.log("Kiểm tra tồn kho...");
        setTimeout(() => {
            if (productId === 1) {
                console.log("Tồn kho hợp lệ");
                resolve({
                    productId: 1,
                    name: "iPhone",
                    price: 20000000,
                    stock: 5,
                });
            } else {
                reject("Sản phẩm không tồn tại");
            }
        }, 1000);
    });
}
function processPayment(product) {
    return new Promise((resolve, reject) => {
        console.log("Đang thanh toán...");
        setTimeout(() => {
            if (product.stock >0) {
                console.log("Thanh toán thành công");
                resolve(product);
            } else {
                reject("Hết hàng");
            }
        }, 1500);
    });
}
function createOrder(product){
    return new Promise((resolve,reject)=>{
        console.log("Đang tạo đơn hàng...");
        setTimeout(()=>{
            resolve({
                orderId: 999,
                productName: product.name,
                status: "SUCCESS",
            });
        },1000);
    })
}
getProduct(1).then((product)=>{
    return processPayment(product);
}).then((product)=>{
    return createOrder(product);
}).then((order)=>{
     console.log("Đặt hàng thành công!");
     console.log("Order:",order);
}).catch((error)=>{
    console.log("Lỗi:",error);
})

// assignment 3
function startCountdown(seconds){
    let count=seconds;
    const interval=setInterval(()=>{
        if(count>0){
            console.log(count);
            count--;
        }else{
            console.log("Hết giờ!");
            clearInterval(interval);
        }
    },1000);
}
startCountdown(5);
