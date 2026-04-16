const catalog = new Map();
const orders = new Set();
const productHistory = new WeakMap();
const activeUsers = new WeakSet();


function addProduct(id, name, price, stock) {
    const newProduct = { id, name, price, stock };
    catalog.set(id, newProduct);
    
    productHistory.set(newProduct, [`Додано в каталог. Початкова кількість: ${stock}`]);
    console.log(`[+] Додано продукт: ${name}`);
}

function removeProduct(id) {
    if (catalog.has(id)) {
        const prod = catalog.get(id);
        catalog.delete(id);
        console.log(`[-] Видалено продукт: ${prod.name}`);
    }
}

function updateProduct(id, newPrice, newStock) {
    if (catalog.has(id)) {
        const prod = catalog.get(id);
        prod.price = newPrice;
        prod.stock = newStock;
        
        const history = productHistory.get(prod);
        history.push(`Оновлено: ціна ${newPrice} грн, залишок ${newStock} шт.`);
        
        console.log(`[~] Оновлено продукт: ${prod.name}`);
    }
}

function searchProduct(searchName) {
    let results = [];
    for (let prod of catalog.values()) {
        if (prod.name.toLowerCase().includes(searchName.toLowerCase())) {
            results.push(prod);
        }
    }
    console.log(`[?] Результати пошуку для "${searchName}":`, results);
    return results;
}

function placeOrder(userObj, productId, quantity) {
    if (!activeUsers.has(userObj)) {
        activeUsers.add(userObj);
    }

    if (catalog.has(productId)) {
        const prod = catalog.get(productId);
        
        if (prod.stock >= quantity) {
            prod.stock -= quantity;
            
            const order = { 
                user: userObj.name, 
                product: prod.name, 
                qty: quantity, 
                date: new Date().toLocaleTimeString() 
            };
            orders.add(order);
            
            productHistory.get(prod).push(`Замовлення: продано ${quantity} шт. Залишок: ${prod.stock}`);
            
            console.log(`[$$] Замовлення успішне! ${userObj.name} купив(ла) ${quantity}x ${prod.name}`);
        } else {
            console.log(`[!] Помилка: Недостатньо товару "${prod.name}" на складі! (Залишок: ${prod.stock})`);
        }
    }
}

console.log("%c--- ЗАПУСК ІНТЕРНЕТ-МАГАЗИНУ ---", "color: #00e676; font-size: 16px; font-weight: bold;");

const user1 = { name: "Степан", email: "stepan@gmail.com" };
const user2 = { name: "Марина", email: "marina@gmail.com" };

addProduct("p1", "Процесор", 5800, 10);
addProduct("p2", "Ігрова миша", 2100, 5);
addProduct("p3", "Паяльник", 1200, 3);

console.log("\n--- Оновлення та Пошук ---");
updateProduct("p2", 1999, 15);

searchProduct("миша");

console.log("\n--- Замовлення ---");
placeOrder(user1, "p1", 1);
placeOrder(user2, "p3", 4);
placeOrder(user2, "p2", 2);

console.log("\n--- Видалення ---");
removeProduct("p3");

console.log("\n--- ПЕРЕВІРКА СТАНУ СИСТЕМИ ---");
console.log("Каталог (Map):", catalog);
console.log("Замовлення (Set):", orders);

const intelCPU = catalog.get("p1");
console.log("Історія процесора i5 (WeakMap):", productHistory.get(intelCPU));