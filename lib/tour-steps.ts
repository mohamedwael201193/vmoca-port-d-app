export const dashboardTourSteps = [
  {
    target: '[data-tour="moca-id"]',
    title: "Your Moca ID",
    content:
      "This is your unique decentralized identifier on the Moca Network. Share this with others to verify your identity.",
    position: "bottom" as const,
  },
  {
    target: '[data-tour="wallet-connection"]',
    title: "Wallet Connection",
    content:
      "Connect your wallet to enable on-chain credential verification and smart contract interactions with the Moca AIR Kit.",
    position: "left" as const,
  },
  {
    target: '[data-tour="reputation-gauge"]',
    title: "Reputation Score",
    content:
      "Your reputation score is calculated based on verified credentials. Higher scores unlock more opportunities.",
    position: "left" as const,
  },
  {
    target: '[data-tour="credentials-grid"]',
    title: "Your Credentials",
    content: 'These are your verified "stamps" - digital credentials that prove your identity and achievements.',
    position: "top" as const,
  },
  {
    target: '[data-tour="add-stamp-button"]',
    title: "Add New Stamps",
    content: "Click here to browse and claim new credentials to boost your reputation score.",
    position: "top" as const,
  },
]
