#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[openbrush::implementation(PSP22, PSP22Ownable)]
#[openbrush::contract]
pub mod treasury {
    use openbrush::traits::{Storage, String};

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct Contract {
        #[storage_field]
        psp22: psp22::Data,
        #[storage_field]
        ownable: ownable::Data,
    }

    impl Contract {
        #[ink(constructor)]
        pub fn new(initial_supply: Balance) -> Self {
            let mut _instance = Self::default();
            psp22::Internal::_mint(&mut _instance, Self::env().caller(), initial_supply)
                .expect("Should mint");
            ownable::Internal::_init_with_owner(&mut _instance, Self::env().caller());
            _instance
        }

        pub fn withdrawFunds(self, amount: u128, address: String) {}
    }
}
