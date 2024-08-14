import React, { useEffect, useState } from 'react';
import configurations from './configurations.json';
import styles from './App.module.css';
import OnboardingScreen from './OnboardingScreen';
import { Button } from '@tremor/react';

interface Config {
  theme: string;
  primaryColor: string;
  layout: string;
  welcomeMessage: string;
  customCSS?: string;
}

interface AppProps {
  tenantId: string;
}

function App() {
  const [config, setConfig] = useState<Config | null>(null);
  const [tenantId, setTenantId]=useState(8);
  const [welcomeScreen, setWelcomeScreen]=useState(false);

  useEffect(() => {
    const tenantConfig = configurations[tenantId];
    if (tenantConfig) {
      setWelcomeScreen(true);
      setConfig(tenantConfig);
      if (tenantConfig.customCSS) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = tenantConfig.customCSS;;
        document.head.appendChild(link);
      }
    } else {
      console.error(`Configuration for tenant ${tenantId} not found.`);
    }
  }, [tenantId]);

  if (!config) {
    return (<div>Loading...
          <Button>Next Config</Button>
    </div>
    )
  }
  return (
    <div style={{ backgroundColor: config.primaryColor }}>
      <Button>Next Config</Button>
    <OnboardingScreen
      layout={config.layout}
      welcomeMessage={config.welcomeMessage}
      theme={config.theme}
    />
  </div>
  );
}

export default App;
