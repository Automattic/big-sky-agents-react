import {
	AgentUI,
	useAgentStarter,
	useChat,
	useChatExecutor,
	useCurrentAgent,
	useReduxToolkit,
	useToolExecutor,
} from '@automattic/big-sky-agents';
import { useEffect } from 'react';
import SkyAgent from '../agents/sky-agent';

export default function AgentsDemo() {
	const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
	const chat = useChat();
	const toolkit = useReduxToolkit({
		apiKey,
	});
	useEffect(() => {
		if (chat.apiKey !== apiKey) {
			chat.setApiKey(apiKey);
		}
	}, [apiKey, chat, toolkit]);

	const agent = useCurrentAgent({
		toolkit,
		chat,
		newAgent: SkyAgent,
	});

	// run the agent
	useChatExecutor({
		chat,
		agent,
		toolkit,
	});

	useToolExecutor({
		chat,
		toolkit,
	});

	useAgentStarter({
		agent,
		chat,
	});

	return <AgentUI toolkit={toolkit} agent={agent} chat={chat} />;
}
