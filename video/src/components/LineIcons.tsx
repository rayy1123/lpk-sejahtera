import React from 'react';

interface IconProps {
  color?: string;
  size?: number;
  strokeWidth?: number;
}

export const JapanLineIcon: React.FC<IconProps> = ({ color = '#22D3EE', size = 48, strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 14h36M12 14v26M36 14v26M8 22h32M18 14V8h12v6" />
    <circle cx="24" cy="28" r="5" stroke={color} />
  </svg>
);

export const KoreaLineIcon: React.FC<IconProps> = ({ color = '#22D3EE', size = 48, strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="10" width="32" height="28" rx="3" />
    <path d="M16 18h16M16 24h10M16 30h16" />
    <circle cx="34" cy="24" r="2" fill={color} />
  </svg>
);

export const WeldingLineIcon: React.FC<IconProps> = ({ color = '#22D3EE', size = 48, strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 10h20a4 4 0 0 1 4 4v16a8 8 0 0 1-8 8H18a8 8 0 0 1-8-8V14a4 4 0 0 1 4-4z" />
    <rect x="18" y="18" width="12" height="8" rx="2" />
    <path d="M22 38v4M26 38v4" />
    <path d="M6 22l-2 2M44 22l-2 2" />
  </svg>
);

export const CaregiverLineIcon: React.FC<IconProps> = ({ color = '#22D3EE', size = 48, strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 14c-4-6-12-3-12 4 0 8 12 16 12 16s12-8 12-16c0-7-8-10-12-4z" />
    <path d="M16 38c0 4 4 6 8 6s8-2 8-6" />
  </svg>
);

export const StudyLineIcon: React.FC<IconProps> = ({ color = '#22D3EE', size = 40, strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 12l18-6 18 6-18 6-18-6z" />
    <path d="M12 20v14c0 3 6 6 12 6s12-3 12-6V20" />
    <path d="M42 16v18" />
  </svg>
);

export const PracticeLineIcon: React.FC<IconProps> = ({ color = '#22D3EE', size = 40, strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="8" />
    <path d="M24 6v6M24 36v6M6 24h6M36 24h6M11 11l4 4M33 33l4 4M11 37l4-4M33 15l4-4" />
  </svg>
);

export const PrepareLineIcon: React.FC<IconProps> = ({ color = '#22D3EE', size = 40, strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 6l16 8v12c0 10-8 16-16 18C16 42 8 36 8 26V14l16-8z" />
    <path d="M18 24l4 4 8-8" />
  </svg>
);
