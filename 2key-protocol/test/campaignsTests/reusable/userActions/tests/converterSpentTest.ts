import {expect} from "chai";
import functionParamsInterface from "../typings/functionParamsInterface";
import donationOnly from "../checks/donationOnly";
import availableUsers from "../../../../constants/availableUsers";

// todo: possible to user correctly only after correct storage implementation

export default function converterSpentTest(
  {
    storage,
    userKey,
  }: functionParamsInterface,
) {
  donationOnly(storage.campaignType);

  it('should get how much user have spent', async () => {
    const {protocol, address} = availableUsers[userKey];
    const {campaignAddress} = storage;

    const userSpent = 0;

    let amountSpent = await protocol.DonationCampaign.getAmountConverterSpent(campaignAddress, address);
    expect(amountSpent).to.be.equal(userSpent);
  }).timeout(60000);
}
