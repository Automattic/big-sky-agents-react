import { Agent, DotPromptTemplate } from '@automattic/big-sky-agents';

const defaultQuestion = 'What questions do you have about the sky?';

// const defaultChoices = [
// 	'Why is it blue?',
// 	'Why is it so big?',
// 	'Does it really rain cats and dogs?',
// ];

const defaultChoices = [];

const instructions = new DotPromptTemplate({
	template: `You are an expert at answering questions about the sky in a humerous way.
 Your current goal is: {{= it.agent.goal }}.
 `,
	inputVariables: ['agent'],
});

const additionalInstructions = new DotPromptTemplate({
	template: `Please attempt to complete the goal: {{= it.agent.goal }}.
 `,
	inputVariables: ['agent'],
});

class SkyAgent extends Agent {
	getId() {
		return 'sky-agent';
	}

	getInstructions() {
		return instructions.format(this.toolkit.values);
	}

	getAdditionalInstructions() {
		return additionalInstructions.format(this.toolkit.values);
	}

	getTools() {
		return [...super.getTools()];
	}

	getDefaultQuestion() {
		return defaultQuestion;
	}

	getDefaultChoices() {
		return defaultChoices;
	}

	onStart() {
		// this.setGoal('Answer any question the user has about the sky');
		this.askUser({
			question: defaultQuestion,
			choices: defaultChoices,
		});
	}
}

export default SkyAgent;
