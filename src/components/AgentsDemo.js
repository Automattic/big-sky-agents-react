import {
  agents,
  AgentUI,
  SiteSpecPreview,
  useAgentStarter,
  useChat,
  useChatExecutor,
  useAgent,
  useReduxToolkit,
  useToolExecutor,
} from '@automattic/big-sky-agents';
import { useEffect } from 'react';

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
  }, [apiKey, chat]);

  const agentConfig = agents.find((ag) => ag.id === 'WPSiteSpec');
  toolkit.callbacks.setAgent(agentConfig);

  const agent = useAgent(agentConfig.id, {
    toolkit,
  });

  console.log('agent', agent);

  useChatExecutor({
    agent,
    toolkit,
  });

  useToolExecutor({
    toolkit,
  });

  useAgentStarter({
    agent,
  });

  return (
    <>
      <AgentUI toolkit={toolkit} agent={agent} chat={chat} hideChoices={false} />
      <SiteSpecPreview />
    </>
  );
}
