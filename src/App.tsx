import React, { useEffect, useState } from 'react';
import configurations from './configurations.json';
import styles from './App.module.css';
import './index.css'
import OnboardingScreen from './OnboardingScreen';
import Button from '@mui/material/Button';
import { Box, Container, Typography } from '@mui/material';

interface Config {
  theme: string;
  primaryColor: string;
  layout: string;
  welcomeMessage: string;
  customCSS: string;
}

interface AppProps {
  tenantId: string;
}

function App() {
  const [config, setConfig] = useState<Config | null>(null);
  const [tenantId, setTenantId]=useState(0);
  const [welcomeScreen, setWelcomeScreen]=useState(false);

  useEffect(() => {
    const tenantConfig = configurations[tenantId];
    if (tenantConfig) {
      setWelcomeScreen(true);
      setConfig(tenantConfig);
    } else {
      console.error(`Configuration for tenant ${tenantId} not found.`);
    }
  }, [tenantId]);

  if (!config) {
    return (
      <div>Loading ...
      </div>
    )
  }
  return (
    <div className={styles.main}>
      {
        welcomeScreen ?
        <Container className={styles.container}>
          <Typography variant="h1" component="h2">
            {config.welcomeMessage}
        </Typography>
        <Button onClick={()=>setWelcomeScreen(false)} variant="contained">Start the Process</Button>
        </Container>
      :
        <OnboardingScreen
          style={config.customCSS}
          layout={config.layout}
          welcomeMessage={config.welcomeMessage}
          theme={config.theme}
        />
        }
  </div>
  );
}

export default App;
