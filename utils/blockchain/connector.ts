import { InjectedConnector } from "@web3-react/injected-connector"

export const getInjectedConnector = (chainId: number) => {
  const supportedChainIds = [chainId]
  const connector = new InjectedConnector({ supportedChainIds })

  return connector
}