#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[openbrush::implementation(Ownable)]
#[openbrush::contract]
mod community {
    use ink::prelude::string::String;
    use openbrush::{modifiers, traits::Storage};

    pub const USER_APPLICATION_FEE: u128 = 10000000000000000;
    pub const NUTRITIONIST_APPLICATION_FEE: u128 = 5000000000000000;

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

    enum NutritionistApplicationStatus {
        NotApplied,
        Pending,
        Accepted,
        Rejected,
        Canceled,
    }

    enum UserSubscriptionStatus {
        NotActive,
        Active,
        Expired,
    }

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct Community {
        #[storage_field]
        ownable: ownable::Data,
    }

    impl Community {
        /// Creates a new community contract initialized with the given value.
        #[ink(constructor)]
        pub fn new(treasury: AccountId) -> Self {
            let mut instance = Self::default();
            ownable::Internal::_init_with_owner(&mut instance, Self::env().caller());
            // instance.data.treasury = treasury;
            // instance.subscription_duration = 2592000;
            // instance.lilypad_fee = 2;
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
    }
}
