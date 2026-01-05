//Assignment 22
//Lesson 1
function getStudentLevel(score){
    if(typeof score != 'number' || score <0 ||score >10){
        return "Invalid score"
    }
    if(score>=9){
        return "Excellent"
    }else if(score>=8){
        return "Very Good"
    }
    else if(score>=6.5){
        return "Good"
    }else if(score>=5){
        return "Average"
    }else{
        return "Weak"
}
}
console.log(getStudentLevel(8.5));
//Lesson 2
function getDaysInMonth(month){
    switch(month){
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31
        case 4:
        case 6:
        case 9:
        case 11:
            return 30
        case 2:
            return 28
        default:
            return "Invalid month"
    }
}
console.log(getDaysInMonth(7));
//Lesson 3
const n=10
const checkNumberEvenOdd=n%2==0?"Even":"Odd"
console.log(`The number ${n} is ${checkNumberEvenOdd}`);
//Lesson 4
const age=20
const ticketPrice= age < 13 ? 5000:10000
console.log(`The ticket price is ${ticketPrice}`);
//Lesson 5
function convertTemperature(celsius){
    const fahrenheit=(celsius*1.8)+32
    return fahrenheit
}
console.log(convertTemperature(100));
//Lesson 6
function calculateElectricityBill(kWh){
    if(typeof kWh != 'number' || kWh <0){
        return "Invalid kWh"
    }
    let sum=0
    if(kWh <=50){
        sum=kWh*1678
    }else if(kWh <=100){
        sum=50*1678+(kWh-50)*1734
    }else if(kWh <=200){
        sum=50*1678+50*1734+(kWh-100)*2014
    }else{
        sum=50*1678+50*1734+100*2014+(kWh-200)*2536
    }
    return sum

}
console.log(calculateElectricityBill(250));

