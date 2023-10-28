#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[openbrush::implementation(Ownable, PSP34, PSP34Burnable, PSP34Mintable, PSP34Metadata)]
#[openbrush::contract]
pub mod nutritionist_nft {
    use openbrush::{modifiers, traits::Storage};

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct NutritionistNFT {
        #[storage_field]
        psp34: psp34::Data,
        #[storage_field]
        metadata: metadata::Data,
        #[storage_field]
        ownable: ownable::Data,
    }

    #[default_impl(PSP34Burnable)]
    #[modifiers(only_owner)]
    fn burn(&mut self) {}

    impl NutritionistNFT {
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
                String::from("NutritionistNFT"),
            );
            metadata::Internal::_set_attribute(
                &mut _instance,
                collection_id,
                String::from("symbol"),
                String::from("NutritionistNFT"),
            );
            _instance
        }
    }
}
