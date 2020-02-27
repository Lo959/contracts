import '../../constants/polifils';
import getAcquisitionCampaignData from "../helpers/getAcquisitionCampaignData";
import singletons from "../../../src/contracts/singletons";
import {incentiveModels, vestingSchemas} from "../../constants/smallConstants";
import TestStorage from "../../helperClasses/TestStorage";
import createAcquisitionCampaign from "../helpers/createAcquisitionCampaign";
import {userIds} from "../../constants/availableUsers";
import checkAcquisitionCampaign from "../reusable/checkAcquisitionCampaign";
import usersActions from "../reusable/usersActions";
import {campaignUserActions} from "../constants/constants";

const conversionSize = 5;
const networkId = parseInt(process.env.MAIN_NET_ID, 10);

const campaignData = getAcquisitionCampaignData(
  {
    amount: 0,
    campaignInventory: 1234000,
    maxConverterBonusPercent: 100,
    pricePerUnitInETHOrUSD: 0.095,
    maxReferralRewardPercent: 20,
    minContributionETHorUSD: 5,
    maxContributionETHorUSD: 1000000,
    campaignStartTime: 0,
    campaignEndTime: 9884748832,
    acquisitionCurrency: 'ETH',
    twoKeyEconomy: singletons.TwoKeyEconomy.networks[networkId].address,
    isFiatOnly: false,
    isFiatConversionAutomaticallyApproved: true,
    vestingAmount: vestingSchemas.baseAndBonus,
    isKYCRequired: true,
    incentiveModel: incentiveModels.manual,
    tokenDistributionDate: 1,
    numberOfVestingPortions: 1,
    numberOfDaysBetweenPortions: 0,
    bonusTokensVestingStartShiftInDaysFromDistributionDate: 0,
    maxDistributionDateShiftInDays: 0,
  }
);

const campaignUsers = {
  gmail: {
    cut: 50,
    percentCut: 0.5,
  },
  test4: {
    cut: 20,
    percentCut: 0.20,
  },
  renata: {
    cut: 20,
    percentCut: 0.2,
  },
};

describe(
  'ETH, with bonus, with KYC, all tokens released in DD, manual incentive [Tokensale]',
  () => {
    const storage = new TestStorage(userIds.aydnep);

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
        cut: campaignUsers.gmail.cut,
      }
    );

    usersActions(
      {
        userKey: userIds.test4,
        secondaryUserKey: userIds.gmail,
        actions: [
          campaignUserActions.visit,
          campaignUserActions.joinAndConvert,
        ],
        cutChain: [
          campaignUsers.gmail.percentCut,
        ],
        campaignData,
        storage,
        contribution: conversionSize,
      }
    );

    usersActions(
      {
        userKey: userIds.renata,
        secondaryUserKey: userIds.gmail,
        actions: [
          campaignUserActions.visit,
          campaignUserActions.joinAndConvert,
          campaignUserActions.cancelConvert,
        ],
        campaignData,
        storage,
        contribution: conversionSize,
      }
    );

      usersActions(
        {
            userKey: storage.contractorKey,
            secondaryUserKey: userIds.test4,
            actions: [
                campaignUserActions.checkPendingConverters,
                campaignUserActions.approveConverter,
            ],
            campaignData,
            storage,
        }
      );

    usersActions(
      {
        userKey: userIds.test4,
        actions: [
          campaignUserActions.executeConversion,
          campaignUserActions.checkConversionPurchaseInfo,
        ],
        campaignData,
        storage,
      }
    );
  },
);