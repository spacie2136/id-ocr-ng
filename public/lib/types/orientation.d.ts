export interface OrientationAnalysis {
    /** Fine clockwise angle in degrees ([-45, 45]) needed to align text lines to horizontal/vertical axes */
    deskewDegrees: number;
    /** Candidate coarse clockwise rotations ordered from most likely upright to least likely */
    rankedCoarseRotations: Array<0 | 90 | 180 | 270>;
    /** Ratio comparing dominant axis projection strength vs secondary axis */
    axisConfidence: number;
    /** Where an MRZ-like wide monospace text band appears before coarse rotation */
    mrzEdgeHint: 'bottom' | 'top' | 'left' | 'right' | 'none';
}
/**
 * Pure-JS pixel geometry analyzer that estimates fine skew angle ([-45°, +45°])
 * and ranks the 4 coarse clockwise rotations (0, 90, 180, 270) by text-line axis
 * sharpness and MRZ edge localization.
 */
export declare function analyzeDocumentOrientation(gray: Uint8ClampedArray, width: number, height: number): OrientationAnalysis;
