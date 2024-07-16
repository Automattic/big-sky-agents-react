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

	useEffect(() => {
		if (activeAgent?.id !== MinimalAgent.id) {
			setAgentStarted(false);
			setActiveAgent(MinimalAgent.id);
		}
	});

	useAgentExecutor();
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

const GetWeatherTool = {
	name: 'getWeather',
	description: 'Get the weather for a location',
	parameters: {
		type: 'object',
		properties: {
			location: {
				type: 'string',
			},
		},
		required: ['location'],
	},
};

const GetWeatherToolkit = {
	name: 'weather',
	context: {
		currentLocation: 'Oslo, Norway',
	},
	tools: [GetWeatherTool],
	callbacks: {
		getWeather: async ({ location }) => {
			const response = await fetch(
				`https://wttr.in/${location}?format=%C+%t`
			);
			const text = await response.text();
			return text;
		},
	},
};

const MinimalAgent = {
	id: 'tiny-with-weather',
	name: 'Conversation Bot with weather',
	toolkits: [GetWeatherToolkit],
	instructions: (context) =>
		`Will talk about anything but always brings the topic back to the early 1980s show Mork and Mindy. Reference specific quotes and episodes where possible. The current location is ${context.currentLocation}`,
	onStart: (invoke) => {
		invoke.agentSay(
			'Hello, I am a conversation bot that loves Mork and Mindy.'
		);
	},
};

export default withDemoChat(MinimalDemoUI);
