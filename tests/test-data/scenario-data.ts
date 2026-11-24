export const demoCredentials = {
  username: process.env.SCRIPTEDQA_USERNAME ?? 'admin',
  password: process.env.SCRIPTEDQA_PASSWORD ?? 'Pass@9211',
} as const;

export const invalidCredentialCases = [
  { username: 'invalid_user', password: 'WrongPassword' },
  { username: demoCredentials.username, password: 'WrongPassword' },
  { username: 'invalid_user', password: demoCredentials.password },
] as const;

export const products = {
  laptop: { name: 'Laptop', category: 'electronics', shoppingPrice: '$1000' },
  headphones: { name: 'Headphones', category: 'electronics', shoppingPrice: '$200', cartPrice: '$200.00' },
  mango: { name: 'Mango', category: 'Fruits', shoppingPrice: '$1', cartPrice: '$1.00' },
  apple: { name: 'Apple', category: 'Fruits', shoppingPrice: '$2.2' },
  dragonFruit: { name: 'Dragon Fruit', category: 'Fruits', shoppingPrice: '$5' },
  cauliflower: { name: 'Cauliflower', category: 'Vegitables', shoppingPrice: '$0.8' },
  treadmill: { name: 'Treadmill', category: 'Sports & Fitness', shoppingPrice: '$899' },
  microwave: { name: 'Microwave Oven', category: 'electronics', shoppingPrice: '$290' },
  smartwatch: { name: 'Smartwatch', category: 'electronics', shoppingPrice: '$499' },
  dumbbell: { name: 'Dumbbell', category: 'Sports & Fitness', shoppingPrice: '$489' },
  mobile: { name: 'Mobile', category: 'electronics', shoppingPrice: '$1500' },
  refrigerator: { name: 'Refrigerator', category: 'electronics', shoppingPrice: '$888' },
  football: { name: 'Football', category: 'Sports & Fitness', shoppingPrice: '$99.99' },
  eggplant: { name: 'Eggplant', category: 'Vegitables', shoppingPrice: '$0.5' },
  bat: { name: 'Bat', category: 'Sports & Fitness', shoppingPrice: '$649' },
} as const;
