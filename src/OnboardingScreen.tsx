import { useEffect, useState } from "react";
import { NumberInput } from "./component/Input/input";
import { CustomButton } from "./component/Button/button";

interface OnboardingScreenProps {
    layout: string;
    welcomeMessage: string;
    theme: string;
    style: string;
}

interface LayoutProps {
    styles: any;
}

function OnboardingScreen({ layout, welcomeMessage, theme, style }: OnboardingScreenProps) {
    const [styles, setStyles] = useState<any>(null);

    useEffect(() => {
        const loadStyles = async () => {
            try {
                const module = await import(style);
                setStyles(module);
            } catch (error) {
                console.error("Error loading styles:", error);
            }
        };
        loadStyles();
    }, [style]);

    if (!styles) return <div>Loading...</div>;

    return (
        <div className={`onboarding-screen ${theme}`}>
            <h1>{welcomeMessage}</h1>
            {layout === 'minimal' ? (
                <MinimalLayout styles={styles} />
            ) : (
                <DetailedLayout styles={styles} />
            )}
        </div>
    );
}

function MinimalLayout({ styles }: LayoutProps) {
    return (
        <div className={styles.container}>
            <p>This is a minimal layout for the onboarding process.</p>
            <NumberInput placeholder="Number input here" width={245} />
            <CustomButton type="contained" title="Add" fullWidth={false} />
        </div>
    );
}

function DetailedLayout({ styles }: LayoutProps) {
    return (
        <div className={styles.container}>
            <p>This is a detailed layout for the onboarding process.</p>
            <NumberInput placeholder="Number input here" width={445} />
            <CustomButton  type="outlined" title="Add" fullWidth={true} />
        </div>
    );
}

export default OnboardingScreen;
