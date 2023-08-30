/**
 * Returns the id of the CustomerSuccess with the most customers
 * @param {array} customerSuccesses
 * @param {array} customers
 * @param {array} customerSuccessesAway
 */

function customerSuccessBalancing(
  customerSuccesses,
  customers,
  customerSuccessesAway
) {
  
  // Ordena os CSs e clientes por nível em ordem crescente
  const sortedCustomerSuccesses = customerSuccesses.sort(
    (a, b) => a.level - b.level
  );
  const sortedCustomers = customers.sort((a, b) => a.level - b.level);

  // Cria um mapeamento de CSs para clientes
  const customerSuccessToCustomers = new Map();
  for (const customerSuccess of sortedCustomerSuccesses) {
    customerSuccessToCustomers.set(customerSuccess.id, []);
  }

  // Distribui os clientes pelos CSs
  for (const customer of sortedCustomers) {
    // Pula clientes que já estão sendo atendidos
    let isCustomerBeingHandled = false;
    for (const customersHandled of customerSuccessToCustomers.values()) {
      if (
        customersHandled.some(
          (handledCustomer) => handledCustomer.id === customer.id
        )
      ) {
        isCustomerBeingHandled = true;
        break;
      }
    }
    if (isCustomerBeingHandled) {
      continue;
    }

    // Encontra o CS com o nível mais próximo do cliente
    const availableCustomerSuccesses = sortedCustomerSuccesses.filter(
      (cs) => !customerSuccessesAway.includes(cs.id)
    );

    const customerSuccess = availableCustomerSuccesses.find(
      (cs) => cs.level >= customer.level
    );

    if (customerSuccess) {
      customerSuccessToCustomers.get(customerSuccess.id).push(customer);
    }
  }

  // Conta o número de clientes atendidos por cada CS
  const customerSuccessesCount = new Map();
  for (const [id, customers] of customerSuccessToCustomers) {
    customerSuccessesCount.set(id, customers.length);
  }

  // Retorna o id do CS com o maior número de clientes
  let maxCustomerSuccessId = null;
  let maxCustomerCount = -1;

  for (const [id, count] of customerSuccessesCount) {
    if (count > maxCustomerCount) {
      maxCustomerCount = count;
      maxCustomerSuccessId = id;
    }
  }

  return maxCustomerSuccessId;
}

//Cenários de Testes

test("Scenario 1", () => {
  const css = [
    { id: 1, level: 60 },
    { id: 2, level: 20 },
    { id: 3, level: 95 },
    { id: 4, level: 75 },
  ];
  const customers = [
    { id: 1, level: 90 },
    { id: 2, level: 20 },
    { id: 3, level: 70 },
    { id: 4, level: 40 },
    { id: 5, level: 60 },
    { id: 6, level: 10 },
  ];
  const csAway = [2, 4];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

function buildSizeEntities(size, level) {
  const result = [];
  for (let i = 0; i < size; i += 1) {
    result.push({ id: i + 1, level });
  }
  return result;
}

function mapEntities(arr) {
  return arr.map((item, index) => ({
    id: index + 1,
    level: item,
  }));
}

function arraySeq(count, startAt) {
  return Array.apply(0, Array(count)).map((it, index) => index + startAt);
}

test("Scenario 2", () => {
  const css = mapEntities([11, 21, 31, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

test("Scenario 3", () => {
    const testTimeoutInMs = 100;
    const testStartTime = new Date().getTime();
  
    const css = mapEntities([1, 2, 3, 4, 5, 6]);
    const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
    const csAway = [];
  
    expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
  
    if (new Date().getTime() - testStartTime > testTimeoutInMs) {
      throw new Error(`Test took longer than ${testTimeoutInMs}ms!`);
    }
  });
  

test("Scenario 4", () => {
  const css = mapEntities([1, 2, 3, 4, 5, 6]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

test("Scenario 5", () => {
  const css = mapEntities([100, 2, 3, 6, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

test("Scenario 6", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [1, 3, 2];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(4);
});

test("Scenario 7", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [4, 5, 6];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(3);
});

test("Scenario 8", () => {
  const css = mapEntities([60, 40, 95, 75]);
  const customers = mapEntities([90, 70, 20, 40, 60, 10]);
  const csAway = [2, 4];
  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});
