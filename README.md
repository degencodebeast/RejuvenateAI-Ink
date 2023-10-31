# RejuvenateAI x Polkadot Ink hack 

Live Demo - [Loom video](https://www.loom.com/share/ae30c4496b41473496bca85fde4a3950) <br />
Live Link - [RejuvenateAI dapp](https://rejuvenate-ai-app.vercel.app/) <br />

## ✨ Description

[RejuvenateAI](https://rejuvenate-ai-app.vercel.app/) is the first community blockchain based project powered by community built for community to promote healthy living and achieve  healthy locations where people live up to a 100 years all around the world. We are trying to make sure people live healthy by incorporating healthy habits into their lifestyle and trying to make sure they get the most out of the human experience by discovering their purpose if they haven't already and enjoying this life, all while doing it together as a community being accountable to each other.

## Inspiration

People are becoming obsessed with living longer, but they don't know how, they are spending so much money on drugs and supplements, but are they really doing it correctly? We don't think so, so that's why we at RejuvenateAI have come up with this idea to focus on nutrition and fitness. What if we can create communities that are focused on living up to 100 years. 

## What we built

Our features empower personal healthy living habits by:

- Allowing users to setup meetings with nutritionists who would offer professional consultation to them.
- Providing educative articles that can inspire users to live healthier lives. 
- Providing educative meal and fitness plans that paid subscribers have access to.

## 💻 How we built RejuvenateAI

Here's a breakdown of how it was built:


1. Users can sign up with the ```join_community``` function, which they will pay the subscription fee and then get onboarded into our platform to enjoy our services

2. Nutritionists can sign up with the ```apply_for_nutritionist_role``` function, which they will pass their credentials into and have their application status set to pending.

3. We will then see their applicaiton status, and after verifying their credentials and see that it's legitimate we can now approve their status by calling the ```approve_nutritionist_role``` function, which will approve the nutritionists and set their application status as accepted, and they can now be onboarded into our platform.

4. Now these nutritionists can now create meal plans by calling ``create_meal_plans`` which will create meal plans for users to access.


## Where we deployed to/contract details

We created and deployed our smart contracts on the Aleph zero testnet chain. 

### Aleph zero testnet

1. Community contract ```5FaKkBKW39MuaKA3PnhWxfbPYwV1gUkjn46iandieR63dcie``` - [View source code](https://github.com/degencodebeast/RejuvenateAI-Ink/blob/main/contracts/src/community/lib.rs) 

2. Treasury contract ```5H5mV4kU431PBLwCA83Cixrma1TL83QEQtzi6cjZ8BtSMgQG``` - [View source code](https://github.com/degencodebeast/RejuvenateAI-Ink/blob/main/contracts/src/treasury/lib.rs)

3. User NFT contract ```5D6ocHDWvRNojBvg6LBJ7VQSjuqdWHjkv3u7eiW3zshtjkLi``` - [View source code](https://github.com/degencodebeast/RejuvenateAI-Ink/blob/main/contracts/src/user_nft/lib.rs) 

4. Nutritionist NFT contract ```5HL2n8E7CCYxjF2iPNEg938g8PGsvyDvsfsJxaFarWW3nsUL``` - [View source code](https://github.com/degencodebeast/RejuvenateAI-Ink/blob/main/contracts/src/nutritionist_nft/lib.rs)