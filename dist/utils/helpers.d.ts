/**
 * Format currency with appropriate suffix
 */
export declare const formatVolume: (vol: number) => string;
export declare function parseDate(input: string | number): Date;
export declare function formatPair(token0: string, token1: string): string;
export declare const parseError: (err: any) => any;
export declare const now: () => number;
export declare const yesterday: () => number;
export declare const lastWeek: () => number;
export declare const sleep: (ms: number) => Promise<unknown>;
