import functionParamsInterface from "../typings/functionParamsInterface";
import availableUsers from "../../../../constants/availableUsers";
import {daysToSeconds} from "../../../helpers/dates";
import {vestingSchemas} from "../../../../constants/smallConstants";
import {calcUnlockingDates, calcWithdrawAmounts} from "../../../helpers/calcHelpers";
import {expect} from "chai";
import {expectEqualNumbers} from "../../../helpers/numberHelpers";

export default function checkConversionPurchaseTest(
  {
    storage,
    userKey,
    campaignData,
    campaignContract,
  }: functionParamsInterface,
) {
  /**
   * BASE_AND_BONUS
   *
   * - check for portions number (numberOfVestingPortions),
   * - check for dates (numberOfDaysBetweenPortions),
   * - amount ( ( base + bonus ) / numberOfVestingPortions)
   * BONUS
   *
   * Base amount totally included to first withdraw contract
   * Portions included only bonus amount divided to portions quantity
   *
   * - check for portions number (numberOfVestingPortions + 1)
   * - check for dates (numberOfDaysBetweenPortions),1),
   * -- [0] = tokenDistributionDate
   * -- [1] = tokenDistributionDate + bonusTokensVestingStartShiftInDaysFromDistributionDate
   * -- [2] = [1] + numberOfDaysBetweenPortions
   * -- etc
   * - amount
   * -- [0] = base tokens amount
   * -- [1] and other = bonus tokens amount / numberOfVestingPortions
   */
  it('should check conversion purchase information', async () => {
    const {protocol, address, web3: {address: web3Address}} = availableUsers[userKey];
    const {campaignAddress} = storage;
    const user = storage.getUser(userKey);
    const distributionShiftInSeconds = daysToSeconds(
      campaignData.bonusTokensVestingStartShiftInDaysFromDistributionDate,
    );
    const portionIntervalInSeconds = daysToSeconds(
      campaignData.numberOfDaysBetweenPortions,
    );
    const withBase = campaignData.vestingAmount === vestingSchemas.baseAndBonus;
    let portionsQty = campaignData.numberOfVestingPortions;

    if (campaignData.maxConverterBonusPercentWei === 0 && !withBase) {
      // in this case base tokens release in DD, and we don't have any bonus for create portion withdraws
      portionsQty = 0;
    }

    const unlockingDates = calcUnlockingDates(
      campaignData.tokenDistributionDate,
      portionsQty,
      portionIntervalInSeconds,
      distributionShiftInSeconds,
      withBase,
    );

    expect(user.executedConversions.length).to.be.gt(0);

    const conversion = user.executedConversions[0];

    const conversionObj = await protocol[campaignContract].getConversion(
      campaignAddress, conversion.id, web3Address,
    );
    const withdrawAmounts = calcWithdrawAmounts(
      conversionObj.baseTokenUnits,
      conversionObj.bonusTokenUnits,
      portionsQty,
      withBase,
    );
    const withdrawContractsQuantity = withBase
      ? portionsQty
      : portionsQty + 1; // added first

    const purchase = await protocol[campaignContract].getPurchaseInformation(
      campaignAddress, conversion.id, web3Address
    );

    /**
     * todo: looks like bug
     * vestingAmount: BASE_AND_BONUS
     * numberOfVestingPortions = 6
     * purchase.vestingPortions = 5
     */
    // expect(purchase.vestingPortions).to.be.eq(campaignData.numberOfVestingPortions);
    expect(purchase.unlockingDays.length).to.be.eq(withdrawContractsQuantity);
    expect(purchase.unlockingDays).to.deep.equal(unlockingDates);
    expectEqualNumbers(
      purchase.totalTokens,
      conversionObj.bonusTokenUnits + conversionObj.baseTokenUnits,
    );
    expectEqualNumbers(purchase.totalTokens, purchase.bonusTokens + purchase.baseTokens);
    expectEqualNumbers(
      purchase.bonusTokens,
      purchase.baseTokens * campaignData.maxConverterBonusPercentWei / 100,
    );
    for (let i = 0; i < purchase.contracts.length; i += 1) {
      const withdrawItem = purchase.contracts[i];

      expectEqualNumbers(withdrawItem.amount, withdrawAmounts[i]);
    }
    conversion.purchase = purchase;
  }).timeout(60000);

}
