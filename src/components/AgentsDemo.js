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

export default function AgentsDemo() {
	const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
	const chat = useChat();
	useEffect(() => {
		if (chat.apiKey !== apiKey) {
			chat.setApiKey(apiKey);
		}
	}, [apiKey, chat]);
	const toolkit = useReduxToolkit({
		apiKey,
	});

	const agent = useCurrentAgent({
		toolkit,
		chat,
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
