#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[openbrush::implementation(Ownable)]
#[openbrush::contract]
pub mod community {
    use ink::{
        prelude::{string::String, vec::Vec},
        storage::Lazy,
    };
    use nutritionist_nft::NutritionistNFTRef;
    use openbrush::contracts::{
        ownable::OwnableError,
        psp34::{extensions::mintable::psp34mintable_external::PSP34Mintable, Id},
    };
    use openbrush::{modifiers, traits::Storage};

    pub const USER_APPLICATION_FEE: u128 = 10000000000000000;
    pub const NUTRITIONIST_APPLICATION_FEE: u128 = 5000000000000000;

    #[derive(Clone, Debug, PartialEq, scale::Decode, scale::Encode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    enum NutritionistApplicationStatus {
        NotApplied,
        Pending,
        Accepted,
        Rejected,
        Canceled,
    }

    #[derive(Clone, Debug, PartialEq, scale::Decode, scale::Encode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    enum UserSubscriptionStatus {
        NotActive,
        Active,
        Expired,
    }

    #[derive(Debug, scale::Decode, scale::Encode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum CommunityActionError {
        NotAMember,
        AlreadyAMember,
        NotANutritionist,
        AlreadyANutritionist,
        InsufficientPayment,
        InvalidSubStatus,
        OnlyOwner,
    }

    impl From<OwnableError> for CommunityActionError {
        fn from(_: OwnableError) -> CommunityActionError {
            CommunityActionError::OnlyOwner
        }
    }

    #[derive(Clone, Debug, scale::Decode, scale::Encode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    struct ConsultationService {
        consultant: AccountId,
        description: String,
    }

    #[derive(Debug, Clone, scale::Decode, scale::Encode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    struct Article {
        title: String,
        author: AccountId,
        name: String,
        content: String,
    }

    #[derive(Clone, Debug, scale::Decode, scale::Encode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    struct FitnessPlan {
        name: String,
        description: String,
        creator: AccountId,
    }

    #[derive(Clone, Debug, scale::Decode, scale::Encode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    struct MealPlan {
        name: String,
        description: String,
        creator: AccountId,
    }

    #[derive(Clone, Debug, scale::Decode, scale::Encode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub struct User {
        address: Option<AccountId>,
        data: String, //needs to be encrypted before storing
        sub_status: UserSubscriptionStatus,
        sub_deadline: u128,
    }

    impl User {
        pub fn new(address: Option<AccountId>, data: String) -> Self {
            User {
                address,
                data,
                sub_status: UserSubscriptionStatus::Active,
                sub_deadline: 0,
            }
        }
    }

    impl Default for User {
        fn default() -> Self {
            Self::new(None, String::new())
        }
    }

    #[derive(Clone, Debug, scale::Decode, scale::Encode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub struct Nutritionist {
        address: AccountId,
        data: String, //needs to be encrypted before storing
        meal_plans: Vec<MealPlan>,
        fitness_plans: Vec<FitnessPlan>,
        services: Vec<ConsultationService>,
        articles: Vec<Article>,
        status: NutritionistApplicationStatus,
    }

    #[derive(Debug, scale::Decode, scale::Encode)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    struct CommunityConfig {
        // configs
        treasury: AccountId,
        subscription_duration: u128,
        lilypad_fee: u128,

        // hashes
        nutritionist_nft_hash: Option<Hash>,
        user_nft_hash: Option<Hash>,
    }

    impl CommunityConfig {
        pub fn new(treasury: AccountId) -> Self {
            CommunityConfig {
                treasury,
                lilypad_fee: 2,
                subscription_duration: 2592000,
                nutritionist_nft_hash: None,
                user_nft_hash: None,
            }
        }
    }

    #[derive(Debug, scale::Decode, scale::Encode)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    struct CommunityStore {
        nutritionists: Vec<Nutritionist>,
        articles: Vec<Article>,
        users: Vec<User>,
    }

    #[ink(event)]
    pub struct NewApplication {
        applicant: AccountId,
        data_uri: String,
    }

    #[ink(event)]
    pub struct NewSignUp {
        user: AccountId,
        data_uri: String,
    }

    #[ink(event)]
    pub struct ApplicationApproved {
        applicant: AccountId,
    }

    #[ink(event)]
    pub struct ReceivedJobResults {
        job_id: u128,
        cid: String,
    }

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct Community {
        #[storage_field]
        ownable: ownable::Data,
        config: Lazy<CommunityConfig>,
        store: Lazy<CommunityStore>,
    }

    impl Community {
        /// Creates a new community contract initialized with the given value.
        #[ink(constructor)]
        pub fn new(treasury: AccountId) -> Self {
            let mut instance = Self::default();
            ownable::Internal::_init_with_owner(&mut instance, Self::env().caller());
            instance.config.set(&CommunityConfig::new(treasury));
            instance
        }

        fn _emit_new_application(&self, applicant: AccountId, data_uri: String) {
            self.env().emit_event(NewApplication {
                applicant,
                data_uri,
            });
        }

        fn _emit_new_sign_up(&self, user: AccountId, data_uri: String) {
            self.env().emit_event(NewSignUp { user, data_uri });
        }

        fn _emit_application_approved(&self, applicant: AccountId) {
            self.env().emit_event(ApplicationApproved { applicant });
        }

        fn _emit_received_job_results(&self, job_id: u128, cid: String) {
            self.env().emit_event(ReceivedJobResults { job_id, cid });
        }

        fn _mint_nutritionist_nft(&self, user: AccountId, nft_id: Id) {
            let nutritionist_nft_hash = self.config.get().unwrap().nutritionist_nft_hash;
            let mut nutritionist_nft = NutritionistNFTRef::new()
                .code_hash(nutritionist_nft_hash.unwrap())
                .endowment(0)
                .salt_bytes([0xDE, 0xAD, 0xBE, 0xEF])
                .instantiate();
            let _ = nutritionist_nft.mint(user, nft_id);
        }

        fn _mint_user_nft(&self, user: AccountId, nft_id: Id) {
            let user_nft_hash = self.config.get().unwrap().user_nft_hash;
            let mut user_nft = NutritionistNFTRef::new()
                .code_hash(user_nft_hash.unwrap())
                .endowment(0)
                .salt_bytes([0xDE, 0xAD, 0xBE, 0xEF])
                .instantiate();
            let _ = user_nft.mint(user, nft_id);
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn set_nfts(
            &mut self,
            user_nft: Hash,
            nutritionist_nft: Hash,
        ) -> Result<(), CommunityActionError> {
            let mut config = self.config.get().unwrap();
            config.user_nft_hash = Some(user_nft);
            config.nutritionist_nft_hash = Some(nutritionist_nft);
            self.config.set(&config);
            Ok(())
        }

        #[ink(message)]
        pub fn join_community(
            &mut self,
            user_data: String,
            nft_id: Id,
        ) -> Result<(), CommunityActionError> {
            let sender = self.env().caller();
            let mut store = self.store.get().unwrap();

            if store.nutritionists.iter().any(|n| n.address == sender) {
                return Err(CommunityActionError::AlreadyAMember);
            }

            let CommunityConfig {
                treasury,
                lilypad_fee,
                subscription_duration,
                ..
            } = self.config.get().unwrap();

            if self.env().transferred_value() < lilypad_fee {
                return Err(CommunityActionError::InsufficientPayment);
            }

            let mut user = User::new(Some(sender), user_data.clone());
            user.sub_deadline = (self.env().block_timestamp() as u128) + subscription_duration;

            // mint nft
            self._mint_user_nft(sender, nft_id);

            // save the user
            store.users.push(user);

            // update the store
            self.store.set(&store);

            let _ = self
                .env()
                .transfer(treasury, self.env().transferred_value());

            // Emit event
            self._emit_new_sign_up(sender, user_data.clone());
            Ok(())
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn reject_nutritionist_role(
            &mut self,
            applicant: AccountId,
        ) -> Result<(), CommunityActionError> {
            let mut store = self.store.get().unwrap();

            if store.nutritionists.iter().any(|n| n.address == applicant) {
                return Err(CommunityActionError::AlreadyANutritionist);
            }

            if let Some(nutritionist) = store
                .nutritionists
                .iter_mut()
                .find(|n| n.address == applicant)
            {
                nutritionist.status = NutritionistApplicationStatus::Rejected;
            }

            self.store.set(&store);

            Ok(())
        }

        #[ink(message)]
        pub fn renew_subscription(&mut self) -> Result<(), CommunityActionError> {
            let sender = self.env().caller();
            let mut store = self.store.get().unwrap();

            if let Some(user) = store
                .users
                .iter_mut()
                .find(|u| u.address.unwrap() == sender)
            {
                if user.sub_status != UserSubscriptionStatus::Expired {
                    return Err(CommunityActionError::InvalidSubStatus);
                }
                user.sub_status = UserSubscriptionStatus::Active;
            }

            self.store.set(&store);
            Ok(())
        }

        #[ink(message)]
        pub fn create_meal_plan(&mut self, meal_name: String, meal_plan_desc: String) {
            let creator = self.env().caller();
            let mut store = self.store.get().unwrap();

            if let Some(nutritionist) = store
                .nutritionists
                .iter_mut()
                .find(|n| n.address == creator)
            {
                let meal_plan = MealPlan {
                    name: meal_name,
                    description: meal_plan_desc,
                    creator,
                };
                nutritionist.meal_plans.push(meal_plan);
            }

            self.store.set(&store);
        }

        #[ink(message)]
        pub fn create_fitness_plan(&mut self, fitness_name: String, fitness_desc: String) {
            let creator = self.env().caller();
            let mut store = self.store.get().unwrap();

            if let Some(nutritionist) = store
                .nutritionists
                .iter_mut()
                .find(|n| n.address == creator)
            {
                let fitness_plan = FitnessPlan {
                    name: fitness_name,
                    description: fitness_desc,
                    creator,
                };
                nutritionist.fitness_plans.push(fitness_plan);
            }
            self.store.set(&store);
        }

        #[ink(message)]
        pub fn create_consultation(&mut self, description: String) {
            let consultant = self.env().caller();
            let mut store = self.store.get().unwrap();

            if let Some(nutritionist) = store
                .nutritionists
                .iter_mut()
                .find(|n| n.address == consultant)
            {
                let service = ConsultationService {
                    consultant,
                    description,
                };
                nutritionist.services.push(service);
            }
            self.store.set(&store);
        }

        #[ink(message)]
        pub fn publish_article(&mut self, title: String, author_name: String, content: String) {
            let publisher = self.env().caller();
            let mut store = self.store.get().unwrap();

            if let Some(nutritionist) = store
                .nutritionists
                .iter_mut()
                .find(|n| n.address == publisher)
            {
                let article = Article {
                    title,
                    author: publisher,
                    name: author_name,
                    content,
                };
                nutritionist.articles.push(article.clone());
                store.articles.push(article);
            }
            self.store.set(&store);
        }

        #[ink(message)]
        pub fn get_nutritionists(&self) -> Vec<Nutritionist> {
            let store = self.store.get().unwrap();
            store.nutritionists.clone()
        }

        #[ink(message)]
        pub fn get_users(&self) -> Vec<User> {
            let store = self.store.get().unwrap();
            store.users.clone()
        }
    }
}
