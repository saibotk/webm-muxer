/// <reference types="dom-webcodecs" />
interface EBMLElement {
    id: number;
    size?: number;
    data: number | string | Uint8Array | EBMLFloat32 | EBMLFloat64 | EBML[];
}
declare type EBML = EBMLElement | Uint8Array | EBML[];
declare class EBMLFloat32 {
    value: number;
    constructor(value: number);
}
declare class EBMLFloat64 {
    value: number;
    constructor(value: number);
}
declare abstract class WriteTarget {
    pos: number;
    helper: Uint8Array;
    helperView: DataView;
    offsets: WeakMap<EBML, number>;
    abstract write(data: Uint8Array): void;
    abstract seek(newPos: number): void;
    writeU8(value: number): void;
    writeFloat32(value: number): void;
    writeFloat64(value: number): void;
    writeUnsignedInt(value: number, width?: number): void;
    writeEBMLVarInt(value: number, width?: number): void;
    writeString(str: string): void;
    writeEBML(data: EBML): void;
}
interface WebMWriterOptions {
    video?: {
        codec: string;
        width: number;
        height: number;
    };
    audio?: {
        codec: string;
        numberOfChannels: number;
        sampleRate: number;
    };
}
export declare class WebMWriter {
    target: WriteTarget;
    options: WebMWriterOptions;
    segment: EBMLElement;
    segmentInfo: EBMLElement;
    tracksElement: EBMLElement;
    currentCluster: EBMLElement;
    currentClusterTimestamp: number;
    segmentDuration: EBMLElement;
    audioCodecPrivate: EBML;
    cues: EBMLElement;
    seekHead: {
        id: number;
        data: {
            id: number;
            data: ({
                id: number;
                data: Uint8Array;
                size?: undefined;
            } | {
                id: number;
                size: number;
                data: number;
            })[];
        }[];
    };
    duration: number;
    videoChunkQueue: EncodedVideoChunk[];
    audioChunkQueue: EncodedAudioChunk[];
    lastVideoTimestamp: number;
    lastAudioTimestamp: number;
    constructor(options: WebMWriterOptions);
    writeHeader(): void;
    addVideoChunk(chunk: EncodedVideoChunk): void;
    addAudioChunk(chunk: EncodedAudioChunk, meta: EncodedAudioChunkMetadata): void;
    writeSimpleBlock(chunk: EncodedVideoChunk | EncodedAudioChunk): void;
    createNewCluster(timestamp: number): void;
    finalizeCurrentCluster(): void;
    finalize(): void;
}
export {};