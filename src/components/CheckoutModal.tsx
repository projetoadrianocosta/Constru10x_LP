import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, QrCode, CreditCard, Sparkles, CheckCircle, ArrowRight, Lock, Clock } from 'lucide-react';
import { TICKET_LOTS, EVENT_DETAILS } from '../data/eventData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const [selectedLotId, setSelectedLotId] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit'>('pix');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profession: 'Engenheiro Civil',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [reservationSeconds, setReservationSeconds] = useState(600); // 10 minutes

  useEffect(() => {
    if (!isOpen) {
      setIsSuccess(false);
      setIsSubmitting(false);
      return;
    }
    const timer = setInterval(() => {
      setReservationSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const currentLot = TICKET_LOTS.find((l) => l.id === selectedLotId) || TICKET_LOTS[0];
  const minutes = Math.floor(reservationSeconds / 60);
  const seconds = reservationSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Por favor, preencha todos os campos para emissão do seu ingresso.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#11151e] border border-amber-500/40 rounded-3xl p-5 sm:p-8 shadow-2xl text-slate-100 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Header */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">
                  Inscrição Oficial
                </span>
                <span className="flex items-center gap-1 text-[11px] sm:text-xs text-amber-300 font-mono">
                  <Clock className="w-3.5 h-3.5 animate-pulse" />
                  Vaga reservada por: <strong>{timeFormatted}</strong>
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Garanta Sua Vaga na Imersão Constru10x
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Data: {EVENT_DETAILS.dateDisplay} • {EVENT_DETAILS.timeDisplay} (Online e Ao Vivo)
              </p>
            </div>

            {/* Lot Summary Box */}
            <div className="bg-gradient-to-r from-[#182338] to-[#101520] border-2 border-amber-400/80 rounded-2xl p-4 mb-5 shadow-lg relative">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] sm:text-xs uppercase font-black tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  1º LOTE EXCLUSIVO • ATIVO
                </span>
                <span className="text-[11px] font-bold text-amber-300">
                  Encerra em 7 dias
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-white font-mono">R$ 79,90</span>
                <span className="text-xs text-slate-300 font-bold">à vista</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Após 7 dias do início da campanha, o valor subirá para o 2º Lote.
              </p>
            </div>

            {/* What is included checklist */}
            <div className="bg-[#0a0d13] p-3.5 rounded-xl border border-slate-800/80 mb-5 text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Ingresso individual para a Imersão Constru 10x ao vivo no Zoom (07/11)</span>
              </div>
              <div className="flex items-center gap-2 text-amber-300 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>3 Aulas Bônus liberadas imediatamente no seu e-mail e WhatsApp</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Roteiro de Reunião em 5 etapas & Scripts de Venda de Alto Valor</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Garantia Incondicional Risco Zero: se não valer à pena, devolvo seu dinheiro</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Seu Nome Completo:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex.: Eng. Roberto Silva"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#080a0f] border border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none placeholder:text-slate-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    E-mail (para envio do acesso):
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="seuemail@exemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#080a0f] border border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none placeholder:text-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    WhatsApp com DDD:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(31) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#080a0f] border border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Sua Atuação Profissional:
                </label>
                <select
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  className="w-full bg-[#080a0f] border border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                >
                  <option value="Engenheiro Civil">Engenheiro Civil</option>
                  <option value="Arquiteto(a)">Arquiteto(a) / Urbanista</option>
                  <option value="Construtor / Empreiteiro">Construtor / Empreendedor da Construção</option>
                  <option value="Engenheiro de Instalações / Estrutural">Engenheiro de Instalações / Estrutural / Patologista</option>
                  <option value="Outro Profissional Técnico">Outro Profissional Técnico</option>
                </select>
              </div>

              {/* Payment Method Selector */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Forma de Pagamento:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                      paymentMethod === 'pix'
                        ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300'
                        : 'border-slate-800 bg-[#0a0d13] text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-emerald-400" />
                    <span>Pix (Acesso Instantâneo)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                      paymentMethod === 'credit'
                        ? 'border-amber-400 bg-amber-400/15 text-amber-300'
                        : 'border-slate-800 bg-[#0a0d13] text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-amber-400" />
                    <span>Cartão de Crédito (à vista)</span>
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                id="btn-finalizar-inscricao"
                className="w-full mt-4 py-4 px-6 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-base uppercase tracking-wider rounded-2xl shadow-xl shadow-amber-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Processando inscrição segura...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-slate-950" />
                    <span>Garantir Ingresso por {currentLot.priceFormatted}</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Pagamento 100% Criptografado & Protegido • Garantia Risco Zero</span>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Success Screen */
          <div className="text-center py-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10" />
            </div>
            <span className="text-xs uppercase font-black tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
              Inscrição Confirmada com Sucesso!
            </span>
            <h3 className="text-2xl font-black text-white mt-3 mb-2">
              Parabéns, {formData.name.split(' ')[0]}! Você está no 1º Lote.
            </h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
              Seu comprovante e ingresso foram emitidos para <strong className="text-amber-400">{formData.email}</strong>.
            </p>

            {/* Instant Access Unlock Box */}
            <div className="bg-[#0b0e14] border-2 border-amber-400/50 rounded-2xl p-5 text-left mb-6">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Suas 3 Aulas de Acesso Imediato Estão Desbloqueadas:</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-[10px]">1</span>
                  <span>Como Parar de Trabalhar Mais e Aumentar Seu Faturamento</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-[10px]">2</span>
                  <span>O Motivo Pelo Qual Cobrar Mais Caro Te Faz Perder Cliente</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-[10px]">3</span>
                  <span>A Oportunidade Que Você Ainda Não Está Enxergando</span>
                </li>
              </ul>
              <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
                <span>Instruções enviadas também no WhatsApp: {formData.phone}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm uppercase tracking-wider rounded-xl transition-colors shadow-lg"
            >
              Concluir e Acessar Minha Área
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
