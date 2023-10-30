#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[openbrush::implementation(Ownable, PSP34, PSP34Burnable, PSP34Metadata)]
#[openbrush::contract]
pub mod nutritionist_nft {
    use ink::{prelude::string::String, storage::Mapping};
    use openbrush::{contracts::ownable::OwnableImpl, modifiers, traits::Storage};

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct NutritionistNFT {
        #[storage_field]
        psp34: psp34::Data,
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        metadata: metadata::Data,
        token_uris: Mapping<Id, String>,
        next_id: u8,
    }

    #[default_impl(PSP34Burnable)]
    #[modifiers(only_owner)]
    fn burn(&mut self) {}

    impl NutritionistNFT {
        #[ink(constructor)]
        pub fn new(id: Id, name: String, symbol: String, owner: AccountId) -> Self {
            let mut instance = Self::default();

            ownable::Internal::_init_with_owner(&mut instance, owner);

            let name_key = String::from("name");
            let symbol_key = String::from("symbol");

            metadata::Internal::_set_attribute(&mut instance, id.clone(), name_key, name);
            metadata::Internal::_set_attribute(&mut instance, id, symbol_key, symbol);

            instance
        }

        fn _base_uri(&self) -> String {
            String::from("")
        }

        fn _set_token_uri(&mut self, token_id: Id, uri: String) {
            self.token_uris.insert(token_id, &uri);
        }

        #[ink(message)]
        pub fn token_uri(&self, token_id: Id) -> String {
            let token_uri = self.token_uris.get(&token_id).unwrap_or_default();
            let base = self._base_uri();

            // If there is no base URI, return the token URI.
            if base.is_empty() {
                return token_uri;
            }

            // return super.tokenURI(tokenId);
            String::default()
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn mint(&mut self, user: AccountId, uri: String) -> Result<(), PSP34Error> {
            let id = Id::U8(self.next_id);
            psp34::Internal::_mint_to(self, user, id.clone())?;
            self._set_token_uri(id, uri);
            self.next_id += 1;
            Ok(())
        }

        pub fn transfer(
            &mut self,
            _from: Option<&AccountId>,
            _to: Option<&AccountId>,
            _amount: &Balance,
        ) -> Result<(), PSP34Error> {
            Err(PSP34Error::SafeTransferCheckFailed(String::from(
                "NFT is SoulBound",
            )))
        }
    }
}
