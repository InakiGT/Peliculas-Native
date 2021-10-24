import React from 'react';
import { createContext, useState } from "react";
import ImageColors from 'react-native-image-colors';

interface ImageColors {
    primary: string;
    secondary: string;
}

interface ContextProps {
    colors: ImageColors;
    prevColors: ImageColors;
    setMaintColors: ( colors: ImageColors ) => void;
    setPrevMainColors: ( colors: ImageColors ) => void;
}

export const GradiantContext = createContext({} as ContextProps);

export const GradiantProvider = ( { children }: any ) => {

    const [ colors, setColors ] = useState<ImageColors>({
        primary: 'transparent',
        secondary: 'transparent'
    });

    const [ prevColors, setPrevColors ] = useState<ImageColors>({
        primary: 'transparent',
        secondary: 'transparent'
    });

    const setMaintColors = ( colors: ImageColors ) => {
        setColors( colors )
    }

    const setPrevMainColors = ( colors: ImageColors ) => {
        setPrevColors( colors );
    }

    return (
        <GradiantContext.Provider
            value={{
                colors,
                prevColors,
                setMaintColors,
                setPrevMainColors
            }}
        >
            { children }
        </GradiantContext.Provider>
    )

}