import { test } from "uvu"
import * as assert from "uvu/assert"
import { Keypair, Networks } from "stellar-sdk"
import {
  fetchTransferInfos,
  openTransferServer,
  KYCResponseType,
  TransferResultType,
  Withdrawal
} from "../src/index"

test("interactive withdrawal works", async () => {
  const keypair = Keypair.random()

  const transferServer = await openTransferServer(
    "sandbox.anchorusd.com",
    Networks.TESTNET
  )
  const infos = await fetchTransferInfos(transferServer)
  const asset = infos.withdrawableAssets.find(asset => asset.code === "USD")!

  const withdrawal = Withdrawal(transferServer, asset, {
    account: keypair.publicKey(),
    email_address: "test-withdrawal@solarwallet.io"
  })
  const instructions = await withdrawal.interactive()

  assert.is(instructions.type, TransferResultType.kyc)
  assert.is((instructions as any).subtype, KYCResponseType.interactive)
  assert.is((instructions as any).data.type, "interactive_customer_info_needed")
})

test.run()
