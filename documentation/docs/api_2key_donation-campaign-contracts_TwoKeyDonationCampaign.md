---
id: 2key_donation-campaign-contracts_TwoKeyDonationCampaign
title: TwoKeyDonationCampaign
---

<div class="contract-doc"><div class="contract"><h2 class="contract-header"><span class="contract-kind">contract</span> TwoKeyDonationCampaign</h2><p class="base-contracts"><span>is</span> <a href="2key_upgradable-pattern-campaigns_UpgradeableCampaign.html">UpgradeableCampaign</a><span>, </span><a href="2key_campaign-mutual-contracts_TwoKeyCampaign.html">TwoKeyCampaign</a><span>, </span><a href="2key_campaign-mutual-contracts_TwoKeyCampaignIncentiveModels.html">TwoKeyCampaignIncentiveModels</a></p><div class="source">Source: <a href="https://github.com/2keynet/web3-alpha/blob/v0.0.3/contracts/2key/donation-campaign-contracts/TwoKeyDonationCampaign.sol" target="_blank">contracts/2key/donation-campaign-contracts/TwoKeyDonationCampaign.sol</a></div><div class="author">Author: Nikola Madjarevic Created at 2/19/19</div></div><div class="index"><h2>Index</h2><ul><li><a href="2key_donation-campaign-contracts_TwoKeyDonationCampaign.html#buyTokensAndDistributeReferrerRewards">buyTokensAndDistributeReferrerRewards</a></li><li><a href="2key_donation-campaign-contracts_TwoKeyDonationCampaign.html#buyTokensForModeratorRewards">buyTokensForModeratorRewards</a></li><li><a href="2key_donation-campaign-contracts_TwoKeyDonationCampaign.html#convert">convert</a></li><li><a href="2key_donation-campaign-contracts_TwoKeyDonationCampaign.html#getReferrerBalance">getReferrerBalance</a></li><li><a href="2key_donation-campaign-contracts_TwoKeyDonationCampaign.html#getReferrerCuts">getReferrerCuts</a></li><li><a href="2key_donation-campaign-contracts_TwoKeyDonationCampaign.html#getReservedAmount2keyForRewards">getReservedAmount2keyForRewards</a></li><li><a href="2key_donation-campaign-contracts_TwoKeyDonationCampaign.html#joinAndShareARC">joinAndShareARC</a></li><li><a href="2key_donation-campaign-contracts_TwoKeyDonationCampaign.html#onlyTwoKeyDonationConversionHandler">onlyTwoKeyDonationConversionHandler</a></li><li><a href="2key_donation-campaign-contracts_TwoKeyDonationCampaign.html#sendBackEthWhenConversionRejected">sendBackEthWhenConversionRejected</a></li><li><a href="2key_donation-campaign-contracts_TwoKeyDonationCampaign.html#setCut">setCut</a></li><li><a href="2key_donation-campaign-contracts_TwoKeyDonationCampaign.html#setCutOf">setCutOf</a></li><li><a href="2key_donation-campaign-contracts_TwoKeyDonationCampaign.html#setInitialParamsDonationCampaign">setInitialParamsDonationCampaign</a></li><li><a href="2key_donation-campaign-contracts_TwoKeyDonationCampaign.html#updateContractorProceeds">updateContractorProceeds</a></li><li><a href="2key_donation-campaign-contracts_TwoKeyDonationCampaign.html#withdrawContractor">withdrawContractor</a></li></ul></div><div class="reference"><h2>Reference</h2><div class="modifiers"><h3>Modifiers</h3><ul><li><div class="item modifier"><span id="onlyTwoKeyDonationConversionHandler" class="anchor-marker"></span><h4 class="name">onlyTwoKeyDonationConversionHandler</h4><div class="body"><code class="signature">modifier <strong>onlyTwoKeyDonationConversionHandler</strong><span>() </span></code><hr/></div></div></li></ul></div><div class="functions"><h3>Functions</h3><ul><li><div class="item function"><span id="buyTokensAndDistributeReferrerRewards" class="anchor-marker"></span><h4 class="name">buyTokensAndDistributeReferrerRewards</h4><div class="body"><code class="signature">function <strong>buyTokensAndDistributeReferrerRewards</strong><span>(uint256 _maxReferralRewardETHWei, address _converter, uint _conversionId) </span><span>public </span><span>returns  (uint) </span></code><hr/><div class="description"><p>Function to delegate call to logic handler and update data, and buy tokens.</p></div><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_maxReferralRewardETHWei</code> - total reward in ether wei</div><div><code>_converter</code> - is the converter address</div><div><code>_conversionId</code> - is the ID of conversion</div></dd><dt><span class="label-return">Returns:</span></dt><dd>uint</dd></dl></div></div></li><li><div class="item function"><span id="buyTokensForModeratorRewards" class="anchor-marker"></span><h4 class="name">buyTokensForModeratorRewards</h4><div class="body"><code class="signature">function <strong>buyTokensForModeratorRewards</strong><span>(uint moderatorFee) </span><span>public </span></code><hr/><div class="description"><p>Function which will buy tokens from upgradable exchange for moderator.</p></div><dl><dt><span class="label-modifiers">Modifiers:</span></dt><dd><a href="2key_donation-campaign-contracts_TwoKeyDonationCampaign.html#onlyTwoKeyDonationConversionHandler">onlyTwoKeyDonationConversionHandler </a></dd><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>moderatorFee</code> - is the fee in tokens moderator earned</div></dd></dl></div></div></li><li><div class="item function"><span id="convert" class="anchor-marker"></span><h4 class="name">convert</h4><div class="body"><code class="signature">function <strong>convert</strong><span>(bytes signature) </span><span>public </span><span>payable </span></code><hr/><div class="description"><p>Payable function, Function where converter can convert.</p></div><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>signature</code> - bytes</div></dd></dl></div></div></li><li><div class="item function"><span id="getReferrerBalance" class="anchor-marker"></span><h4 class="name">getReferrerBalance</h4><div class="body"><code class="signature">function <strong>getReferrerBalance</strong><span>(address _referrer) </span><span>public </span><span>view </span><span>returns  (uint) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_referrer</code> - we want to check earnings for</div></dd><dt><span class="label-return">Returns:</span></dt><dd>uint</dd></dl></div></div></li><li><div class="item function"><span id="getReferrerCuts" class="anchor-marker"></span><h4 class="name">getReferrerCuts</h4><div class="body"><code class="signature">function <strong>getReferrerCuts</strong><span>(address last_influencer) </span><span>public </span><span>view </span><span>returns  (uint256[]) </span></code><hr/><div class="description"><p>Function which acts like getter for all cuts in array.</p></div><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>last_influencer</code> - is the last influencer</div></dd><dt><span class="label-return">Returns:</span></dt><dd>array of integers containing cuts respectively</dd></dl></div></div></li><li><div class="item function"><span id="getReservedAmount2keyForRewards" class="anchor-marker"></span><h4 class="name">getReservedAmount2keyForRewards</h4><div class="body"><code class="signature">function <strong>getReservedAmount2keyForRewards</strong><span>() </span><span>public </span><span>view </span><span>returns  (uint) </span></code><hr/><div class="description"><p>Function to get reserved amount of rewards.</p></div><dl><dt><span class="label-return">Returns:</span></dt><dd>uint</dd></dl></div></div></li><li><div class="item function"><span id="joinAndShareARC" class="anchor-marker"></span><h4 class="name">joinAndShareARC</h4><div class="body"><code class="signature">function <strong>joinAndShareARC</strong><span>(bytes signature, address receiver) </span><span>public </span></code><hr/><div class="description"><p>Function to join with signature and share 1 arc to the receiver.</p></div><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>signature</code> - is the signature</div><div><code>receiver</code> - is the address we&#x27;re sending ARCs to</div></dd></dl></div></div></li><li><div class="item function"><span id="sendBackEthWhenConversionRejected" class="anchor-marker"></span><h4 class="name">sendBackEthWhenConversionRejected</h4><div class="body"><code class="signature">function <strong>sendBackEthWhenConversionRejected</strong><span>(address _rejectedConverter, uint _conversionAmount) </span><span>public </span></code><hr/><div class="description"><p>This function can be called only by conversion handler, Function to send ether back to converter if his conversion is cancelled.</p></div><dl><dt><span class="label-modifiers">Modifiers:</span></dt><dd><a href="2key_donation-campaign-contracts_TwoKeyDonationCampaign.html#onlyTwoKeyDonationConversionHandler">onlyTwoKeyDonationConversionHandler </a></dd><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_rejectedConverter</code> - is the address of cancelled converter</div><div><code>_conversionAmount</code> - is the amount he sent to the contract</div></dd></dl></div></div></li><li><div class="item function"><span id="setCut" class="anchor-marker"></span><h4 class="name">setCut</h4><div class="body"><code class="signature">function <strong>setCut</strong><span>(uint256 cut) </span><span>public </span></code><hr/><div class="description"><p>Executes internal setCutOf method, Function to set cut.</p></div><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>cut</code> - is the cut value</div></dd></dl></div></div></li><li><div class="item function"><span id="setCutOf" class="anchor-marker"></span><h4 class="name">setCutOf</h4><div class="body"><code class="signature">function <strong>setCutOf</strong><span>(address me, uint256 cut) </span><span>internal </span></code><hr/><div class="description"><p>Function to set cut of.</p></div><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>me</code> - is the address (ethereum)</div><div><code>cut</code> - is the cut value</div></dd></dl></div></div></li><li><div class="item function"><span id="setInitialParamsDonationCampaign" class="anchor-marker"></span><h4 class="name">setInitialParamsDonationCampaign</h4><div class="body"><code class="signature">function <strong>setInitialParamsDonationCampaign</strong><span>(address _contractor, address _moderator, address _twoKeySingletonRegistry, address _twoKeyDonationConversionHandler, address _twoKeyDonationLogicHandler, uint[] numberValues, bool[] booleanValues) </span><span>public </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_contractor</code> - address</div><div><code>_moderator</code> - address</div><div><code>_twoKeySingletonRegistry</code> - address</div><div><code>_twoKeyDonationConversionHandler</code> - address</div><div><code>_twoKeyDonationLogicHandler</code> - address</div><div><code>numberValues</code> - uint[]</div><div><code>booleanValues</code> - bool[]</div></dd></dl></div></div></li><li><div class="item function"><span id="updateContractorProceeds" class="anchor-marker"></span><h4 class="name">updateContractorProceeds</h4><div class="body"><code class="signature">function <strong>updateContractorProceeds</strong><span>(uint value) </span><span>public </span></code><hr/><div class="description"><p>Can be called only from TwoKeyConversionHandler contract, Option to update contractor proceeds.</p></div><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>value</code> - it the value we&#x27;d like to add to total contractor proceeds and contractor balance</div></dd></dl></div></div></li><li><div class="item function"><span id="withdrawContractor" class="anchor-marker"></span><h4 class="name">withdrawContractor</h4><div class="body"><code class="signature">function <strong>withdrawContractor</strong><span>() </span><span>public </span></code><hr/><div class="description"><p>Contractor can withdraw funds only if criteria is satisfied.</p></div><dl><dt><span class="label-modifiers">Modifiers:</span></dt><dd><a href="2key_campaign-mutual-contracts_TwoKeyCampaign.html#onlyContractor">onlyContractor </a></dd></dl></div></div></li></ul></div></div></div>