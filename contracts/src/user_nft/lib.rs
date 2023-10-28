#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[openbrush::implementation(Ownable, PSP34, PSP34Burnable, PSP34Mintable, PSP34Metadata)]
#[openbrush::contract]
pub mod user_nft {
    use openbrush::{contracts::psp34::PSP34Error, modifiers, traits::Storage};

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct UserNFT {
        #[storage_field]
        psp34: psp34::Data,
        #[storage_field]
        metadata: metadata::Data,
        #[storage_field]
        ownable: ownable::Data,
    }

    #[overrider(psp34::Internal)] // we want to override psp22::Internal::_before_token_transfer method
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
            let mut _instance = Self::default();
            psp34::Internal::_mint_to(&mut _instance, Self::env().caller(), Id::U8(1))
                .expect("Can mint");
            let collection_id = PSP34::collection_id(&_instance);
            metadata::Internal::_set_attribute(
                &mut _instance,
                collection_id.clone(),
                String::from("name"),
                String::from("UserNFT"),
            );
            metadata::Internal::_set_attribute(
                &mut _instance,
                collection_id,
                String::from("symbol"),
                String::from("UserNFT"),
            );
            _instance
        }
    }
}
