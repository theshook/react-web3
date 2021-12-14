import { useWeb3React } from "@web3-react/core";
import { Col, Divider, Row } from "antd";
import React from "react";

const WalletDetails = () => {
	const { account, library, chainId } = useWeb3React();

	const [balance, setBalance] = React.useState();
	const [wallet, setWallet] = React.useState<string | undefined>();
	const [chain, setChain] = React.useState<number | undefined>();
	React.useEffect((): any => {
		(async () => {
			if (!!account && !!library) {
				let stale = false;
				try {
					if (!stale) {
						setBalance(
							library.utils.fromWei(await library.eth.getBalance(account))
						);
						const address = `${account.substring(0, 4)}...${account.substring(
							account.length - 4
						)}`;
						setWallet(address);
						setChain(chainId)
					}
				} catch (err) {
					if (!stale) {
						setBalance(undefined);
						setWallet(undefined);
						setChain(undefined)
					}
				} finally {
					return () => {
						stale = true;
						setBalance(undefined);
						setWallet(undefined);
						setChain(undefined)
					};
				}
			}
		})();
	}, [account, library, chainId]);

	return (
		<Row>
			<Col span={8}>
				<span>Account</span>
			</Col>
			<Col span={8} offset={8} style={{ textAlign: "right" }}>
				<span>{wallet}</span>
			</Col>
			<Divider />
			<Col span={8}>
				<span>Balance</span>
			</Col>
			<Col span={8} offset={8} style={{ textAlign: "right" }}>
				<span>
					{balance === null ? "Error" : balance ? ` Ξ ${balance}` : ""}
				</span>
			</Col>
			<Divider />
			<Col span={8}>
				<span>ChainId</span>
			</Col>
			<Col span={8} offset={8} style={{ textAlign: "right" }}>
				<span>{chain}</span>
			</Col>
		</Row>
	);
};

export default WalletDetails;
