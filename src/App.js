import { TabPanel, Panel } from "@wordpress/components";
import AgentsDemo from "./components/AgentsDemo";
import "./App.scss";

const tabs = [
  {
    name: 'agents-demo',
    title: 'Agents Demo',
  },
  {
    name: 'other',
    title: 'Other',
  },
];

function App() {
  return (
    <Panel className="App">
      <TabPanel tabs={tabs}>
      { ( { name } ) => (
					<div>
						{ name === 'agents-demo' && <AgentsDemo /> }
            { name === 'other' && <div>Another Thing</div> }
					</div>
				) }

      </TabPanel>
    </Panel>
  );
}

export default App;
