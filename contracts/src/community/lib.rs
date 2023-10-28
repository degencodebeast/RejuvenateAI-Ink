#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[openbrush::implementation(Ownable)]
#[openbrush::contract]
pub mod community {
    use ink::{prelude::string::String, storage::Lazy};
    use openbrush::{modifiers, traits::Storage};

    pub const USER_APPLICATION_FEE: u128 = 10000000000000000;
    pub const NUTRITIONIST_APPLICATION_FEE: u128 = 5000000000000000;

    #[derive(Debug, scale::Decode, scale::Encode, scale_info::TypeInfo)]
    enum NutritionistApplicationStatus {
        NotApplied,
        Pending,
        Accepted,
        Rejected,
        Canceled,
    }

    #[derive(Debug, scale::Decode, scale::Encode, scale_info::TypeInfo)]
    enum UserSubscriptionStatus {
        NotActive,
        Active,
        Expired,
    }

    #[derive(Debug, scale::Decode, scale::Encode, scale_info::TypeInfo)]
    struct ConsultationServices {
        consultant: AccountId,
        description: String,
    }

    #[derive(Debug, scale::Decode, scale::Encode, scale_info::TypeInfo)]
    struct Articles {
        title: String,
        author: AccountId,
        name: String,
        content: String,
    }

    #[derive(Debug, scale::Decode, scale::Encode, scale_info::TypeInfo)]
    struct FitnessPlans {
        name: String,
        description: String,
        creator: AccountId,
    }

    #[derive(Debug, scale::Decode, scale::Encode, scale_info::TypeInfo)]
    struct MealPlans {
        name: String,
        description: String,
        creator: AccountId,
    }

    #[derive(Debug, scale::Decode, scale::Encode, scale_info::TypeInfo)]
    struct User {
        address: AccountId,
        data: String, //needs to be encrypted before storing
        sub_status: UserSubscriptionStatus,
        sub_deadline: u128,
    }

    #[derive(Debug, scale::Decode, scale::Encode, scale_info::TypeInfo)]
    struct Nutritionist {
        address: AccountId,
        data: String, //needs to be encrypted before storing
        meal_plans: Vec<MealPlans>,
        fitness_plans: Vec<FitnessPlans>,
        services: Vec<ConsultationServices>,
        articles: Vec<Articles>,
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
        subscription_duration: u128,
        lilypad_fee: u128,
        nutritionists: Vec<Nutritionist>,
    }

    impl Community {
        /// Creates a new community contract initialized with the given value.
        #[ink(constructor)]
        pub fn new(treasury: AccountId) -> Self {
            let mut instance = Self::default();
            ownable::Internal::_init_with_owner(&mut instance, Self::env().caller());
            instance.treasury.set(&treasury);
            instance.subscription_duration = 2592000;
            instance.lilypad_fee = 2;
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

        //     pub fn  createMealPlan(
        //     string memory _mealName,
        //     string memory mealPlanDesc
        // ) {
        //     Nutritionist storage _nutritionist = nutritionists[msg.sender];
        //     MealPlans memory mealPlan = MealPlans(
        //         _mealName,
        //         mealPlanDesc,
        //         msg.sender
        //     );
        //     _nutritionist.nutritionistMealplans.push(mealPlan);
        // }

        // pub fn  createFitnessPlan(
        //     string memory _fitnessName,
        //     string memory fitnessDesc
        // ) {
        //     Nutritionist storage _nutritionist = nutritionists[msg.sender];
        //     FitnessPlans memory fitnessPlan = FitnessPlans(
        //         _fitnessName,
        //         fitnessDesc,
        //         msg.sender
        //     );
        //     _nutritionist.fitnessPlans.push(fitnessPlan);
        // }

        pub fn createConsultation(self, description: String) {
            let caller = self.env().caller();
            let nutritionist = self.nutritionists;
            // ConsultationServices memory consultationService = ConsultationServices(
            //     msg.sender,
            //     _consultationDesc
            // );
            // _nutritionist.consultationServices = consultationService;
        }

        // pub fn publishArticle(
        //     string memory _title,
        //     string memory _authorName,
        //     string memory _content
        // )  {
        //     Nutritionist storage _nutritionist = nutritionists[msg.sender];
        //     Articles memory article = Articles(
        //         _title,
        //         msg.sender,
        //         _authorName,
        //         _content
        //     );
        //     _nutritionist.nutritionistArticles.push(article);
        //     allArticles.push(article);
        // }
    }
}
