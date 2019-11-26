---
id: 2key_interfaces_ITwoKeyDonationCampaign
title: ITwoKeyDonationCampaign
---

<div class="contract-doc"><div class="contract"><h2 class="contract-header"><span class="contract-kind">contract</span> ITwoKeyDonationCampaign</h2><div class="source">Source: <a href="https://github.com/2keynet/web3-alpha/blob/v0.0.3/contracts/2key/interfaces/ITwoKeyDonationCampaign.sol" target="_blank">contracts/2key/interfaces/ITwoKeyDonationCampaign.sol</a></div></div><div class="index"><h2>Index</h2><ul><li><a href="2key_interfaces_ITwoKeyDonationCampaign.html#buyTokensAndDistributeReferrerRewards">buyTokensAndDistributeReferrerRewards</a></li><li><a href="2key_interfaces_ITwoKeyDonationCampaign.html#buyTokensForModeratorRewards">buyTokensForModeratorRewards</a></li><li><a href="2key_interfaces_ITwoKeyDonationCampaign.html#sendBackEthWhenConversionRejected">sendBackEthWhenConversionRejected</a></li><li><a href="2key_interfaces_ITwoKeyDonationCampaign.html#updateContractorProceeds">updateContractorProceeds</a></li><li><a href="2key_interfaces_ITwoKeyDonationCampaign.html#updateReferrerPlasmaBalance">updateReferrerPlasmaBalance</a></li></ul></div><div class="reference"><h2>Reference</h2><div class="functions"><h3>Functions</h3><ul><li><div class="item function"><span id="buyTokensAndDistributeReferrerRewards" class="anchor-marker"></span><h4 class="name">buyTokensAndDistributeReferrerRewards</h4><div class="body"><code class="signature"><span>abstract </span>function <strong>buyTokensAndDistributeReferrerRewards</strong><span>(uint256 _maxReferralRewardETHWei, address _converter, uint _conversionId) </span><span>public </span><span>returns  (uint) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_maxReferralRewardETHWei</code> - uint256</div><div><code>_converter</code> - address</div><div><code>_conversionId</code> - uint</div></dd><dt><span class="label-return">Returns:</span></dt><dd>uint</dd></dl></div></div></li><li><div class="item function"><span id="buyTokensForModeratorRewards" class="anchor-marker"></span><h4 class="name">buyTokensForModeratorRewards</h4><div class="body"><code class="signature"><span>abstract </span>function <strong>buyTokensForModeratorRewards</strong><span>(uint moderatorFee) </span><span>public </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>moderatorFee</code> - uint</div></dd></dl></div></div></li><li><div class="item function"><span id="sendBackEthWhenConversionRejected" class="anchor-marker"></span><h4 class="name">sendBackEthWhenConversionRejected</h4><div class="body"><code class="signature"><span>abstract </span>function <strong>sendBackEthWhenConversionRejected</strong><span>(address _rejectedConverter, uint _conversionAmount) </span><span>public </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_rejectedConverter</code> - address</div><div><code>_conversionAmount</code> - uint</div></dd></dl></div></div></li><li><div class="item function"><span id="updateContractorProceeds" class="anchor-marker"></span><h4 class="name">updateContractorProceeds</h4><div class="body"><code class="signature"><span>abstract </span>function <strong>updateContractorProceeds</strong><span>(uint value) </span><span>public </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>value</code> - uint</div></dd></dl></div></div></li><li><div class="item function"><span id="updateReferrerPlasmaBalance" class="anchor-marker"></span><h4 class="name">updateReferrerPlasmaBalance</h4><div class="body"><code class="signature"><span>abstract </span>function <strong>updateReferrerPlasmaBalance</strong><span>(address _influencer, uint _balance) </span><span>public </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_influencer</code> - address</div><div><code>_balance</code> - uint</div></dd></dl></div></div></li></ul></div></div></div>