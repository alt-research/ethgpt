---
title: Granda Mento
description: Introduction to Granda Mento (CIP 38), its design, and how to manage exchange proposals.
---

# Granda Mento

Introduction to Granda Mento (CIP 38), its design, and how to manage exchange proposals.

---

## What is Granda Mento?

Granda Mento, described in [CIP 38](https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0038.md), is a mechanism for exchanging large amounts of CELO for Celo stable tokens that aren't suitable for [Mento](doto) or over-the-counter (OTC).

Mento has proven effective at maintaining the stability of Celo's stable tokens, but the intentionally limited liquidity of its constant-product market maker results in meaningful slippage when exchanging tens of thousands of tokens at a time. Slippage is the price movement experienced by a trade. Generally speaking, larger volume trades will incur more slippage and execute at a less favorable price for the trader.

Similar to Mento, exchanges through Granda Mento are effectively made against the reserve. Purchased stable tokens are created into existence ("minted"), and sold stable tokens are destroyed ("burned"). Purchased CELO is taken from the reserve, and sold CELO is given to the reserve. For example, a sale of 50,000 CELO in exchange for 100,000 cUSD would involve the 50,000 CELO being transferred to the reserve and the 100,000 cUSD being created and given to the exchanger.

At the time of writing, exchanging about 50,000 cUSD via Mento results in a slippage of about 2%. Without Granda Mento, all launched Celo stable tokens can only be minted and burned using Mento, with the exception of cUSD that is minted as validator rewards each epoch. Granda Mento was created to enable institutional-grade liquidity to mint or burn millions of stable tokens at a time.

The mainnet Granda Mento contract address is `0x03f6842B82DD2C9276931A17dd23D73C16454a49` ([link](https://explorer.celo.org/address/0x03f6842B82DD2C9276931A17dd23D73C16454a49)), was introduced in [Contract Release 5](https://github.com/celo-org/governance/blob/main/CGPs/cgp-0037.md), and activated in [CGP 31](https://github.com/celo-org/governance/blob/main/CGPs/cgp-0031.md).

## How it works

A Granda Mento exchange requires rough consensus from the Celo community and, unlike the instant and atomic Mento exchanges, involves the exchanger locking their funds to be sold for multiple days before they are exchanged.

### Design

At a high level, the life of an exchange is:

1. Exchanger creates an "exchange proposal" on-chain that locks their funds to be sold and calculates the amount of the asset being purchased according the current oracle price and a configurable spread.
2. If rough consensus from the community is achieved, a multi-sig (the "approver") that has been set by Governance approves the exchange proposal on-chain.
3. To reduce trust in the approver multi-sig, a veto period takes place where any community member can create a governance proposal to "veto" an approved exchange proposal.
4. After the veto period has elapsed, the exchange is executable by any account. The exchange occurs with the price locked in at stage (1).

### Processes

Processes surrounding Granda Mento exchanges, like how to achieve rough consensus from the community, are outlined in [CIP 46](https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0046.md). At the minimum, it takes about 7 days to achieve rough consensus.

The approver multi-sig that is ultimately responsible for approving an exchange proposal that has achieved rough consensus from the community is `0xf10011424A0F35B8411e9abcF120eCF067E4CF27` ([link](https://explorer.celo.org/address/0xf10011424A0F35B8411e9abcF120eCF067E4CF27/transactions)) and has the following signers:

| **Name**        | **Affiliation**                       | **Discord Handle**        | **Address**                                  |
| --------------- | ------------------------------------- | ------------------------- | -------------------------------------------- |
| Andrew Shen     | [Bi23 Labs](https://bi23.com/)        | `Shen \| Bi23 Labs #6675` | `0xBecc041a5090cD08AbD3940ab338d4CC94d2Ed3c` |
| Pinotio         | [Pinotio](https://pinotio.com/)       | `Pinotio.com #5357`       | `0x802FE32083fD341D8e9A35E3a351291d948a83E6` |
| Serge Kiema     | [DuniaPay](https://www.duniapay.net/) | `serge_duniapay #5152`    | `0xdcac99458a3c5957d8ae7b92e4bafc88a32b80e4` |
| Will Kraft      | Celo Governance Working Group         | `Will Kraft #2508`        | `0x169E992b3c4BE08c42582DAb1DCFb2549d9C23E1` |
| Zviad Metreveli | [WOTrust](https://wotrust.us/)        | `zm #1073`                | `0xE267D978037B89db06C6a5FcF82fAd8297E290ff` |
| human           | [OpenCelo](https://www.opencelo.org/) | `human #6811`             | `0x91f2437f5C8e7A3879e14a75a7C5b4CccC76023a` |
| Deepak Nuli     | [Kresko](https://www.kresko.fi/)      | `Deepak \| Kresko#3647`   | `0x099f3F5527671594351E30B48ca822cc90778a11` |

### Create an exchange proposal

Refer to [CIP 46](https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0046.md) for information surrounding processes.

The easiest way create an exchange proposal on-chain is using the `celocli grandamento:propose` command ([docs](/cli/grandamento#celocli-grandamento-propose)). For example:

```
celocli grandamento:propose --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --sellCelo=true --stableToken=cUSD --value=20000000000000000000000
```

### View exchange proposals

Exchange proposal information, including the tokens and quantities being sold and bought, can be easily viewed using celocli.

To list all exchange proposals that have been proposed and are not yet cancelled, vetoed, or executed, use the `celocli grandamento:list` command ([docs](/cli/grandamento#celocli-grandamentolist)). For example:

```
celocli grandamento:list
```

To show a specific exchange proposal regardless of it being proposed, cancelled, vetoed, or executed, use the `celocli grandamento:show` command ([docs](/cli/grandamento#celocli-grandamentoshow)). For example:

```
celocli grandamento:show --proposalID 1
```

### Cancel an exchange proposal

The exchanger of an exchange proposal can cancel the exchange proposal if the proposal has not yet been approved. This can be done using the `celocli grandamento:cancel` command ([docs](/cli/grandamento#celocli-grandamentocancel)). For example:

```
celocli grandamento:cancel --proposalID 1
```

If an exchange proposal has already been approved or someone other than the exchanger wishes to cancel (or "veto") an exchange proposal, this must be done by a governance proposal. [CIP 46](https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0046.md#vetoing-an-exchange-proposal) provides information on the exact details of the governance proposal.

### Execute an exchange proposal

Anyone is able to execute an exchange proposal that has been approved as long as the veto period has elapsed since the time of approval. This can be done using the `celocli grandamento:execute` command ([docs](/cli/grandamento#celocli-grandamentoexecute)). For example:

```
celocli grandamento:execute --proposalID 1
```

### View the buy amount for a hypothetical exchange proposal

The amount of the token being bought in an exchange proposal is calculated when the exchange proposal is created according to the current oracle price and the spread. To view the amount of the token being bought that a hypothetical exchange proposal would receive for a provided amount of the token sold, `celocli grandamento:get-buy-amount` can be used ([docs](/cli/grandamento#celocli-grandamentoget-buy-amount)). For example:

```
celocli grandamento:get-buy-amount --stableToken cUSD --sellCelo true --value 20000000000000000000000
```

### View current Granda Mento parameters

Granda Mento's governable parameters can be viewed using the `celocli network:parameters` command ([docs](/cli/network#celocli-networkparameters)). For example:

```
celocli network:parameters
```
