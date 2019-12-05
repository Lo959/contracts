---
id: 2key_token-pools_TokenPool
title: TokenPool
---

<div class="contract-doc"><div class="contract"><h2 class="contract-header"><span class="contract-kind">contract</span> TokenPool</h2><p class="base-contracts"><span>is</span> <a href="2key_upgradability_Upgradeable.html">Upgradeable</a><span>, </span><a href="2key_singleton-contracts_ITwoKeySingletonUtils.html">ITwoKeySingletonUtils</a></p><div class="source">Source: <a href="https://github.com/2keynet/web3-alpha/blob/v0.0.3/contracts/2key/token-pools/TokenPool.sol" target="_blank">contracts/2key/token-pools/TokenPool.sol</a></div><div class="author">Author: Nikola Madjarevic Created at 2/5/19</div></div><div class="index"><h2>Index</h2><ul><li><a href="2key_token-pools_TokenPool.html#getContractBalance">getContractBalance</a></li><li><a href="2key_token-pools_TokenPool.html#onlyMaintainer">onlyMaintainer</a></li><li><a href="2key_token-pools_TokenPool.html#onlyTwoKeyAdmin">onlyTwoKeyAdmin</a></li><li><a href="2key_token-pools_TokenPool.html#setInitialParameters">setInitialParameters</a></li><li><a href="2key_token-pools_TokenPool.html#transferTokens">transferTokens</a></li></ul></div><div class="reference"><h2>Reference</h2><div class="modifiers"><h3>Modifiers</h3><ul><li><div class="item modifier"><span id="onlyMaintainer" class="anchor-marker"></span><h4 class="name">onlyMaintainer</h4><div class="body"><code class="signature">modifier <strong>onlyMaintainer</strong><span>() </span></code><hr/></div></div></li><li><div class="item modifier"><span id="onlyTwoKeyAdmin" class="anchor-marker"></span><h4 class="name">onlyTwoKeyAdmin</h4><div class="body"><code class="signature">modifier <strong>onlyTwoKeyAdmin</strong><span>() </span></code><hr/></div></div></li></ul></div><div class="functions"><h3>Functions</h3><ul><li><div class="item function"><span id="getContractBalance" class="anchor-marker"></span><h4 class="name">getContractBalance</h4><div class="body"><code class="signature">function <strong>getContractBalance</strong><span>() </span><span>public </span><span>view </span><span>returns  (uint) </span></code><hr/><div class="description"><p>Function to retrieve the balance of tokens on the contract.</p></div><dl><dt><span class="label-return">Returns:</span></dt><dd>uint</dd></dl></div></div></li><li><div class="item function"><span id="setInitialParameters" class="anchor-marker"></span><h4 class="name">setInitialParameters</h4><div class="body"><code class="signature">function <strong>setInitialParameters</strong><span>(address _erc20address, address _twoKeySingletonesRegistry) </span><span>internal </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_erc20address</code> - address</div><div><code>_twoKeySingletonesRegistry</code> - address</div></dd></dl></div></div></li><li><div class="item function"><span id="transferTokens" class="anchor-marker"></span><h4 class="name">transferTokens</h4><div class="body"><code class="signature">function <strong>transferTokens</strong><span>(address receiver, uint amount) </span><span>internal </span></code><hr/><div class="description"><p>Function to transfer tokens.</p></div><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>receiver</code> - address</div><div><code>amount</code> - uint</div></dd></dl></div></div></li></ul></div></div></div>