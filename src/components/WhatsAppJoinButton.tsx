import React from 'react';
import { ArrowRight } from 'lucide-react';
import { WHATSAPP_GROUP_URL } from '../lib/links';
import { trackWhatsAppJoinClick } from '../lib/meta/events';

interface WhatsAppJoinButtonProps {
  className: string;
  label?: string;
}

/** Único CTA do grupo oficial do WhatsApp. Tracking não bloqueia a abertura do link. */
export const WhatsAppJoinButton: React.FC<WhatsAppJoinButtonProps> = ({ className, label = 'ENTRAR NO GRUPO OFICIAL' }) => (
  <a
    href={WHATSAPP_GROUP_URL}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackWhatsAppJoinClick()}
    className={`${className} no-underline`}
  >
    <span>{label}</span>
    <ArrowRight className="w-5 h-5 shrink-0" />
  </a>
);
