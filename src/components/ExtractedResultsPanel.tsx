import React, { useState } from 'react';
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Copy,
  Download,
  FileCode2,
  FileText,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import type { ExtractedIdentity, FieldSource } from '../scanner';

type ResultTab = 'fields' | 'mrz' | 'raw' | 'json';

interface ExtractedResultsPanelProps {
  result: ExtractedIdentity | null;
  isScanning: boolean;
  error: string | null;
  onExportJson: () => void;
}

interface FieldRowItem {
  key: string;
  label: string;
  value: string | number | null | undefined;
  mono?: boolean;
  muted?: boolean;
  source?: FieldSource;
  statusNote?: { text: string; tone: 'ok' | 'warn' | 'err' };
}

const DOC_TYPE_LABELS: Record<ExtractedIdentity['documentType'], string> = {
  passport: 'Passport',
  id_card: 'National ID Card',
  driver_license: "Driver's License",
  residence_permit: 'Residence Permit',
  visa: 'Visa',
  unknown: 'Unclassified Document',
};

export const ExtractedResultsPanel: React.FC<ExtractedResultsPanelProps> = ({
  result,
  isScanning,
  error,
  onExportJson,
}) => {
  const [activeTab, setActiveTab] = useState<ResultTab>('fields');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showEmptyFields, setShowEmptyFields] = useState(false);

  const copyValue = async (key: string, val: string) => {
    try {
      await navigator.clipboard.writeText(val);
      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey((prev) => (prev === key ? null : prev));
      }, 1600);
    } catch {
      // Ignore clipboard failures in restricted environments
    }
  };

  const renderFieldGroup = (title: string, rows: FieldRowItem[]) => {
    const visibleRows = showEmptyFields
      ? rows
      : rows.filter((r) => r.value !== null && r.value !== undefined && String(r.value).trim() !== '');

    if (visibleRows.length === 0) return null;

    return (
      <div className="mb-6 last:mb-0">
        <h3 className="text-xs font-semibold text-slate-500 pb-2 border-b border-slate-200">
          {title}
        </h3>
        <div className="divide-y divide-slate-100">
          {visibleRows.map((row) => {
            const displayVal =
              row.value !== null && row.value !== undefined && String(row.value).trim() !== ''
                ? String(row.value)
                : 'Not detected';
            const isEmpty = displayVal === 'Not detected';

            return (
              <div
                key={row.key}
                className="py-2.5 flex items-start justify-between gap-4 group hover:bg-slate-50/70 px-1.5 -mx-1.5 rounded transition-colors"
              >
                <div className="min-w-[140px] sm:min-w-[170px] shrink-0">
                  <div className="text-xs font-medium text-slate-600">{row.label}</div>
                  {row.source && !isEmpty && (
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Source: {row.source}
                    </div>
                  )}
                </div>

                <div className="flex items-start justify-end gap-2 min-w-0 flex-1 text-right">
                  <div className="min-w-0">
                    <span
                      className={`text-sm break-words ${
                        isEmpty || row.muted
                          ? 'text-slate-400 italic font-normal'
                          : row.mono
                            ? 'font-mono tabular-nums font-medium text-slate-900'
                            : 'font-medium text-slate-900'
                      }`}
                    >
                      {displayVal}
                    </span>
                    {row.statusNote && !isEmpty && (
                      <div
                        className={`text-[11px] font-medium mt-0.5 flex items-center justify-end gap-1 ${
                          row.statusNote.tone === 'ok'
                            ? 'text-emerald-700'
                            : row.statusNote.tone === 'warn'
                              ? 'text-amber-700'
                              : 'text-red-700'
                        }`}
                      >
                        {row.statusNote.tone === 'ok' ? (
                          <CheckCircle2 className="w-3 h-3 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 shrink-0" />
                        )}
                        <span>{row.statusNote.text}</span>
                      </div>
                    )}
                  </div>

                  {!isEmpty && !row.muted && (
                    <button
                      type="button"
                      onClick={() => copyValue(row.key, displayVal)}
                      title={`Copy ${row.label}`}
                      className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors shrink-0 opacity-70 group-hover:opacity-100"
                    >
                      {copiedKey === row.key ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Build sanitized JSON without base64 preview data URLs so exported payload stays clean
  const cleanJsonPayload = result
    ? JSON.stringify(
        {
          ...result,
          previews: undefined,
        },
        null,
        2
      )
    : '';

  return (
    <section className="flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden">
      {/* Panel Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-200">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Extracted Personal Data</h2>
          {result ? (
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span className="font-medium text-slate-700">
                {DOC_TYPE_LABELS[result.documentType]}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{result.documentFormat}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{result.confidence}% OCR confidence</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{result.processingTimeMs} ms</span>
              {result.orientation && result.orientation.totalDegrees !== 0 && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums text-blue-700">
                    Straightened {result.orientation.totalDegrees}°
                  </span>
                </>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-500 mt-0.5">
              MRZ check digits, identity fields, and raw OCR text output
            </p>
          )}
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveTab('fields')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'fields'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Fields
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('mrz')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'mrz'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            MRZ
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('raw')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'raw'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Raw OCR
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('json')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'json'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" />
            JSON
          </button>
        </div>
      </div>

      {/* Panel Body */}
      <div className="p-5 flex-1 flex flex-col">
        {error && (
          <div className="mb-4 p-3.5 border border-red-200 bg-red-50 rounded-lg flex items-start gap-2.5 text-xs text-red-800">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">OCR Processing Failed</p>
              <p className="mt-0.5 text-red-700">{error}</p>
            </div>
          </div>
        )}

        {!result && !isScanning && (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-16 px-6 border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
            <UserCheck className="w-9 h-9 text-slate-300 mb-3" />
            <h3 className="text-sm font-semibold text-slate-900">No Document Scanned Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mt-1 leading-relaxed">
              Upload a passport, national ID card, or driver&apos;s license on the left — or generate a test specimen — to extract all personal information directly in the browser.
            </p>
          </div>
        )}

        {isScanning && !result && (
          <div className="space-y-3 py-4">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="h-9 bg-slate-100 rounded animate-pulse flex items-center justify-between px-3"
              >
                <div className="h-3 w-28 bg-slate-200 rounded" />
                <div className="h-3 w-40 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        )}

        {result && activeTab === 'fields' && (
          <div className="flex flex-col">
            {/* Summary strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-200">
              <div>
                <div className="text-lg font-semibold text-slate-900">
                  {result.fullName || 'Name Not Detected'}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mt-0.5">
                  <span>{result.issuingCountryName || result.issuingCountry || 'Unknown Country'}</span>
                  {result.documentNumber && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{result.documentNumber}</span>
                    </>
                  )}
                  {result.mrz && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span
                        className={`inline-flex items-center gap-1 font-medium ${
                          result.mrz.allCheckDigitsValid ? 'text-emerald-700' : 'text-amber-700'
                        }`}
                      >
                        {result.mrz.allCheckDigitsValid ? (
                          <ShieldCheck className="w-3.5 h-3.5" />
                        ) : (
                          <ShieldAlert className="w-3.5 h-3.5" />
                        )}
                        MRZ Checksums {result.mrz.validCount}/{result.mrz.totalChecks} Valid
                      </span>
                    </>
                  )}
                </div>
              </div>

              <label className="inline-flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showEmptyFields}
                  onChange={(e) => setShowEmptyFields(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                Show undetected fields
              </label>
            </div>

            {renderFieldGroup('Identity & Personal Details', [
              {
                key: 'fullName',
                label: 'Full Name',
                value: result.fullName,
                source: result.fieldSources.fullName,
              },
              {
                key: 'surname',
                label: result.surnames.length > 1 ? 'Surnames (Combined)' : 'Surname / Last Name',
                value: result.surname,
                source: result.fieldSources.surname,
              },
              ...(result.surnames.length > 1
                ? result.surnames.map((part, idx) => ({
                    key: `surname-${idx}`,
                    label: idx === 0 ? 'First Surname' : idx === 1 ? 'Second Surname' : `Surname ${idx + 1}`,
                    value: part,
                    source: result.fieldSources.surname,
                  }))
                : []),
              {
                key: 'givenNames',
                label: 'Given Names',
                value: result.givenNames,
                source: result.fieldSources.givenNames,
              },
              {
                key: 'dateOfBirth',
                label: 'Date of Birth',
                value: result.dateOfBirth,
                mono: true,
                source: result.fieldSources.dateOfBirth,
              },
              {
                key: 'age',
                label: 'Calculated Age',
                value: result.age !== null ? `${result.age} years` : null,
                mono: true,
                source: result.fieldSources.age,
              },
              {
                key: 'sex',
                label: 'Sex',
                value:
                  result.sex !== 'Unspecified'
                    ? result.sex
                    : result.mrz
                      ? 'Not encoded on document'
                      : null,
                muted: result.sex === 'Unspecified',
                source: result.fieldSources.sex,
              },
              {
                key: 'nationality',
                label: 'Nationality',
                value:
                  result.nationalityName && result.nationality
                    ? result.nationalityName !== result.nationality
                      ? `${result.nationalityName} (${result.nationality})`
                      : result.nationalityName
                    : result.nationalityName || result.nationality,
                source: result.fieldSources.nationality,
              },
              {
                key: 'placeOfBirth',
                label: 'Place of Birth',
                value: result.placeOfBirth,
                source: result.fieldSources.placeOfBirth,
              },
              {
                key: 'address',
                label: 'Residential Address',
                value: result.address,
                source: result.fieldSources.address,
              },
              {
                key: 'parents',
                label: 'Parents / Filiation',
                value: result.parents,
                source: result.fieldSources.parents,
              },
            ])}

            {renderFieldGroup('Document & Validity', [
              {
                key: 'documentType',
                label: 'Document Category',
                value: DOC_TYPE_LABELS[result.documentType],
              },
              {
                key: 'documentNumber',
                label: 'Document Number',
                value: result.documentNumber,
                mono: true,
                source: result.fieldSources.documentNumber,
              },
              {
                key: 'personalNumber',
                label: 'Personal / National ID No.',
                value: result.personalNumber,
                mono: true,
                source: result.fieldSources.personalNumber,
              },
              {
                key: 'issuingCountry',
                label: 'Issuing State',
                value:
                  result.issuingCountryName && result.issuingCountry
                    ? `${result.issuingCountryName} (${result.issuingCountry})`
                    : result.issuingCountryName || result.issuingCountry,
                source: result.fieldSources.issuingCountry,
              },
              {
                key: 'issuingAuthority',
                label: 'Issuing Authority',
                value: result.issuingAuthority,
                source: result.fieldSources.issuingAuthority,
              },
              {
                key: 'dateOfIssue',
                label: 'Date of Issue',
                value: result.dateOfIssue,
                mono: true,
                source: result.fieldSources.dateOfIssue,
              },
              {
                key: 'dateOfExpiry',
                label: 'Date of Expiry',
                value: result.dateOfExpiry,
                mono: true,
                source: result.fieldSources.dateOfExpiry,
                statusNote:
                  result.isExpired === null
                    ? undefined
                    : result.isExpired
                      ? { text: 'Document Expired', tone: 'err' }
                      : { text: 'Currently Valid', tone: 'ok' },
              },
            ])}

            {renderFieldGroup('Physical Attributes & License Details', [
              {
                key: 'licenseClass',
                label: 'License Class / Category',
                value: result.licenseClass,
                mono: true,
                source: result.fieldSources.licenseClass,
              },
              {
                key: 'restrictions',
                label: 'Restrictions',
                value: result.restrictions,
                source: result.fieldSources.restrictions,
              },
              {
                key: 'endorsements',
                label: 'Endorsements',
                value: result.endorsements,
                source: result.fieldSources.endorsements,
              },
              {
                key: 'height',
                label: 'Height',
                value: result.height,
                mono: true,
                source: result.fieldSources.height,
              },
              {
                key: 'eyeColor',
                label: 'Eye Color',
                value: result.eyeColor,
                source: result.fieldSources.eyeColor,
              },
              {
                key: 'hairColor',
                label: 'Hair Color',
                value: result.hairColor,
                source: result.fieldSources.hairColor,
              },
            ])}

            {Object.keys(result.unmappedFields).length > 0 &&
              renderFieldGroup(
                'Additional Detected Key-Value Fields',
                Object.entries(result.unmappedFields).map(([k, v]) => ({
                  key: `extra-${k}`,
                  label: k,
                  value: v,
                  source: 'VIZ',
                }))
              )}
          </div>
        )}

        {result && activeTab === 'mrz' && (
          <div className="flex flex-col gap-5">
            {result.mrz ? (
              <>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-semibold text-slate-600">
                      Detected Machine Readable Zone ({result.mrz.format})
                    </h3>
                    <button
                      type="button"
                      onClick={() => copyValue('mrz-raw', result.mrz!.rawLines.join('\n'))}
                      className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      {copiedKey === 'mrz-raw' ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy Lines
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-3.5 bg-slate-950 text-slate-100 rounded-lg font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto tracking-wider">
                    {result.mrz.rawLines.join('\n')}
                  </pre>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-600 mb-2">
                    ICAO 9303 Modulo-10 Check Digit Verification
                  </h3>
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                          <th className="py-2.5 px-3 font-semibold">Field</th>
                          <th className="py-2.5 px-3 font-semibold text-right">Read</th>
                          <th className="py-2.5 px-3 font-semibold text-right">Expected</th>
                          <th className="py-2.5 px-3 font-semibold text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {result.mrz.checkDigits.map((cd) => (
                          <tr key={cd.field} className="hover:bg-slate-50/70">
                            <td className="py-2.5 px-3 font-medium text-slate-900">
                              {cd.label}
                            </td>
                            <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                              {cd.actual || '—'}
                            </td>
                            <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                              {cd.expected}
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              {cd.valid ? (
                                <span className="inline-flex items-center justify-end gap-1 font-medium text-emerald-700">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  Passed
                                </span>
                              ) : (
                                <span className="inline-flex items-center justify-end gap-1 font-medium text-red-700">
                                  <AlertTriangle className="w-3.5 h-3.5" />
                                  Mismatch
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-12 px-6 text-center border border-dashed border-slate-200 rounded-lg bg-slate-50">
                <ShieldAlert className="w-8 h-8 text-slate-400 mx-auto mb-2.5" />
                <p className="text-sm font-semibold text-slate-900">
                  No Machine Readable Zone Detected
                </p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  This document appears to be visual-only (such as a driver&apos;s license or front side of a card), or the MRZ lines at the bottom were cropped/obscured.
                </p>
              </div>
            )}
          </div>
        )}

        {result && activeTab === 'raw' && (
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="text-xs font-semibold text-slate-600">
                  Full Document OCR Output
                </h3>
                <button
                  type="button"
                  onClick={() => copyValue('raw-full', result.rawOcrText)}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  {copiedKey === 'raw-full' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Text
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs text-slate-800 whitespace-pre-wrap break-words max-h-[300px] overflow-y-auto">
                {result.rawOcrText || '(No text recognized)'}
              </pre>
            </div>

            {result.rawMrzText && (
              <div>
                <h3 className="text-xs font-semibold text-slate-600 mb-1.5">
                  Dedicated MRZ Strip OCR Output
                </h3>
                <pre className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs text-slate-800 whitespace-pre-wrap break-words">
                  {result.rawMrzText}
                </pre>
              </div>
            )}
          </div>
        )}

        {result && activeTab === 'json' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Ready-to-consume <code className="font-mono">ExtractedIdentity</code> payload
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => copyValue('json-full', cleanJsonPayload)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-md transition-colors flex items-center gap-1.5"
                >
                  {copiedKey === 'json-full' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy JSON
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onExportJson}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download .json
                </button>
              </div>
            </div>
            <pre className="p-4 bg-slate-950 text-slate-100 rounded-lg font-mono text-xs leading-relaxed overflow-auto max-h-[460px]">
              {cleanJsonPayload}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
};
