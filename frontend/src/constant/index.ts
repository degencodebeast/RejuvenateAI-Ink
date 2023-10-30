export const CONTRACT_ADDRESS =
  '5FaKkBKW39MuaKA3PnhWxfbPYwV1gUkjn46iandieR63dcie';

export const metadata = {
  source: {
    hash: '0x71828f982976903dead12552155061ed7c0701bdc5a3ec4e250a84fffca6e45f',
    language: 'ink! 4.3.0',
    compiler: 'rustc 1.72.0',
    build_info: {
      build_mode: 'Release',
      cargo_contract_version: '3.2.0',
      rust_toolchain: 'stable-x86_64-apple-darwin',
      wasm_opt_settings: {
        keep_debug_symbols: false,
        optimization_passes: 'Z',
      },
    },
  },
  contract: {
    name: 'community',
    version: '1.0.0',
    authors: ['The best developer ever'],
  },
  spec: {
    constructors: [
      {
        args: [
          {
            label: 'treasury',
            type: {
              displayName: ['AccountId'],
              type: 0,
            },
          },
        ],
        default: false,
        docs: [
          'Creates a new community contract initialized with the given value.',
        ],
        label: 'new',
        payable: false,
        returnType: {
          displayName: ['ink_primitives', 'ConstructorResult'],
          type: 23,
        },
        selector: '0x9bae9d5e',
      },
    ],
    docs: [],
    environment: {
      accountId: {
        displayName: ['AccountId'],
        type: 0,
      },
      balance: {
        displayName: ['Balance'],
        type: 3,
      },
      blockNumber: {
        displayName: ['BlockNumber'],
        type: 36,
      },
      chainExtension: {
        displayName: ['ChainExtension'],
        type: 37,
      },
      hash: {
        displayName: ['Hash'],
        type: 4,
      },
      maxEventTopics: 4,
      timestamp: {
        displayName: ['Timestamp'],
        type: 35,
      },
    },
    events: [
      {
        args: [
          {
            docs: [],
            indexed: false,
            label: 'applicant',
            type: {
              displayName: ['AccountId'],
              type: 0,
            },
          },
          {
            docs: [],
            indexed: false,
            label: 'data_uri',
            type: {
              displayName: ['String'],
              type: 7,
            },
          },
        ],
        docs: [],
        label: 'NewApplication',
      },
      {
        args: [
          {
            docs: [],
            indexed: false,
            label: 'user',
            type: {
              displayName: ['AccountId'],
              type: 0,
            },
          },
          {
            docs: [],
            indexed: false,
            label: 'data_uri',
            type: {
              displayName: ['String'],
              type: 7,
            },
          },
        ],
        docs: [],
        label: 'NewSignUp',
      },
      {
        args: [
          {
            docs: [],
            indexed: false,
            label: 'applicant',
            type: {
              displayName: ['AccountId'],
              type: 0,
            },
          },
        ],
        docs: [],
        label: 'ApplicationApproved',
      },
    ],
    lang_error: {
      displayName: ['ink', 'LangError'],
      type: 25,
    },
    messages: [
      {
        args: [
          {
            label: 'user_nft',
            type: {
              displayName: ['Hash'],
              type: 4,
            },
          },
          {
            label: 'nutritionist_nft',
            type: {
              displayName: ['Hash'],
              type: 4,
            },
          },
        ],
        default: false,
        docs: [],
        label: 'set_nfts',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 26,
        },
        selector: '0x48630b4d',
      },
      {
        args: [
          {
            label: 'user_data',
            type: {
              displayName: ['String'],
              type: 7,
            },
          },
          {
            label: 'nft_data',
            type: {
              displayName: ['String'],
              type: 7,
            },
          },
        ],
        default: false,
        docs: [],
        label: 'join_community',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 26,
        },
        selector: '0xff5a574b',
      },
      {
        args: [
          {
            label: 'data_uri',
            type: {
              displayName: ['String'],
              type: 7,
            },
          },
        ],
        default: false,
        docs: [],
        label: 'apply_for_nutritionist_role',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 26,
        },
        selector: '0x26bae97d',
      },
      {
        args: [],
        default: false,
        docs: [],
        label: 'cancel_nutritionist_application',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 26,
        },
        selector: '0x117c8629',
      },
      {
        args: [
          {
            label: 'applicant',
            type: {
              displayName: ['AccountId'],
              type: 0,
            },
          },
        ],
        default: false,
        docs: [],
        label: 'approve_nutritionist_role',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 26,
        },
        selector: '0x9f0891ef',
      },
      {
        args: [
          {
            label: 'applicant',
            type: {
              displayName: ['AccountId'],
              type: 0,
            },
          },
        ],
        default: false,
        docs: [],
        label: 'reject_nutritionist_role',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 26,
        },
        selector: '0xdb68354e',
      },
      {
        args: [],
        default: false,
        docs: [],
        label: 'renew_subscription',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 26,
        },
        selector: '0x232ddfe4',
      },
      {
        args: [
          {
            label: 'meal_name',
            type: {
              displayName: ['String'],
              type: 7,
            },
          },
          {
            label: 'meal_plan_desc',
            type: {
              displayName: ['String'],
              type: 7,
            },
          },
        ],
        default: false,
        docs: [],
        label: 'create_meal_plan',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 23,
        },
        selector: '0x68f62cfd',
      },
      {
        args: [
          {
            label: 'fitness_name',
            type: {
              displayName: ['String'],
              type: 7,
            },
          },
          {
            label: 'fitness_desc',
            type: {
              displayName: ['String'],
              type: 7,
            },
          },
        ],
        default: false,
        docs: [],
        label: 'create_fitness_plan',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 23,
        },
        selector: '0xf07df4d5',
      },
      {
        args: [
          {
            label: 'description',
            type: {
              displayName: ['String'],
              type: 7,
            },
          },
        ],
        default: false,
        docs: [],
        label: 'create_consultation',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 23,
        },
        selector: '0x38cd96fd',
      },
      {
        args: [
          {
            label: 'title',
            type: {
              displayName: ['String'],
              type: 7,
            },
          },
          {
            label: 'author_name',
            type: {
              displayName: ['String'],
              type: 7,
            },
          },
          {
            label: 'content',
            type: {
              displayName: ['String'],
              type: 7,
            },
          },
        ],
        default: false,
        docs: [],
        label: 'publish_article',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 23,
        },
        selector: '0x92a17193',
      },
      {
        args: [],
        default: false,
        docs: [],
        label: 'get_all_nutritionists',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 29,
        },
        selector: '0xe3e7dbf4',
      },
      {
        args: [],
        default: false,
        docs: [],
        label: 'get_all_members',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 30,
        },
        selector: '0x018584bf',
      },
      {
        args: [],
        default: false,
        docs: [],
        label: 'Ownable::renounce_ownership',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 31,
        },
        selector: '0x5e228753',
      },
      {
        args: [
          {
            label: 'new_owner',
            type: {
              displayName: ['ownable_external', 'TransferOwnershipInput1'],
              type: 19,
            },
          },
        ],
        default: false,
        docs: [],
        label: 'Ownable::transfer_ownership',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 31,
        },
        selector: '0x11f43efd',
      },
      {
        args: [],
        default: false,
        docs: [],
        label: 'Ownable::owner',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 34,
        },
        selector: '0x4fa43c8c',
      },
    ],
  },
  storage: {
    root: {
      layout: {
        struct: {
          fields: [
            {
              layout: {
                struct: {
                  fields: [
                    {
                      layout: {
                        root: {
                          layout: {
                            enum: {
                              dispatchKey: '0x6f713913',
                              name: 'Option',
                              variants: {
                                '0': {
                                  fields: [],
                                  name: 'None',
                                },
                                '1': {
                                  fields: [
                                    {
                                      layout: {
                                        leaf: {
                                          key: '0x6f713913',
                                          ty: 0,
                                        },
                                      },
                                      name: '0',
                                    },
                                  ],
                                  name: 'Some',
                                },
                              },
                            },
                          },
                          root_key: '0x6f713913',
                        },
                      },
                      name: 'owner',
                    },
                  ],
                  name: 'Data',
                },
              },
              name: 'ownable',
            },
            {
              layout: {
                root: {
                  layout: {
                    struct: {
                      fields: [
                        {
                          layout: {
                            leaf: {
                              key: '0x5f17b3d4',
                              ty: 0,
                            },
                          },
                          name: 'treasury',
                        },
                        {
                          layout: {
                            leaf: {
                              key: '0x5f17b3d4',
                              ty: 3,
                            },
                          },
                          name: 'subscription_duration',
                        },
                        {
                          layout: {
                            enum: {
                              dispatchKey: '0x5f17b3d4',
                              name: 'Option',
                              variants: {
                                '0': {
                                  fields: [],
                                  name: 'None',
                                },
                                '1': {
                                  fields: [
                                    {
                                      layout: {
                                        leaf: {
                                          key: '0x5f17b3d4',
                                          ty: 4,
                                        },
                                      },
                                      name: '0',
                                    },
                                  ],
                                  name: 'Some',
                                },
                              },
                            },
                          },
                          name: 'nutritionist_nft_hash',
                        },
                        {
                          layout: {
                            enum: {
                              dispatchKey: '0x5f17b3d4',
                              name: 'Option',
                              variants: {
                                '0': {
                                  fields: [],
                                  name: 'None',
                                },
                                '1': {
                                  fields: [
                                    {
                                      layout: {
                                        leaf: {
                                          key: '0x5f17b3d4',
                                          ty: 4,
                                        },
                                      },
                                      name: '0',
                                    },
                                  ],
                                  name: 'Some',
                                },
                              },
                            },
                          },
                          name: 'user_nft_hash',
                        },
                      ],
                      name: 'CommunityConfig',
                    },
                  },
                  root_key: '0x5f17b3d4',
                },
              },
              name: 'config',
            },
            {
              layout: {
                root: {
                  layout: {
                    struct: {
                      fields: [
                        {
                          layout: {
                            leaf: {
                              key: '0x73ccd439',
                              ty: 5,
                            },
                          },
                          name: 'nutritionists',
                        },
                        {
                          layout: {
                            leaf: {
                              key: '0x73ccd439',
                              ty: 14,
                            },
                          },
                          name: 'articles',
                        },
                        {
                          layout: {
                            leaf: {
                              key: '0x73ccd439',
                              ty: 17,
                            },
                          },
                          name: 'users',
                        },
                        {
                          layout: {
                            leaf: {
                              key: '0x73ccd439',
                              ty: 21,
                            },
                          },
                          name: 'nutritionist_applications',
                        },
                      ],
                      name: 'CommunityStore',
                    },
                  },
                  root_key: '0x73ccd439',
                },
              },
              name: 'store',
            },
          ],
          name: 'Community',
        },
      },
      root_key: '0x00000000',
    },
  },
  types: [
    {
      id: 0,
      type: {
        def: {
          composite: {
            fields: [
              {
                type: 1,
                typeName: '[u8; 32]',
              },
            ],
          },
        },
        path: ['ink_primitives', 'types', 'AccountId'],
      },
    },
    {
      id: 1,
      type: {
        def: {
          array: {
            len: 32,
            type: 2,
          },
        },
      },
    },
    {
      id: 2,
      type: {
        def: {
          primitive: 'u8',
        },
      },
    },
    {
      id: 3,
      type: {
        def: {
          primitive: 'u128',
        },
      },
    },
    {
      id: 4,
      type: {
        def: {
          composite: {
            fields: [
              {
                type: 1,
                typeName: '[u8; 32]',
              },
            ],
          },
        },
        path: ['ink_primitives', 'types', 'Hash'],
      },
    },
    {
      id: 5,
      type: {
        def: {
          sequence: {
            type: 6,
          },
        },
      },
    },
    {
      id: 6,
      type: {
        def: {
          composite: {
            fields: [
              {
                name: 'account_id',
                type: 0,
                typeName: 'AccountId',
              },
              {
                name: 'data',
                type: 7,
                typeName: 'String',
              },
              {
                name: 'meal_plans',
                type: 8,
                typeName: 'Vec<MealPlan>',
              },
              {
                name: 'fitness_plans',
                type: 10,
                typeName: 'Vec<FitnessPlan>',
              },
              {
                name: 'services',
                type: 12,
                typeName: 'Vec<ConsultationService>',
              },
              {
                name: 'articles',
                type: 14,
                typeName: 'Vec<Article>',
              },
              {
                name: 'status',
                type: 16,
                typeName: 'NutritionistApplicationStatus',
              },
            ],
          },
        },
        path: ['community', 'community', 'Nutritionist'],
      },
    },
    {
      id: 7,
      type: {
        def: {
          primitive: 'str',
        },
      },
    },
    {
      id: 8,
      type: {
        def: {
          sequence: {
            type: 9,
          },
        },
      },
    },
    {
      id: 9,
      type: {
        def: {
          composite: {
            fields: [
              {
                name: 'name',
                type: 7,
                typeName: 'String',
              },
              {
                name: 'description',
                type: 7,
                typeName: 'String',
              },
              {
                name: 'creator',
                type: 0,
                typeName: 'AccountId',
              },
            ],
          },
        },
        path: ['community', 'community', 'MealPlan'],
      },
    },
    {
      id: 10,
      type: {
        def: {
          sequence: {
            type: 11,
          },
        },
      },
    },
    {
      id: 11,
      type: {
        def: {
          composite: {
            fields: [
              {
                name: 'name',
                type: 7,
                typeName: 'String',
              },
              {
                name: 'description',
                type: 7,
                typeName: 'String',
              },
              {
                name: 'creator',
                type: 0,
                typeName: 'AccountId',
              },
            ],
          },
        },
        path: ['community', 'community', 'FitnessPlan'],
      },
    },
    {
      id: 12,
      type: {
        def: {
          sequence: {
            type: 13,
          },
        },
      },
    },
    {
      id: 13,
      type: {
        def: {
          composite: {
            fields: [
              {
                name: 'consultant',
                type: 0,
                typeName: 'AccountId',
              },
              {
                name: 'description',
                type: 7,
                typeName: 'String',
              },
            ],
          },
        },
        path: ['community', 'community', 'ConsultationService'],
      },
    },
    {
      id: 14,
      type: {
        def: {
          sequence: {
            type: 15,
          },
        },
      },
    },
    {
      id: 15,
      type: {
        def: {
          composite: {
            fields: [
              {
                name: 'title',
                type: 7,
                typeName: 'String',
              },
              {
                name: 'author',
                type: 0,
                typeName: 'AccountId',
              },
              {
                name: 'name',
                type: 7,
                typeName: 'String',
              },
              {
                name: 'content',
                type: 7,
                typeName: 'String',
              },
            ],
          },
        },
        path: ['community', 'community', 'Article'],
      },
    },
    {
      id: 16,
      type: {
        def: {
          variant: {
            variants: [
              {
                index: 0,
                name: 'NotApplied',
              },
              {
                index: 1,
                name: 'Pending',
              },
              {
                index: 2,
                name: 'Accepted',
              },
              {
                index: 3,
                name: 'Rejected',
              },
              {
                index: 4,
                name: 'Canceled',
              },
            ],
          },
        },
        path: ['community', 'community', 'NutritionistApplicationStatus'],
      },
    },
    {
      id: 17,
      type: {
        def: {
          sequence: {
            type: 18,
          },
        },
      },
    },
    {
      id: 18,
      type: {
        def: {
          composite: {
            fields: [
              {
                name: 'account_id',
                type: 19,
                typeName: 'Option<AccountId>',
              },
              {
                name: 'data',
                type: 7,
                typeName: 'String',
              },
              {
                name: 'sub_status',
                type: 20,
                typeName: 'UserSubscriptionStatus',
              },
              {
                name: 'sub_deadline',
                type: 3,
                typeName: 'u128',
              },
            ],
          },
        },
        path: ['community', 'community', 'User'],
      },
    },
    {
      id: 19,
      type: {
        def: {
          variant: {
            variants: [
              {
                index: 0,
                name: 'None',
              },
              {
                fields: [
                  {
                    type: 0,
                  },
                ],
                index: 1,
                name: 'Some',
              },
            ],
          },
        },
        params: [
          {
            name: 'T',
            type: 0,
          },
        ],
        path: ['Option'],
      },
    },
    {
      id: 20,
      type: {
        def: {
          variant: {
            variants: [
              {
                index: 0,
                name: 'NotActive',
              },
              {
                index: 1,
                name: 'Active',
              },
              {
                index: 2,
                name: 'Expired',
              },
            ],
          },
        },
        path: ['community', 'community', 'UserSubscriptionStatus'],
      },
    },
    {
      id: 21,
      type: {
        def: {
          sequence: {
            type: 22,
          },
        },
      },
    },
    {
      id: 22,
      type: {
        def: {
          composite: {
            fields: [
              {
                name: 'data_uri',
                type: 7,
                typeName: 'String',
              },
              {
                name: 'account_id',
                type: 0,
                typeName: 'AccountId',
              },
              {
                name: 'status',
                type: 16,
                typeName: 'NutritionistApplicationStatus',
              },
            ],
          },
        },
        path: ['community', 'community', 'NutritionistApplication'],
      },
    },
    {
      id: 23,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 24,
                  },
                ],
                index: 0,
                name: 'Ok',
              },
              {
                fields: [
                  {
                    type: 25,
                  },
                ],
                index: 1,
                name: 'Err',
              },
            ],
          },
        },
        params: [
          {
            name: 'T',
            type: 24,
          },
          {
            name: 'E',
            type: 25,
          },
        ],
        path: ['Result'],
      },
    },
    {
      id: 24,
      type: {
        def: {
          tuple: [],
        },
      },
    },
    {
      id: 25,
      type: {
        def: {
          variant: {
            variants: [
              {
                index: 1,
                name: 'CouldNotReadInput',
              },
            ],
          },
        },
        path: ['ink_primitives', 'LangError'],
      },
    },
    {
      id: 26,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 27,
                  },
                ],
                index: 0,
                name: 'Ok',
              },
              {
                fields: [
                  {
                    type: 25,
                  },
                ],
                index: 1,
                name: 'Err',
              },
            ],
          },
        },
        params: [
          {
            name: 'T',
            type: 27,
          },
          {
            name: 'E',
            type: 25,
          },
        ],
        path: ['Result'],
      },
    },
    {
      id: 27,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 24,
                  },
                ],
                index: 0,
                name: 'Ok',
              },
              {
                fields: [
                  {
                    type: 28,
                  },
                ],
                index: 1,
                name: 'Err',
              },
            ],
          },
        },
        params: [
          {
            name: 'T',
            type: 24,
          },
          {
            name: 'E',
            type: 28,
          },
        ],
        path: ['Result'],
      },
    },
    {
      id: 28,
      type: {
        def: {
          variant: {
            variants: [
              {
                index: 0,
                name: 'NotAMember',
              },
              {
                index: 1,
                name: 'AlreadyAMember',
              },
              {
                index: 2,
                name: 'NotANutritionist',
              },
              {
                index: 3,
                name: 'AlreadyANutritionist',
              },
              {
                index: 4,
                name: 'InsufficientPayment',
              },
              {
                index: 5,
                name: 'InvalidSubStatus',
              },
              {
                index: 6,
                name: 'OnlyOwner',
              },
              {
                index: 7,
                name: 'ApplicationNotFound',
              },
              {
                fields: [
                  {
                    type: 7,
                    typeName: 'String',
                  },
                ],
                index: 8,
                name: 'UnauthorizedApplication',
              },
            ],
          },
        },
        path: ['community', 'community', 'CommunityActionError'],
      },
    },
    {
      id: 29,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 5,
                  },
                ],
                index: 0,
                name: 'Ok',
              },
              {
                fields: [
                  {
                    type: 25,
                  },
                ],
                index: 1,
                name: 'Err',
              },
            ],
          },
        },
        params: [
          {
            name: 'T',
            type: 5,
          },
          {
            name: 'E',
            type: 25,
          },
        ],
        path: ['Result'],
      },
    },
    {
      id: 30,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 17,
                  },
                ],
                index: 0,
                name: 'Ok',
              },
              {
                fields: [
                  {
                    type: 25,
                  },
                ],
                index: 1,
                name: 'Err',
              },
            ],
          },
        },
        params: [
          {
            name: 'T',
            type: 17,
          },
          {
            name: 'E',
            type: 25,
          },
        ],
        path: ['Result'],
      },
    },
    {
      id: 31,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 32,
                  },
                ],
                index: 0,
                name: 'Ok',
              },
              {
                fields: [
                  {
                    type: 25,
                  },
                ],
                index: 1,
                name: 'Err',
              },
            ],
          },
        },
        params: [
          {
            name: 'T',
            type: 32,
          },
          {
            name: 'E',
            type: 25,
          },
        ],
        path: ['Result'],
      },
    },
    {
      id: 32,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 24,
                  },
                ],
                index: 0,
                name: 'Ok',
              },
              {
                fields: [
                  {
                    type: 33,
                  },
                ],
                index: 1,
                name: 'Err',
              },
            ],
          },
        },
        params: [
          {
            name: 'T',
            type: 24,
          },
          {
            name: 'E',
            type: 33,
          },
        ],
        path: ['Result'],
      },
    },
    {
      id: 33,
      type: {
        def: {
          variant: {
            variants: [
              {
                index: 0,
                name: 'CallerIsNotOwner',
              },
              {
                index: 1,
                name: 'NewOwnerIsNotSet',
              },
            ],
          },
        },
        path: [
          'openbrush_contracts',
          'traits',
          'errors',
          'ownable',
          'OwnableError',
        ],
      },
    },
    {
      id: 34,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 19,
                  },
                ],
                index: 0,
                name: 'Ok',
              },
              {
                fields: [
                  {
                    type: 25,
                  },
                ],
                index: 1,
                name: 'Err',
              },
            ],
          },
        },
        params: [
          {
            name: 'T',
            type: 19,
          },
          {
            name: 'E',
            type: 25,
          },
        ],
        path: ['Result'],
      },
    },
    {
      id: 35,
      type: {
        def: {
          primitive: 'u64',
        },
      },
    },
    {
      id: 36,
      type: {
        def: {
          primitive: 'u32',
        },
      },
    },
    {
      id: 37,
      type: {
        def: {
          variant: {},
        },
        path: ['ink_env', 'types', 'NoChainExtension'],
      },
    },
  ],
  version: '4',
};
