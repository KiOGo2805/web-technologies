type MenuOption = {
  id: string;
  name: string;
  price: number;
};

const sizes: [MenuOption, MenuOption] = [
  { id: "1", name: "Маленький", price: 10 },
  { id: "2", name: "Великий", price: 25 },
];

const toppings: MenuOption[] = [
  { id: "1", name: "Шоколад", price: 5 },
  { id: "2", name: "Карамель", price: 6 },
  { id: "3", name: "Ягоди", price: 10 },
];

function createMenuMessage(
  title: string,
  options: MenuOption[],
  pricePrefix: string
): string {
  const optionsMessage = options
    .map((option) => `${option.id} — ${option.name} (${pricePrefix}${option.price} грн)`)
    .join("\n");

  return `${title}\n${optionsMessage}`;
}

function orderIceCream(): number {
  let totalCost: number = 0;

  const size = prompt(createMenuMessage("Оберіть розмір стаканчика:", sizes, ""));
  const selectedSize = sizes.find((option) => option.id === size);
  totalCost += selectedSize?.price ?? sizes[0].price;

  let hasTopping: boolean = false;
  while (!hasTopping) {
    const toppingsInput = prompt(
      `${createMenuMessage("Начинки (мінімум одна):", toppings, "+")}\nПриклад: 1, 3`
    );

    const selectedToppingIds = new Set(
      toppingsInput?.split(",").map((id) => id.trim()) ?? []
    );
    const selectedToppings = toppings.filter((option) =>
      selectedToppingIds.has(option.id)
    );

    if (selectedToppings.length > 0) {
      totalCost += selectedToppings.reduce(
        (sum, topping) => sum + topping.price,
        0
      );
      hasTopping = true;
    }

    if (!hasTopping) {
      alert("Потрібно обрати хоча б одну начинку");
    }
  }

  const marshmallow: string | null = prompt(
    "Додати маршмелоу (+5 грн)?\n1 — Так\n2 — Ні"
  );
  if (marshmallow === "1" || marshmallow?.toLowerCase() === "так") {
    totalCost += 5;
  }

  alert(`Підсумкова вартість: ${totalCost} грн`);
  return totalCost;
}

orderIceCream();