This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Show Management Notes

There are two files relevant to show management:

- [showVariables.ts](./src/showVariables.ts)

- [corporationResources.ts](./src/fixtures/corporationsResources.ts)

The things that you can modify are always going to be the values of the variables, which are always **TO THE RIGHT** of the names of the variables, after the equal (`=`) sign. Do not modify names of variables under any circummnstances! More specifics on how to change values follow for each of these values you can change.

### Show Variables

(located in `./src/showVariables.ts`)
In show variables you can modify the following:

#### Name of Corporations

Names of corporations are defined in these lines:

```
export const PLAYER_CORPORATION_NAME = "Player";
export const ACTORS_CORPORATION_NAME = "Actors";
```

To modify the name of either corporation change the value what's in between **quotation marks**. By default the corporations are named Player and Actors. If, for example, I wanted to change the value of the player corporation to My Corporation, I would rewrite these lines to:

```
export const PLAYER_CORPORATION_NAME = "My Corporation";
export const ACTORS_CORPORATION_NAME = "Actors";
```

### Seconds per round

The time in seconds for each round is defined in this line:

```
export const SECONDS_PER_ROUND = 10*60;
```

By default each round is set to 10 minutes. Modify the number to modify this time. If, for example, I wanted to set each round to 30 minutes, I could change it like so:

```
export const SECONDS_PER_ROUND = 30*60;
```

### Buildings Information

The possible types of buildings are preset and cannot be changed. Talk to June or Diana if you want to change any of those, as it is a bit more complex. However, you can change the following:

- Initial cost of already existing
- Daily cost of already existing buildings
- Daily production of already existing buildings

To give an example let's look at the colony hub:

```
export const COLONY_HUB: BuildingConstant = {
  buildingType: COLONY_HUB_NAME,
  buildingCost: [
    { name: WATER_NAME, quantity: 5 },
    { name: OXYGEN_NAME, quantity: 5 },
    { name: FOOD_NAME, quantity: 3 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 5 },
  ],
  dailyProduction: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 5 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
  dailyCost: [
    { name: WATER_NAME, quantity: 5 },
    { name: OXYGEN_NAME, quantity: 5 },
    { name: FOOD_NAME, quantity: 3 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
};
```

You can see how costs are defined by a variable looking like this:

```
{name: <NAME_OF_MATERIAL>, quantity: <NUMBER>}
```

You can modify the cost by chnaging the number assigned to `quantity`.

So, for example, if I wanted to change the cost of the Colony Hub to 10 water, 7 oxygen, no food, no synthetics, and 23 rare metals, I could do so like this:

```
export const COLONY_HUB: BuildingConstant = {
  buildingType: COLONY_HUB_NAME,
  buildingCost: [
    { name: WATER_NAME, quantity: 10 },
    { name: OXYGEN_NAME, quantity: 7 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 23 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
  dailyProduction: [
    { name: WATER_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 5 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
  dailyCost: [
    { name: WATER_NAME, quantity: 5 },
    { name: OXYGEN_NAME, quantity: 5 },
    { name: FOOD_NAME, quantity: 3 },
    { name: MINERALS_NAME, quantity: 0 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
};
```

### Corporation Resources

The initial resources for corporations are defined in [corporationResources.ts](src/fixtures/corporationsResources.ts) (src/fixtures/corporationResources.ts). They are preset so that all materials are present, like so:

```
const corporationResourcesInformation =  {
  playerCorporationResources: [
    { name: WATER_NAME, quantity: 100 },
    { name: RARE_METAL_NAME, quantity: 100 },
    { name: OXYGEN_NAME, quantity: 100 },
    { name: FOOD_NAME, quantity: 100 },
    { name: MINERALS_NAME, quantity: 100 },
    { name: SYNTHETICS_NAME, quantity: 100 },
  ],
  actorsCorporationResources: [
    { name: WATER_NAME, quantity: 100 },
    { name: RARE_METAL_NAME, quantity: 100 },
    { name: OXYGEN_NAME, quantity: 100 },
    { name: FOOD_NAME, quantity: 100 },
    { name: MINERALS_NAME, quantity: 100 },
    { name: SYNTHETICS_NAME, quantity: 100 },
  ],
};
```

To change the quantity of initial resources of either corporation, simply change the value of the `quantity` variable of any resources. For example:

```
const corporationResourcesInformation =  {
  playerCorporationResources: [
    { name: WATER_NAME, quantity: 3 },
    { name: RARE_METAL_NAME, quantity: 100 },
    { name: OXYGEN_NAME, quantity: 100 },
    { name: FOOD_NAME, quantity: 4 },
    { name: MINERALS_NAME, quantity: 60 },
    { name: SYNTHETICS_NAME, quantity: 0 },
  ],
  actorsCorporationResources: [
    { name: WATER_NAME, quantity: 10 },
    { name: RARE_METAL_NAME, quantity: 0 },
    { name: OXYGEN_NAME, quantity: 33 },
    { name: FOOD_NAME, quantity: 0 },
    { name: MINERALS_NAME, quantity: 100 },
    { name: SYNTHETICS_NAME, quantity: 2 },
  ],
};
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### database

/api - connect

/api/reset - reset the database

/actors - reset the database
