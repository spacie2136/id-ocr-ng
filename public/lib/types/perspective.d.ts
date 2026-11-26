import type { DocumentQuad, ImageSurface, PerspectiveInfo, Point2D } from './types';
/**
 * Orders 4 arbitrary 2D points into consistent clockwise document quad corners:
 * [topLeft, topRight, bottomRight, bottomLeft].
 */
export declare function orderQuadCorners(points: Point2D[]): DocumentQuad;
/**
 * Pure-JS 4-corner document quadrilateral detector.
 * Returns null if the image is already a tightly cropped / full-bleed flat scan
 * (or if no reliable document quad exists) so flat scans and MRZ zones are never over-cropped,
 * while reliably framing small or tilted ID cards in tall mobile camera photos.
 */
export declare function detectDocumentQuad(source: ImageSurface): PerspectiveInfo | null;
/**
 * Applies exact 4-corner homography perspective rectification using bilinear interpolation
 * and returns a crisp rectangular canvas sized for high-accuracy OCR.
 */
export declare function warpDocumentPerspective(source: ImageSurface, corners: DocumentQuad): HTMLCanvasElement;
