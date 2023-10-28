#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[openbrush::implementation(Ownable, PSP22)]
#[openbrush::contract]
pub mod treasury {
    use openbrush::{
        contracts::{ownable::OwnableError, psp22::PSP22Impl},
        modifiers,
        traits::Storage,
    };

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
        pub fn new() -> Self {
            let mut _instance = Self::default();
            ownable::Internal::_init_with_owner(&mut _instance, Self::env().caller());
            _instance
        }

        #[modifiers(only_owner)]
        pub fn withdraw_funds(
            &mut self,
            amount: Balance,
            address: AccountId,
        ) -> Result<(), OwnableError> {
            let _ = PSP22Impl::transfer(self, address, amount, Vec::new());
            Ok(())
        }
    }
}
