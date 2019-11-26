---
id: 2key_interfaces_ITwoKeyRegistry
title: ITwoKeyRegistry
---

<div class="contract-doc"><div class="contract"><h2 class="contract-header"><span class="contract-kind">contract</span> ITwoKeyRegistry</h2><div class="source">Source: <a href="https://github.com/2keynet/web3-alpha/blob/v0.0.3/contracts/2key/interfaces/ITwoKeyRegistry.sol" target="_blank">contracts/2key/interfaces/ITwoKeyRegistry.sol</a></div></div><div class="index"><h2>Index</h2><ul><li><a href="2key_interfaces_ITwoKeyRegistry.html#checkIfUserExists">checkIfUserExists</a></li><li><a href="2key_interfaces_ITwoKeyRegistry.html#getUserData">getUserData</a></li></ul></div><div class="reference"><h2>Reference</h2><div class="functions"><h3>Functions</h3><ul><li><div class="item function"><span id="checkIfUserExists" class="anchor-marker"></span><h4 class="name">checkIfUserExists</h4><div class="body"><code class="signature"><span>abstract </span>function <strong>checkIfUserExists</strong><span>(address _userAddress) </span><span>public </span><span>view </span><span>returns  (bool) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_userAddress</code> - address</div></dd><dt><span class="label-return">Returns:</span></dt><dd>bool</dd></dl></div></div></li><li><div class="item function"><span id="getUserData" class="anchor-marker"></span><h4 class="name">getUserData</h4><div class="body"><code class="signature"><span>abstract </span>function <strong>getUserData</strong><span>(address _user) </span><span>public </span><span>view </span><span>returns  (bytes32, bytes32, bytes32) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_user</code> - address</div></dd><dt><span class="label-return">Returns:</span></dt><dd>bytes32</dd><dd>bytes32</dd><dd>bytes32</dd></dl></div></div></li></ul></div></div></div>