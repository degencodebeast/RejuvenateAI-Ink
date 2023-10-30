#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[openbrush::implementation(Ownable, PSP34, PSP34Burnable)]
#[openbrush::contract]
pub mod user_nft {
    use ink::prelude::string::String;
    use openbrush::{modifiers, traits::Storage};

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct UserNFT {
        #[storage_field]
        psp34: psp34::Data,
        #[storage_field]
        ownable: ownable::Data,
        next_id: u8,
    }

    #[overrider(psp34::Internal)] // we want to override psp34::Internal::_before_token_transfer method
    fn _before_token_transfer(
        &mut self,
        from: Option<&AccountId>,
        _to: Option<&AccountId>,
        _amount: &Balance,
    ) -> Result<(), PSP34Error> {
        Err(PSP34Error::SafeTransferCheckFailed(String::from(
            "NFT is SoulBound",
        )))
    }

    #[default_impl(PSP34Burnable)]
    #[modifiers(only_owner)]
    fn burn(&mut self) {}

    impl UserNFT {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self::default()
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn mint(&mut self, user: AccountId) -> Result<(), PSP34Error> {
            psp34::Internal::_mint_to(self, user, Id::U8(self.next_id))?;
            self.next_id += 1;
            Ok(())
        }
    }
}
