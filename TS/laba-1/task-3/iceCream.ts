function orderIceCream(): number {
  let totalCost: number = 0;

  const size: string | null = prompt(
    "Оберіть розмір стаканчика:\n1 — Маленький (10 грн)\n2 — Великий (25 грн)"
  );
  totalCost += size === "2" ? 25 : 10;

  let hasTopping: boolean = false;
  while (!hasTopping) {
    const toppings: string | null = prompt(
      "Начинки(мінімум одна):\n1 — Шоколад (+5 грн)\n2 — Карамель (+6 грн)\n3 — Ягоди (+10 грн)\nПриклад: 1, 3"
    );

    if (toppings) {
      if (toppings.includes("1")) {
        totalCost += 5;
        hasTopping = true;
      }
      if (toppings.includes("2")) {
        totalCost += 6;
        hasTopping = true;
      }
      if (toppings.includes("3")) {
        totalCost += 10;
        hasTopping = true;
      }
    }

    if (!hasTopping) {
      alert("Потрібно обрати хоча б одну начинку");
    }
  }

  const marshmallow: string | null = prompt("Додати маршмелоу (+5 грн)?\n1 — Так\n2 — Ні");
  if (marshmallow === "1" || marshmallow?.toLowerCase() === "так") {
    totalCost += 5;
  }

  alert(`Підсумкова вартість: ${totalCost} грн`);
  return totalCost;
}

orderIceCream();