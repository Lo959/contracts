import functionParamsInterface from "../typings/functionParamsInterface";
import availableUsers from "../../../../constants/availableUsers";
import cpcOnly from "../checks/cpcOnly";
import {promisify} from "../../../../../src/utils/promisify";
import {expect} from "chai";

export default function mainChainBalancesSyncTest(
  {
    storage,
    userKey,
  }: functionParamsInterface,
) {
  cpcOnly(storage.campaignType);

  it(`should end campaign, reserve tokens, and rebalance rates as well`, async () => {
      //This is the test where maintainer ends campaign, does rates rebalancing, etc.
      const {protocol, web3: {address}} = availableUsers[userKey];
      const {campaignAddress, campaign} = storage;

      let earnings = await protocol.CPCCampaign.getTotalReferrerRewardsAndTotalModeratorEarnings(campaignAddress);


      let txHash = await promisify(protocol.twoKeyBudgetCampaignsPaymentsHandler.endCampaignReserveTokensAndRebalanceRates, [
          campaignAddress,
          protocol.Utils.toWei(earnings.totalAmountForReferrerRewards, 'ether').toString(),
          protocol.Utils.toWei(earnings.totalModeratorEarnings, 'ether').toString(),
          {from: address, gas: 7900000}
      ]);

      await new Promise(resolve => setTimeout(resolve, 2000));

      let info = await protocol.CPCCampaign.getCampaignPublicInfo(campaignAddress);

      let contractorLeftover: number = info.initialBounty / info.rebalancingRatio - info.moderatorEarnings - earnings.totalAmountForReferrerRewards;

      expect(earnings.totalModeratorEarnings.toFixed(5)).to.be.equal((info.moderatorEarnings / info.rebalancingRatio).toFixed(5));
      expect(info.isLeftoverWithdrawn).to.be.equal(false);
      expect(info.contractorLeftover.toFixed(5)).to.be.equal(contractorLeftover.toFixed(5));
  }).timeout(60000);

  it('should mark campaign as done and assign to active influencers', async() => {
      const {protocol, web3:{address}} = availableUsers[userKey];
      const {campaignAddress, campaign} = storage;

      let numberOfActiveInfluencers = await protocol.CPCCampaign.getNumberOfActiveInfluencers(campaignAddress);
      let campaignInstance = await protocol.CPCCampaign._getPlasmaCampaignInstance(campaignAddress);
      let influencers = await promisify(campaignInstance.getActiveInfluencers,[0,numberOfActiveInfluencers]);

      let referrerPendingCampaigns = await promisify(protocol.twoKeyPlasmaBudgetCampaignsPaymentsHandler.getCampaignsReferrerHasPendingBalances,[influencers[0]]);

        let txHash = await promisify(protocol.twoKeyPlasmaBudgetCampaignsPaymentsHandler.markCampaignAsDoneAndAssignToActiveInfluencers,[
          campaignAddress,
          0,
          numberOfActiveInfluencers,
          {
              from: protocol.plasmaAddress,
              gas: 7800000
          }
        ]);

      await new Promise(resolve => setTimeout(resolve, 2000));

      let referrerPendingCampaignsAfter = await promisify(protocol.twoKeyPlasmaBudgetCampaignsPaymentsHandler.getCampaignsReferrerHasPendingBalances,[influencers[0]]);
      expect(referrerPendingCampaigns.length).to.be.equal(referrerPendingCampaignsAfter.length - 1);
      expect(referrerPendingCampaignsAfter[referrerPendingCampaignsAfter.length-1]).to.be.equal(campaignAddress);

  }).timeout(60000);
}
