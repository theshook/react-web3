import { Button } from "antd";

interface IButton {
	type?:
		| "link"
		| "text"
		| "ghost"
		| "default"
		| "primary"
		| "dashed"
		| undefined;
	children: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLInputElement>;
	danger?: boolean
	block?: boolean
}

export default function NButton({ type, children, onClick, danger, block }: IButton) {
	return (
		<Button type={type} danger={danger} block={block} onClick={onClick}>
			{children}
		</Button>
	);
}
