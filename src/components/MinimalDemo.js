/**
 * External dependencies
 */
import {
	ChatHistory,
	MessageContent,
	PopUpControls,
	useAgent,
	useAgentExecutor,
	useAgents,
	useChat,
	UserMessageInput,
} from '@automattic/big-sky-agents';
import { useEffect } from 'react';
/**
 * Internal dependencies
 */
import withDemoChat from './withDemoChat';

const MinimalDemoUI = () => {
	const { setActiveAgent, activeAgent, setAgentStarted } = useAgents();
	useAgent(MinimalAgent);
	useAgentExecutor();
	useEffect(() => {
		if (activeAgent?.id !== MinimalAgent.id) {
			setAgentStarted(false);
			setActiveAgent(MinimalAgent.id);
		}
	});
	const { assistantMessage } = useChat();

	return (
		<>
			{assistantMessage && (
				<>
					<MessageContent content={assistantMessage} />
					<UserMessageInput />
				</>
			)}
			<PopUpControls />
			<ChatHistory />
		</>
	);
};

const MinimalAgent = {
	id: 'tiny',
	name: 'Conversation Bot',
	instructions:
		'Will talk about anything but always brings the topic back to the early 1980s show, Knight Rider starring David Hasselhoff. Reference specific quotes and episodes where possible.',
	onStart: (invoke) => {
		invoke.agentSay('Hello, I am a conversation bot.');
	},
};

export default withDemoChat(MinimalDemoUI);
