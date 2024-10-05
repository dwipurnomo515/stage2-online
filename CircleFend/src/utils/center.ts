// src/utils/centerContent.ts
import { BoxProps } from '@chakra-ui/react';

export function useCenterContentProps(): BoxProps {
    return {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgColor: 'brand.background',
    };
}