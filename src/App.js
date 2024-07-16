import { Panel, TabPanel } from '@wordpress/components';
import WeatherDemo from './components/WeatherDemo';
import SiteSpecDemo from './components/SiteSpecDemo';
import AskUserDemo from './components/AskUserDemo';
import MinimalDemo from './components/MinimalDemo';
import MinimalDemoWithWeather from './components/MinimalDemoWithWeather';

import './App.scss';

const tabs = [
	{
		name: 'minimal-demo',
		title: 'Minimal Demo',
	},
	{
		name: 'minimal-demo-with-weather',
		title: 'Minimal with Weather',
	},
	{
		name: 'ask-user-demo',
		title: 'Ask User Demo',
	},
	{
		name: 'weather-demo',
		title: 'Weather Demo',
	},
	{
		name: 'site-spec',
		title: 'Site Spec Demo',
	},
];
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

function App() {
	return (
		<Panel className="App">
			<TabPanel tabs={tabs}>
				{({ name }) => (
					<div>
						{name === 'minimal-demo' && (
							<MinimalDemo
								apiKey={OPENAI_API_KEY}
								feature="minimal-demo"
							/>
						)}
						{name === 'minimal-demo-with-weather' && (
							<MinimalDemoWithWeather
								apiKey={OPENAI_API_KEY}
								feature="minimal-demo-with-weather"
							/>
						)}
						{name === 'ask-user-demo' && (
							<AskUserDemo
								apiKey={OPENAI_API_KEY}
								feature="ask-user-demo"
							/>
						)}
						{name === 'weather-demo' && (
							<WeatherDemo
								apiKey={OPENAI_API_KEY}
								feature="weather-demo"
							/>
						)}
						{name === 'site-spec' && (
							<SiteSpecDemo
								apiKey={OPENAI_API_KEY}
								feature="site-spec"
							/>
						)}
					</div>
				)}
			</TabPanel>
		</Panel>
	);
}

export default App;
