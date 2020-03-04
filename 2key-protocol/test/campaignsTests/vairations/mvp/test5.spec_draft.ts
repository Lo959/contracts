import '../../../constants/polifils';
import getAcquisitionCampaignData from "../../helpers/getAcquisitionCampaignData";
import singletons from "../../../../src/contracts/singletons";
import {campaignTypes, incentiveModels, vestingSchemas} from "../../../constants/smallConstants";
import TestStorage from "../../../helperClasses/TestStorage";
import createAcquisitionCampaign from "../../helpers/createAcquisitionCampaign";
import {userIds} from "../../../constants/availableUsers";
import checkAcquisitionCampaign from "../../reusable/checkAcquisitionCampaign";
import usersActions from "../../reusable/userActions/usersActions";
import {campaignUserActions, maxRefReward} from "../../constants/constants";


const conversionSize = 5;
const networkId = parseInt(process.env.MAIN_NET_ID, 10);

const campaignData = getAcquisitionCampaignData(
  {
    amount: 0,
    campaignInventory: 1234000,
    maxConverterBonusPercent: 0,
    pricePerUnitInETHOrUSD: 0.095,
    maxReferralRewardPercent: 20,
    minContributionETHorUSD: 5,
    maxContributionETHorUSD: 1000000,
    campaignStartTime: 0,
    campaignEndTime: 9884748832,
    acquisitionCurrency: 'USD',
    twoKeyEconomy: singletons.TwoKeyEconomy.networks[networkId].address,
    isFiatOnly: true,
    isFiatConversionAutomaticallyApproved: true,
    vestingAmount: vestingSchemas.baseAndBonus,
    isKYCRequired: false,
    incentiveModel: incentiveModels.vanillaPowerLaw,
    tokenDistributionDate: 1,
    numberOfVestingPortions: 1,
    numberOfDaysBetweenPortions: 0,
    bonusTokensVestingStartShiftInDaysFromDistributionDate: 0,
    maxDistributionDateShiftInDays: 0,
  }
);

describe(
  'FIAT, no bonus, no KYC, no bank, all tokens released in DD, growing incentive [Tokensale]',
  () => {
    const storage = new TestStorage(userIds.aydnep, campaignTypes.acquisition, campaignData.isKYCRequired);

    before(function () {
      this.timeout(60000);
      return createAcquisitionCampaign(campaignData, storage);
    });

    checkAcquisitionCampaign(campaignData, storage);

    usersActions(
      {
        userKey: userIds.gmail,
        secondaryUserKey: storage.contractorKey,
        actions: [
          campaignUserActions.visit,
          campaignUserActions.join,
        ],
        campaignData,
        storage,
        cut: 40,
      }
    );

    usersActions(
      {
        userKey: userIds.gmail2,
        secondaryUserKey: userIds.gmail,
        actions: [
          campaignUserActions.visit,
          campaignUserActions.join,
        ],
        campaignData,
        storage,
        cut: 20,
      }
    );

    usersActions(
      {
        userKey: userIds.test4,
        secondaryUserKey: userIds.gmail2,
        actions: [
          campaignUserActions.visit,
          campaignUserActions.joinAndConvert,
        ],
        campaignData,
        storage,
        contribution: conversionSize,
      }
    );

    usersActions(
      {
        userKey: userIds.test4,
        actions: [
          campaignUserActions.checkConversionPurchaseInfo,
          campaignUserActions.checkReferrerReward,
        ],
        campaignData,
        storage,
      }
    );
  },
);
