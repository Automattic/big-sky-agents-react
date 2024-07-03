import { useEffect } from 'react';
/**
 * Internal dependencies
 */
import {
	AgentUI,
	ChatHistory,
	PopUpControls,
	useAgentExecutor,
	useAgents,
	useAgentToolkit,
	useChatSettings,
	useSiteToolkit,
} from '@automattic/big-sky-agents';

const DemoSiteSpecAgent = ({ apiKey }) => {
	useChatSettings({
		apiKey,
		feature: 'big-sky',
	});
	useAgentToolkit();
	useSiteToolkit({});
	useAgentExecutor();
	const { setActiveAgent } = useAgents();
	// set the initial agent
	useEffect(() => {
		setActiveAgent('WPSiteSpec');
	}, [setActiveAgent]);

	return (
		<>
			<AgentUI />
			<PopUpControls />
			<ChatHistory />
		</>
	);
};

export default DemoSiteSpecAgent;
