export interface HomeShoppingCase {
  readonly name: string;
  readonly username: string;
  readonly password: string;
  readonly shoppingPath: string;
}

export const homeShoppingCases: readonly HomeShoppingCase[] = [
  {
    name: 'HP-SHOP-01 - Verify Shopping tab visibility and navigation',
    username: process.env.SCRIPTEDQA_USERNAME ?? 'admin',
    password: process.env.SCRIPTEDQA_PASSWORD ?? 'Pass@9211',
    shoppingPath: '/shopping',
  },
];
