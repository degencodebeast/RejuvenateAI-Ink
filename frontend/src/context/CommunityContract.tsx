import { PropsWithChildren, createContext, useContext } from 'react';
import { Call, ChainContract, Tx, useCall, useContract, useTx } from 'useink';
import { useTxNotifications } from 'useink/notifications';
import { CONTRACT_ADDRESS, metadata } from '../constant';

interface CommunityContractState {
  community?: ChainContract;
  createMealPlan?: Tx<any>;
  publishArticle?: Tx<any>;
  createFitnessPlan?: Tx<any>;
  createConsultation?: Tx<any>;
  joinCommunity?: Tx<any>;
  cancelNutritionistApplication?: Tx<any>;
  applyForNutritionistRole?: Tx<any>;
  getAllMembers?: Call<any>;
  getAllNutritionists?: Call<any>;
}

export const CommunityContractContext = createContext<CommunityContractState>(
  {}
);

export function CommunityContractProvider({ children }: PropsWithChildren) {
  const community = useContract(CONTRACT_ADDRESS, metadata);
  const createMealPlan = useTx(community, 'createMealPlan');
  const publishArticle = useTx(community, 'publishArticle');
  const createFitnessPlan = useTx(community, 'createFitnessPlan');
  const createConsultation = useTx(community, 'createConsultation');
  const joinCommunity = useTx(community, 'joinCommunity');
  const cancelNutritionistApplication = useTx(
    community,
    'cancelNutritionistApplication'
  );
  const applyForNutritionistRole = useTx(community, 'applyForNutritionistRole');
  const getAllMembers = useCall(community, 'getAllMembers');
  const getAllNutritionists = useCall(community, 'getAllNutritionists');

  useTxNotifications(createMealPlan);
  useTxNotifications(publishArticle);
  useTxNotifications(createFitnessPlan);
  useTxNotifications(createConsultation);
  useTxNotifications(joinCommunity);
  useTxNotifications(cancelNutritionistApplication);
  useTxNotifications(applyForNutritionistRole);

  const contextValue: CommunityContractState = {
    community,
    createMealPlan,
    publishArticle,
    createFitnessPlan,
    createConsultation,
    joinCommunity,
    cancelNutritionistApplication,
    applyForNutritionistRole,
    getAllMembers,
    getAllNutritionists,
  };

  return (
    <CommunityContractContext.Provider value={contextValue}>
      {children}
    </CommunityContractContext.Provider>
  );
}

export function useCommunityContext() {
  return useContext(CommunityContractContext);
}
