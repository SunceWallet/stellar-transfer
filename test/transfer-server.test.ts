import { Networks } from "@stellar/stellar-sdk";
import { test } from "uvu";
import * as assert from "uvu/assert";
import { openTransferServer } from "../src/index";

test("can initialize a TransferServer", async () => {
	const transferServer = await openTransferServer(
		"sandbox.anchorusd.com",
		Networks.TESTNET,
	);

	assert.equal(
		transferServer.assets.map((asset) => asset.code),
		["USD"],
	);

	const response = await transferServer.get("/info");
	assert.equal(Object.keys(response.data.withdraw), ["USD"]);
});

test.run();
