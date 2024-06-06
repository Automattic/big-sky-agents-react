import "./App.scss";
import {
  useLLM,
  LLMModel,
  LLMService,
  useSimpleChat,
  useSimpleAgentToolkit,
  StandardAgent,
  FStringPromptTemplate,
  AgentUI,
  AgentControls,
  LLMControls,
  useAgentExecutor,
} from "@automattic/big-sky-agents";
import { useMemo, useState } from "react";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const TEMPERATURE = 0.2;
const DEMO_AGENT_ID = "demo-agent";

const systemPrompt = FStringPromptTemplate.fromString(
  `You are a helpful AI assistant. Your mission is to find out what the user needs, clearly set goal and choose an appropriate agent to help them.`
);

class DemoAgent extends StandardAgent {
  getId() {
    return DEMO_AGENT_ID;
  }

  getSystemPrompt() {
    return systemPrompt;
  }

  onStart() {
    this.askUser({
      question: "What can I help you with?",
      choices: [
        // these more-or-less correspond to specific agents
        "Help me finish my site",
        "Copy fonts, colors, content or layout from another site",
        "I want to change my site title or settings",
        "I want to add, edit or remove pages",
        "I want to change the color or fonts of my site",
        "I want to learn about WordPress",
        "I want to understand my stats",
        "I want to build or modify a store",
      ],
    });
  }
}

const AGENTS = [
  {
    id: DEMO_AGENT_ID,
    name: "Demo Agent",
    description:
      "Here to understand your goal and choose the best agent to help you.",
  },
];

function App() {
  const [service, setService] = useState(LLMService.OPENAI);
  const [model, setModel] = useState(LLMModel.getDefault(service));
  const [temperature, setTemperature] = useState(TEMPERATURE);
  const [token, setToken] = useState(OPENAI_API_KEY);

  /**
   * Set up the agent
   */
  const llm = useLLM({ token, service });

  /** Set up the chat */
  const chat = useSimpleChat({
    llm,
    model,
    temperature,
  });

  /**
   * Set up the agent toolkit
   */
  const toolkit = useSimpleAgentToolkit({ agents: AGENTS });

  /**
   * Initialize the agent class
   */
  const agent = useMemo(() => new DemoAgent(chat, toolkit), [chat, toolkit]);

  /**
   * Run the agent
   */
  useAgentExecutor({ agent, chat, toolkit });

  /**
   * When the agent changes, call agent.onStart()
   */
  // useEffect(() => {
  //   if (!chat.started) {
  //     agent.onStart();
  //   }
  // }, [chat, agent]);

  return (
    <div className="App">
      <AgentUI toolkit={toolkit} agent={agent} chat={chat} />
      <AgentControls toolkit={toolkit} agent={agent} chat={chat} />
      <LLMControls
        token={token}
        model={model}
        service={service}
        temperature={temperature}
        onModelChanged={setModel}
        onServiceChanged={setService}
        onTemperatureChanged={setTemperature}
        onTokenChanged={setToken}
      />
    </div>
  );
}

export default App;
