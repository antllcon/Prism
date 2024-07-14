function generateUniqueId() {
    // Создаем строку из 6 цифр
    var uniqueId = Math.random().toString().slice(-6);
    // Преобразуем строку в число
    uniqueId = parseInt(uniqueId);
    // Возвращаем уникальное число
    return uniqueId;
}

// Вызываем функцию и получаем уникальный ID
var myUniqueId = generateUniqueId();
console.log(myUniqueId);