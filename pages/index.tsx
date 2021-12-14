import { useWeb3React } from "@web3-react/core";
import { Card, Col, Divider, InputNumber, Modal, Row, Typography } from "antd";
import React, { useState } from "react";
import NButton from "../components/NButton";
import WalletDetails from "../components/WalletDetails";
import { getInjectedConnector } from "../utils/blockchain/connector";
import { BINANCE_ID } from "../utils/constants";

const NEP_BUSD_PAIR = {
	main: "NEP",
	to: "BUSD",
	value: 3,
};

const BUSD_NEP_PAIR = {
	main: "BUSD",
	to: "NEP",
	value: 3,
};

const Home: React.FC = () => {
	const { active, activate, deactivate } = useWeb3React();

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [pair, setPair] = useState(NEP_BUSD_PAIR);
	const [value, setValue] = useState(1);
	const [eq, setEq] = useState(0);

	React.useEffect(() => {
		setEq(value * pair.value);
	}, []);

	const convert = (value: number) => {
		setValue(value);
		let newValue = 0;

		if (pair.main === "NEP") newValue = value * pair.value;
		else newValue = value / pair.value;

		setEq(Math.round(newValue * 100) / 100);
	};

	const switchValue = () => {
		if (pair.main === "NEP") {
			setPair(BUSD_NEP_PAIR);
		} else {
			setPair(NEP_BUSD_PAIR);
		}
		const tempeq = eq;
		setEq(value);
		setValue(tempeq);
	};

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const connect = async () => {
		try {
			await activate(getInjectedConnector(BINANCE_ID));
		} catch (err) {
			console.log(err);
		}
	};

	const disconnect = () => {
		try {
			deactivate();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<Row style={{ marginTop: "20px" }}>
				<Col span={12} offset={6}>
					<Card style={{ width: "inherit" }}>
						<Row>
							<Col span={24} style={{ textAlign: "center" }}>
								<Typography.Title level={3}>Crypto Converter</Typography.Title>
							</Col>
							<Col span={24}>
								<span>{pair.main}</span>
								<InputNumber
									min={0}
									defaultValue={1}
									style={{ width: "100%" }}
									value={value}
									onChange={convert}
								/>
							</Col>
							<Col
								span={12}
								offset={6}
								style={{
									paddingTop: "15px",
									paddingBottom: "15px",
									textAlign: "center",
								}}
							>
								<span style={{ cursor: "pointer" }} onClick={switchValue}>
									🔄
								</span>
							</Col>
							<Col span={24}>
								<span>{pair.to}</span>
								<InputNumber
									min={0}
									style={{ width: "100%" }}
									value={eq}
									readOnly
								/>
							</Col>
						</Row>
						<Row>
							<Col span={12} offset={8} style={{ paddingTop: "10px" }}>
								<NButton type="primary" onClick={showModal}>
									Check Wallet Details
								</NButton>
							</Col>
						</Row>
						<Modal
							title="Wallet Details"
							visible={isModalVisible}
							footer={null}
						>
							{active ? (
								<WalletDetails />
							) : (
								`Wallet not connected. Please click the "Connect Now" button below`
							)}
							<Divider />
							<Row justify="space-between">
								{active ? (
									<>
										<Col span={12} offset={6}>
											<NButton type="primary" danger block onClick={disconnect}>
												Disconnect
											</NButton>
										</Col>
									</>
								) : (
									<>
										<Col span={12}>
											<NButton type="primary" onClick={connect}>
												Connect
											</NButton>
										</Col>
										<Col span={12} style={{ textAlign: "right" }}>
											<NButton onClick={handleCancel}>Cancel</NButton>
										</Col>
									</>
								)}
							</Row>
						</Modal>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default Home;
