import React from 'react';
import { LegalLayout } from '../components/LegalLayout';
import { LEGAL } from '../lib/legal';

export default function DataDeletionPage() {
  return (
    <LegalLayout title="Exclusão de Dados do Usuário">
      <p>
        O usuário poderá solicitar a exclusão dos dados associados à sua interação com a {LEGAL.brand} e com nossas
        integrações.
      </p>

      <h2>Como solicitar</h2>
      <p>Para solicitar a exclusão dos seus dados, envie um e-mail para:</p>
      <p>
        <a href={`mailto:${LEGAL.email}?subject=${encodeURIComponent(LEGAL.deletionSubject)}`}>{LEGAL.email}</a>
      </p>
      <p>Utilize o assunto:</p>
      <p>
        <strong>"{LEGAL.deletionSubject}"</strong>
      </p>
      <p>
        No corpo da mensagem, informe o e-mail ou outra identificação utilizada em nossos serviços para que possamos
        localizar os dados relacionados à solicitação.
      </p>

      <h2>O que acontece depois</h2>
      <p>
        Após a identificação da solicitação, os dados serão excluídos ou anonimizados, salvo quando sua conservação for
        necessária para o cumprimento de obrigação legal ou regulatória.
      </p>

      <h2>Integrações com a Meta</h2>
      <p>
        Caso tenha utilizado uma integração com Facebook, Instagram ou outro serviço da Meta, informe isso na
        solicitação para que possamos identificar os registros associados à integração.
      </p>

      <p>
        Mais informações sobre o tratamento de dados estão na{' '}
        <a href="/politica-de-privacidade">Política de Privacidade</a>.
      </p>
    </LegalLayout>
  );
}
