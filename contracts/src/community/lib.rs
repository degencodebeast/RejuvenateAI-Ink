#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[openbrush::implementation(Ownable)]
#[openbrush::contract]
pub mod community {
    use ink::{
        prelude::{string::String, vec::Vec},
        storage::Lazy,
    };
    use openbrush::{modifiers, traits::Storage};

    pub const USER_APPLICATION_FEE: u128 = 10000000000000000;
    pub const NUTRITIONIST_APPLICATION_FEE: u128 = 5000000000000000;

    #[derive(Debug, scale::Decode, scale::Encode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    enum NutritionistApplicationStatus {
        NotApplied,
        Pending,
        Accepted,
        Rejected,
        Canceled,
    }

    #[derive(Debug, scale::Decode, scale::Encode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    enum UserSubscriptionStatus {
        NotActive,
        Active,
        Expired,
    }

    #[derive(Debug, scale::Decode, scale::Encode)]
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

    #[derive(Debug, scale::Decode, scale::Encode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    struct FitnessPlan {
        name: String,
        description: String,
        creator: AccountId,
    }

    #[derive(Debug, scale::Decode, scale::Encode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    struct MealPlan {
        name: String,
        description: String,
        creator: AccountId,
    }

    #[derive(Debug, scale::Decode, scale::Encode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    struct User {
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
                sub_status: UserSubscriptionStatus::NotActive,
                sub_deadline: 0,
            }
        }
    }

    impl Default for User {
        fn default() -> Self {
            Self::new(None, String::new())
        }
    }

    #[derive(Debug, scale::Decode, scale::Encode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    struct Nutritionist {
        address: AccountId,
        data: String, //needs to be encrypted before storing
        meal_plans: Vec<MealPlan>,
        fitness_plans: Vec<FitnessPlan>,
        services: Vec<ConsultationService>,
        articles: Vec<Article>,
        // address: AccountId,
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
        treasury: Lazy<AccountId>,
        subscription_duration: Lazy<u128>,
        lilypad_fee: Lazy<u128>,
        nutritionists: Vec<Nutritionist>,
        articles: Vec<Article>,
        users: Vec<User>,
    }

    impl Community {
        /// Creates a new community contract initialized with the given value.
        #[ink(constructor)]
        pub fn new(treasury: AccountId) -> Self {
            let mut instance = Self::default();
            ownable::Internal::_init_with_owner(&mut instance, Self::env().caller());
            instance.treasury.set(&treasury);
            instance.subscription_duration.set(&2592000);
            instance.lilypad_fee.set(&2);
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

        #[ink(message)]
        pub fn join_community(&mut self, user_data: String, nft_uri: String) {
            let sender = self.env().caller();
            // if self.nutritionists.iter().any(|n| n.address == sender) {
            //     return Err(AlreadyAMember);
            // }

            // if self.env().transferred_value() < Some(self.lilypad_fee.get()) {
            //     return Err(InsufficientPayment);
            // }

            // let index = self.user_index_counter.get();
            // self.is_member.insert(sender, true);
            // let mut user = User::default();
            // user.user_address = sender;
            // user.user_personal_data = user_data;
            // user.sub_status = UserSubscriptionStatus::Active;
            // user.sub_deadline = self.env().block_timestamp() + self.subscription_duration.get();
            // self.users.insert(sender, user);
            // self.user_to_index.insert(sender, index);
            // self.all_users.push(user);
            // self.all_user_addresses.push(sender);

            // // mint userNft for the user
            // self.user_nft.mint(sender, nft_uri);
            // self.env()
            //     .transfer(self.treasury.get(), self.env().transferred_balance());

            // Emit event
            self._emit_new_sign_up(sender, user_data);
        }

        #[ink(message)]
        pub fn create_meal_plan(&mut self, meal_name: String, meal_plan_desc: String) {
            let creator = self.env().caller();
            if let Some(nutritionist) = self.nutritionists.iter_mut().find(|n| n.address == creator)
            {
                let meal_plan = MealPlan {
                    name: meal_name,
                    description: meal_plan_desc,
                    creator,
                };
                nutritionist.meal_plans.push(meal_plan);
            }
        }

        #[ink(message)]
        pub fn create_fitness_plan(&mut self, fitness_name: String, fitness_desc: String) {
            let creator = self.env().caller();
            if let Some(nutritionist) = self.nutritionists.iter_mut().find(|n| n.address == creator)
            {
                let fitness_plan = FitnessPlan {
                    name: fitness_name,
                    description: fitness_desc,
                    creator,
                };
                nutritionist.fitness_plans.push(fitness_plan);
            }
        }

        #[ink(message)]
        pub fn create_consultation(&mut self, description: String) {
            let consultant = self.env().caller();
            if let Some(nutritionist) = self
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
        }

        #[ink(message)]
        pub fn publish_article(&mut self, title: String, author_name: String, content: String) {
            let publisher = self.env().caller();
            if let Some(nutritionist) = self
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
                self.articles.push(article);
            }
        }
    }
}
