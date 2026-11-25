import type { DocumentQuad, PerspectiveInfo, Point2D } from './types';
/**
 * Orders 4 arbitrary 2D points into consistent clockwise document quad corners:
 * [topLeft, topRight, bottomRight, bottomLeft].
 */
export declare function orderQuadCorners(points: Point2D[]): DocumentQuad;
/**
 * Pure-JS 4-corner document quadrilateral detector.
 * Returns null if the image is already a tightly cropped flat scan (or no reliable quad exists)
 * so flat full-bleed scans are never over-cropped.
 */
export declare function detectDocumentQuad(source: HTMLImageElement | HTMLCanvasElement): PerspectiveInfo | null;
/**
 * Applies exact 4-corner homography perspective rectification using bilinear interpolation
 * and returns a crisp rectangular canvas sized for high-accuracy OCR.
 */
export declare function warpDocumentPerspective(source: HTMLImageElement | HTMLCanvasElement, corners: DocumentQuad): HTMLCanvasElement;
